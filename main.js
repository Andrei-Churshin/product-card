const productCards = document.querySelectorAll('.card')
const changeColorCardButton = document.querySelector('#btn-change-color-all-cards');
const greenColorHash ='#00ff00';
const pinkColorHash ='#ea00ff';

changeColorCardButton.addEventListener('click', () => {
  productCards.forEach((card) => card.style.backgroundColor = greenColorHash)
})

const firstProductCard = document.querySelector('.card')
const changeColorFirstCardButton = document.querySelector('#btn-change-color-first-card');

changeColorFirstCardButton.addEventListener('click', () => {
  firstProductCard.style.backgroundColor = pinkColorHash;
})


const googleButton = document.querySelector('#btn-open-google');
function askAndOpenGoogle() {
  const userAnswer = confirm('Вы действительно хотите перейти в Google?');
  if(userAnswer === true) {
    window.open('http://www.google.com');}
    else {console.log('Пользователь остался на странице');}
}
googleButton.addEventListener('click', askAndOpenGoogle);


const messageButton = document.querySelector('#btn-message');
messageButton.addEventListener('click', () => outputConsoleLog ('ДЗ#6'));
  
function outputConsoleLog(text) {
  alert('Подтвердите действие')
  console.log(text)
}

const pageTitle = document.querySelector('.title');
pageTitle.addEventListener('mouseover', () => {
  console.log(pageTitle.textContent);
});

const toggleButton = document.querySelector('#btn-toggle');
toggleButton.addEventListener('click', function() {
  toggleButton.classList.toggle('active-color');
});