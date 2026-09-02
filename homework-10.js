import { products } from "./products.js";

// --- Пункт 4: Метод .reduce() ---
const productsMap = products.reduce((acc, product) => {
  acc.push({[product.name]: product.text });
  return acc;
}, []);

console.log("Результат метода .reduce():", productsMap);

// --- Пункт 5*: Функции для интерактивного отображения карточек с помощью <template> ---

// Функция 1: запрашивает у пользователя количество карточек (от 1 до 5) с защитой
function getCardCount() {
  let count;
  while (true) {
    const input = prompt("Сколько карточек отобразить? От 1 до 5");
    if (input === null) return 0;
    count = Number(input.trim());
    if (!isNaN(count) && count >= 1 && count <= 5) {
      return count;
    }
    alert("Ошибка! Пожалуйста, введите целое число от 1 до 5.");
  }
}

const countToDisplay = getCardCount();
if (countToDisplay > 0) {
  const slicedProducts = products.slice(0, countToDisplay);
  renderCards(slicedProducts);
}

function renderCards(itemsToRender) {
  const cardTemplate = document.querySelector('#card-template');
  const cardList = document.querySelector('#card-list');
  if (!cardTemplate || !cardList) return;
  cardList.innerHTML = '';
  const fragment = document.createDocumentFragment();
  itemsToRender.forEach(product => {
    const productClone = cardTemplate.content.cloneNode(true);
    const imgElement = productClone.querySelector('.card__img');
    if (imgElement) {
      imgElement.src = product.img;
      imgElement.alt = product.name;
    }
    productClone.querySelector('.card__type').textContent = product.type;
    productClone.querySelector('.card__name').textContent = product.name;
    productClone.querySelector('.card__text').textContent = product.text;
    productClone.querySelector('.card__ingredients-title').textContent = product.title;
    const compoundList = productClone.querySelector('.card__compound-list');
    if (compoundList) {
      product.ingredients.forEach(ingredient => {
        const li = document.createElement('li');
        li.textContent = ingredient;
        compoundList.appendChild(li);
      });
    }
    productClone.querySelector('.card__price').textContent = product.price;
    productClone.querySelector('.card__cost').textContent = product.cost;
  
    fragment.appendChild(productClone);
  });

  cardList.appendChild(fragment);
  console.log(cardList)
}