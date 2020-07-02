"use strict";

const selectSingle = document.querySelector('.__select');
const selectSingle_title = selectSingle.querySelector('.__select__title');
const selectSingle_labels = selectSingle.querySelectorAll('.__select__label');
const buyButton = document.querySelector('.buy'); 
const saleProcesIcon = document.querySelector('.sale-process__icon');
const quantity = document.querySelector('.quantity__number');
const quantityLink = document.querySelectorAll('.quantity__link');
const checkbox = document.querySelectorAll('.checkbox-input');
let counter = 1;

quantity.textContent = counter;

// Toggle menu
selectSingle_title.addEventListener('click', () => {
  if ('active' === selectSingle.getAttribute('data-state')) {
    selectSingle.setAttribute('data-state', '');
  } else {
    selectSingle.setAttribute('data-state', 'active');
  }
});

// Close when click to option
for (let i = 0; i < selectSingle_labels.length; i++) {
  selectSingle_labels[i].addEventListener('click', (evt) => {
    selectSingle_title.textContent = evt.target.textContent;
    selectSingle.setAttribute('data-state', '');
  });
}

//Click on button
buyButton.onclick = (event) => {
  event.preventDefault();
  console.log(event.target);
  saleProcesIcon.src = "img/Vector(1).svg";
  event.target.classList.add('sale');
}

// Add quantity 
for(let i = 0; i < quantityLink.length; i++) {
  const quantity = quantityLink[i];
  quantity.onclick = (event) => {
    event.preventDefault();
    let  number = document.querySelector('.quantity__number');
    let field = event.target.getAttribute('data-atr');
    if (field === 'minus') {
      counter -= 1;
      number.textContent = counter;
      if (counter < 1) {
        number.textContent = 1;
        counter = 1;
      }
    } else if(field === 'plus') {
      counter += 1;
      number.textContent = counter;
    }
  }
}