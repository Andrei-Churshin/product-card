import Modal from './modal.js'
import Form from './form.js'
                                 //Задание 3 //

// 1. Базовый класс - Автомобиль (предок для всех машин)
class Vehicle {
  constructor(brand, model, year, price) {
    this.brand = brand;       // Марка 
    this.model = model;       // Модель 
    this.year = year;         // Год выпуска
    this.price = price;       // Стоимость
    this.currentSpeed = 0;    // Текущая скорость (по умолчанию 0)
  }

  // Общий метод для всех машин - показать информацию
  getInfo() {
    return `${this.brand} ${this.model} (${this.year} года) — Цена: $${this.price}`;
  }

  // Общий метод - разогнаться
  accelerate(speed) {
    this.currentSpeed += speed;
    console.log(`${this.brand} ${this.model} ускорился до ${this.currentSpeed} км/ч.`);
  }

  // Общий метод - остановиться
  brake() {
    this.currentSpeed = 0;
    console.log(`${this.brand} ${this.model} полностью остановился.`);
  }
}

// 2. Дочерний класс - Электромобиль (наследует Vehicle)
class ElectricCar extends Vehicle {
  constructor(brand, model, year, price, batteryCapacity) {
    // Вызываем конструктор родителя с помощью super()
    super(brand, model, year, price);
    
    // Добавляем уникальное свойство для электрокаров
    this.batteryCapacity = batteryCapacity; // Емкость батареи в кВт⋅ч
    this.chargeLevel = 100;                 // Уровень заряда в %
  }

  // Переопределение метода getInfo
  getInfo() {
    // Используем метод родителя + добавляем свою информацию
    return `${super.getInfo()} [Электромобиль, Батарея: ${this.batteryCapacity} кВт⋅ч]`;
  }

  // Уникальный метод электромобиля - зарядить батарею
  charge() {
    this.chargeLevel = 100;
    console.log(`${this.brand} ${this.model} полностью заряжен!`);
  }
}

// 3. Дочерний класс - Грузовик (наследует Vehicle)
class Truck extends Vehicle {
  constructor(brand, model, year, price, maxLoadCapacity) {
    // Вызываем конструктор родителя
    super(brand, model, year, price);
    
    // Добавляем уникальное свойство для грузовиков
    this.maxLoadCapacity = maxLoadCapacity; // Максимальная грузоподъемность в тоннах
    this.currentCargoWeight = 0;            // Текущий вес груза
  }

  // Переопределение метода getInfo
  getInfo() {
    return `${super.getInfo()} [Грузовик, Грузоподъемность: ${this.maxLoadCapacity} т]`;
  }

  // Уникальный метод грузовика - загрузить товар
  loadCargo(weight) {
    if (this.currentCargoWeight + weight > this.maxLoadCapacity) {
      console.log(`Превышен лимит! Грузовик ${this.brand} не может поднять больше ${this.maxLoadCapacity} тонн.`);
    } else {
      this.currentCargoWeight += weight;
      console.log(`В грузовик успешно загружено ${weight} т. Текущий вес груза: ${this.currentCargoWeight} т.`);
    }
  }
}

// Создаем обычную машину
const simpleCar = new Vehicle('Toyota', 'Camry', 2021, 25000);
console.log(simpleCar.getInfo()); 

simpleCar.accelerate(60); // Работает базовый метод


// Создаем электромобиль (наследование в действии)
const myTesla = new ElectricCar('Tesla', 'Model S', 2023, 85000, 100);
console.log(myTesla.getInfo()); 

myTesla.accelerate(100); // Метод унаследован от базового класса Vehicle
myTesla.charge();        // Собственный метод класса ElectricCar


// Создаем грузовик
const bigTruck = new Truck('Volvo', 'FH16', 2020, 120000, 25);
console.log(bigTruck.getInfo());

bigTruck.loadCargo(10); // Успешно загрузит 10 тонн
bigTruck.loadCargo(20); // Выведет предупреждение о перегрузе (10 + 20 = 30, а максимум 25)
bigTruck.brake();       // Метод унаследован от базового класса Vehicle


                         //Переписал логику задания №11//

let user = null; // Внешняя переменная для сохранения данных

document.addEventListener('DOMContentLoaded', () => {
  // 1. Инициализируем компоненты через созданные классы
  const registerModal = new Modal('modal-overlay');
  const registerForm = new Form('register-form');
  const subscribeForm = new Form('subscribe-form');

  // Кнопка открытия модалки регистрации
  const openModalBtn = document.getElementById('open-register-btn');

  if (openModalBtn) {
    openModalBtn.addEventListener('click', () => {
      registerModal.open();
    });
  }

  // 2. Логика формы подписки
  const subscribeElement = document.getElementById('subscribe-form');
  if (subscribeElement) {
    subscribeElement.addEventListener('submit', (event) => {
      event.preventDefault(); 

      // Сначала выполняем валидацию
      if (!subscribeForm.isValid()) {
        alert('Пожалуйста, введите корректный адрес электронной почты!');
        return; // Если невалидно — прерываем выполнение функции
      }

      // Если валидация прошла успешно, собираем данные
      const values = subscribeForm.getValues();
      const subscriberData = {
        email: values.email ? values.email.trim() : ''
      };
      
      console.log('Подписка оформлена:', subscriberData);
      
      // Сбрасываем форму ТОЛЬКО после всех операций с данными
      subscribeForm.reset();
    });
  }

  // 3. Логика формы регистрации
  const registerElement = document.getElementById('register-form');
  if (registerElement) {
    registerElement.addEventListener('submit', (event) => {
      event.preventDefault(); // Предотвращаем перезагрузку и дублирование событий

      if (!registerForm.isValid()) {
        alert('Регистрация отклонена: Пожалуйста, корректно заполните все поля!');
        return; // прерываем выполнение, чтобы код не шёл дальше
      }

      const userData = registerForm.getValues();

      // Проверка совпадения паролей
      if (userData.password !== userData['confirm-password']) {
        alert('Регистрация отклонена: Пароли не совпадают!');
        return;
      }

      // Добавляем системные свойства
      userData.createdOn = new Date();
      delete userData['confirm-password'];

      // Сохраняем в глобальную переменную
      user = userData;

      // Безопасный лог (без пароля)
      const { password: _, ...safeUserLog } = user;
      console.log('Регистрация успешна! Данные сохранены в user:', safeUserLog);

      registerModal.close();
      alert('Вы успешно зарегистрированы!');
      registerForm.reset(); 
    });
  }

  // 4. Безопасный сброс формы при закрытии модалки по оверлею или крестику
  if (registerModal.modalOverlay) {
    registerModal.modalOverlay.addEventListener('click', (event) => {
      const isOverlay = event.target === registerModal.modalOverlay;
      const isCloseBtn = event.target.id === 'close-modal-btn' || event.target.closest('#close-modal-btn');
      
      if (isOverlay || isCloseBtn) {
        registerForm.reset();
      }
    });
  }
});
