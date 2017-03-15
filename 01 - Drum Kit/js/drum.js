function playSound(e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`); //Igual que var, solo que const estara en el contexto del elemento
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`); //Scope es el contexto de las variables
    if (!audio) return; //Stop the function from running all togheter
    audio.currentTime = 0; //Rewind to the start
    audio.play();
    key.classList.add('playing');
}

function removeTransition(e) {
    if (e.propertyName !== 'transform') return; //skip if it's not a transform
    this.classList.remove('playing');
}

const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('transitionend', removeTransition));
window.addEventListener('keydown', playSound);

//Todo lo que se puede manipular por JS es el DOM
//Siempre y cuando se use un evento en la ventana, se puede manipular la misma sin dejar los elementos heredados

//Todas las funciones que se heredan en JS, estas heredan consigo PROTOTYPE del DOCUMENT