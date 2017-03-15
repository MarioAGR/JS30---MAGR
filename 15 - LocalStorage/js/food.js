const addItems = document.querySelector('.add-items');

const checkAllItems = document.querySelector('#checkall');
const deleteItems = document.querySelector('.option-delete');
const uncheckAllItems = document.querySelector('#uncheckall');

const itemsList = document.querySelector('.plates');
const items = JSON.parse(localStorage.getItem('items')) || [];

function addItem(e) {
    e.preventDefault();
    const text = (this.querySelector('[name=item]')).value;
    const item = {
        text,
        done: false
    };
    items.push(item);
    populateList(items, itemsList);
    localStorage.setItem('items', JSON.stringify(items));
    this.reset();
}

function populateList(plates = [], platesList) {
    platesList.innerHTML = plates.map((plate, i) => {
        return `
		<li>
			<input type="checkbox" data-index="${i}"" id="item${i}" ${plate.done ? 'checked' : ''}/>
			<label for="item${i}">${plate.text}</label>
		</li>
		`;
    }).join('');
}

function toggleDone(e) {
	if (!e.target.matches('input')) return; //skip this unless it's an input
	const el = e.target;
	const index = el.dataset.index;
	items[index].done = !items[index].done;
	localStorage.setItem('items', JSON.stringify(items));
	populateList(items, itemsList);
}

function checkAItems(e) {
	e.preventDefault();
	items.forEach(item => {
		item.done=true;
	});
	localStorage.setItem('items', JSON.stringify(items));
	populateList(items, itemsList);
}

function deleteAItems(e) {
	localStorage.clear();
	populateList(items, itemsList);
}

function uncheckAItems(e) {
	e.preventDefault();
	items.forEach(item => {
		item.done=false;
	});
	localStorage.setItem('items', JSON.stringify(items));
	populateList(items, itemsList);
}

addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);

checkAllItems.addEventListener('click', checkAItems);
deleteItems.addEventListener('click', deleteAItems);
uncheckAllItems.addEventListener('click', uncheckAItems);

populateList(items, itemsList);