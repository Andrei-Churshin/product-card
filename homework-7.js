function printWeather(townName, temperature) {
  console.log(`Сейчас в городе ${townName} температура — ${temperature} градусов по Цельсию `)
}

printWeather("Лондон", "20");
printWeather("Казань", "15");


const SPEED_OF_LIGTH = 299792458;

function checkSpeedValue(currentSpeed) {
  if (currentSpeed > SPEED_OF_LIGTH) {
    console.log("Сверхсветовая скорость");
  } else if (currentSpeed < SPEED_OF_LIGTH) {
    console.log("Субсветовая скорость");
  } else {
    console.log("Скорость света");
  }
}

checkSpeedValue(345678903);
checkSpeedValue(213476555);
checkSpeedValue(299792458);


const productName = "BMW_X5";
const productPrice = 525000;

function currentBudget(userBudget) {
  if (userBudget >= productPrice) {
    console.log(`"${productName}" приобретен. Спасибо за покупку!`);
  } else {
    const missingMoney = productPrice - userBudget;
    console.log(`Вам не хватает ${missingMoney}$, пополните баланс`)
  }
}

currentBudget(540000);
currentBudget(500000);


const CRITICAL_DRYNESS_LEVEL = 30;

function waterHouseplant(planType, maxSoilMoisture, currentMoisture) {
  if (currentMoisture < CRITICAL_DRYNESS_LEVEL) {
    const neededWater = 200 - currentMoisture;
    const volumeNeeded = maxSoilMoisture * neededWater / 100;
    console.log(`Критический уровень влажности ${planType}! Нужно долить ${volumeNeeded} мл.`);
  } else if (currentMoisture >= CRITICAL_DRYNESS_LEVEL && currentMoisture < 100) {
    const neededWater = 200 - currentMoisture;
    const volumeNeeded = maxSoilMoisture * neededWater / 100;
    console.log(`Уровень влажности ${planType} в норме. Можно долить еще ${volumeNeeded} мл.`);
  } else {
    console.log(`Растение ${planType} полностью полито`);
  }
}

const myPlan = "Тюльпаны";
const maxSoilMoisture = 60;
let currentMoisture = 35;

waterHouseplant(myPlan, maxSoilMoisture, currentMoisture);