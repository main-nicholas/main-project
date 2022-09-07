'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.quote-btn');
const btnSalina = document.getElementById('btn-salina');
const btnAbilene = document.getElementById('btn-abilene');
const btnHutchinson = document.getElementById('btn-hutchinson');
const btnGB = document.getElementById('btn-greatbend');
const btnOklahoma = document.getElementById('btn-oklahoma');
const btnMinneapolis = document.getElementById('btn-minneapolis');
const quoteOpen = document.querySelector('.call-to-quote');
const btnLoc = document.querySelectorAll('.btn-locations');
const storeLoc = document.querySelectorAll('.locations-grid');
const imgGal = document.querySelectorAll('.img-gallery-src');
const btnGal = document.querySelectorAll('.pressTest');

const btnMarkers = document.querySelector('.btn-markers');
const btnSpecial = document.querySelector('.btn-special');
const btnUpRights = document.querySelector('.btn-uprights');

const btnContainer = document.querySelector('.btn-container');
const imagesBtns = document.querySelector('.imagesBtns');

//locations
const salina = document.querySelector('.salina');
const abilene = document.querySelector('.abilene');
const hutchinson = document.querySelector('.hutchinson');
const greatbend = document.querySelector('.great-bend');
const oklahoma = document.querySelector('.oklahoma');
const minneapolis = document.querySelector('.minneapolis');

const markers = [
  'img/marker-1.jpg',
  'img/marker-2.jpg',
  'img/marker-1.jpg',
  'img/marker-2.jpg',
  'img/marker-1.jpg',
  'img/marker-2.jpg',
  'img/marker-1.jpg',
  'img/marker-2.jpg',
  'img/marker-1.jpg',
  'img/marker-2.jpg',
  'img/marker-1.jpg',
  'img/marker-2.jpg',
  'img/marker-1.jpg',
  'img/marker-2.jpg',
  'img/marker-1.jpg',
];

const uprights = [
  'img/up.jpg',
  'img/up-2.jpg',
  'img/up-3.jpg',
  'img/up-4.jpg',
  'img/up-5.jpg',
  'img/up-6.jpg',
  'img/up-7.jpg',
  'img/up-8.jpg',
  'img/up-9.jpg',
  'img/up-10.jpg',
  'img/up-11.jpg',
  'img/up-12.jpg',
  'img/up-13.jpg',
  'img/up-14.jpg',
  'img/up-15.jpg',
];

const special = [
  'img/special.jpg',
  'img/special2.jpg',
  'img/special3.jpg',
  'img/special4.jpg',
  'img/special5.jpg',
  'img/special6.jpg',
  'img/special7.jpg',
  'img/special8.jpg',
  'img/special9.jpg',
  'img/special10.jpg',
  'img/special11.jpg',
  'img/special12.jpg',
  'img/special13.jpg',
  'img/special14.jpg',
  'img/special15.jpg',
];

const slants = [
  'img/slant.jpg',
  'img/slant2.jpg',
  'img/special8.jpg',
  'img/special7.jpg',
  'img/slant4.jpg',
  'img/special5.jpg',
  'img/special6.jpg',
  'img/slant3.jpg',
  'img/special11.jpg',
  'img/special12.jpg',
  'img/special13.jpg',
  'img/special14.jpg',
  'img/special15.jpg',
  'img/special9.jpg',
  'img/special10.jpg',
];

const imgArrays = [markers, uprights, slants, special];

const addFocus = function (btnName) {
  btnLoc.forEach((btn) => {
    btn.classList.remove('btn-background-focus');
  });
  btnName.classList.add('btn-background-focus');
};

const hideLocation = function (btnName) {
  storeLoc.forEach((loc) => {
    loc.classList.add('hidden');
  });
  btnName.classList.remove('hidden');
};

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

btnContainer?.addEventListener('click', (e) => {
  e.preventDefault();
  const targetName = e.target.id;
  addFocus(this[targetName]);
  hideLocation(this[targetName.substring(targetName.indexOf('-') + 1)]);
});
function myFunction() {
  var x = document.getElementById('myTopnav');
  if (x.className === 'rightnav') {
    x.className += ' responsive';
  } else {
    x.className = 'rightnav';
  }
}

imagesBtns?.addEventListener('click', (e) => {
  e.preventDefault();
  const targetNumber = e.target.getAttribute('data-number');
  const targetID = e.target.id;
  addBTNFocus(this[targetID]);

  imgGal.forEach((img, index) => {
    img.src = imgArrays[Number(targetNumber)][index];
  });
});

const addBTNFocus = function (btnName) {
  btnGal.forEach((btn) => {
    btn.classList.remove('btn-background-focus');
  });
  btnName.classList.add('btn-background-focus');
};
