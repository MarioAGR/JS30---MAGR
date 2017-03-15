function debounce(func, wait = 15, immediate = true) {
    var timeout;
    return function() {
        var context = this,
            args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

const sliderImg = document.querySelectorAll('.slide-in');

function checkSlide(e) {
    sliderImg.forEach(sliderImg => {
        //half way through the image
        const slideInAt = (window.scrollY + window.innerHeight) - sliderImg.height / 2;
        //bottom of the image
        const imageBottom = sliderImg.offsetTop + sliderImg.height;
        const isHalfShown = slideInAt > sliderImg.offsetTop;
        const isNotScrolledPast = window.scrollY < imageBottom;
        if (isHalfShown && isNotScrolledPast) {
            sliderImg.classList.add('active');
        } else {
            sliderImg.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', debounce(checkSlide));