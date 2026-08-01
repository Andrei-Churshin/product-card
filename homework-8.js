
// 3. Создание объекта пользователя (владельца)

const userProfile = {
  firstName: "Андрей",
  lastName: "Чуршин",
  email: "andrejcursin25@gmail.com",
  job: "Разработчик",
  position: "Frontend Developer",
  age: 43,
  country: "Турция",
  city: "Айдынджик",
  relationshipStatus: "женат"
};

// 4. Создание объекта автомобиля

const car = {
    brand: "Toyota",
    model: "Camry",
    year: 2022,
    color: "белый",
    transmission: "автомат"
};

car.owner = userProfile; 

// 5. Функция проверки и добавления скорости

function checkAndAddMaxSpeed(carObject) {
    if (!Object.hasOwn(carObject, "maxSpeed")) {
        carObject.maxSpeed = 220;
    }
}

checkAndAddMaxSpeed(car);
console.log("Авто с максимальной скоростью:", car);

// 6. Функция вывода свойства объекта

function printObjectProperty(obj, propertyName) {
  console.log(`Значение свойства "${propertyName}":`, obj[propertyName]);
}

printObjectProperty(car, "model");


// 7. Создание массива продуктов

const products = ["Молоко", "Хлеб", "Сыр", "Яблоки", "Кофе"];
console.log("Список продуктов:", products);

// 8. Создаем массивбсостоящий из обьектов и добавляем в него еще один обьект при помощи метода "push"

const adventureBooks = [
  {
    title: "Остров сокровищ",
    author: "Роберт Стивенсон",
    year: 1883,
    coverColor: "синий",
    genre: "приключения"
  },
  {
    title: "Три мушкетёра",
    author: "Александр Дюма",
    year: 1844,
    coverColor: "красный",
    genre: "приключения"
  },
  {
    title: "Пятнадцатилетний капитан",
    author: "Жюль Верн",
    year: 1878,
    coverColor: "голубой",
    genre: "приключения"
  },
  {
    title: "Одиссея капитана Блада",
    author: "Рафаэль Сабатини",
    year: 1922,
    coverColor: "чёрный",
    genre: "приключения"
  },
];

  adventureBooks.push({
    title: "Дневной Дозор",
    author: "Сергей Лукьяненко",
    year: 2000,
    coverColor: "чёрный",
    genre: "фантастика"
});

// 9. Создаем еще один массив и обьединяем его с уже существующим при помощи оператора spread

const russianLiteratureBooks = [
  {
    title: "Преступление и наказание",
    author: "Фёдор Достоевский",
    year: 1866,
    coverColor: "коричневый",
    genre: "классическая проза"
  },
  {
    title: "Евгений Онегин",
    author: "Александр Пушкин",
    year: 1833,
    coverColor: "зелёный",
    genre: "роман в стихах"
  },
  {
    title: "Отцы и дети",
    author: "Иван Тургенев",
    year: 1862,
    coverColor: "серый",
    genre: "классическая проза"
  },
  {
    title: "Мастер и Маргарита",
    author: "Михаил Булгаков",
    year: 1967,
    coverColor: "бордовый",
    genre: "фантастика"
  },
  {
    title: "Generation «П»",
    author: "Виктор Пелевин",
    year: 2005,
    coverColor: "желтый",
    genre: "постмодернизм"
  }
];

const allBooks = [...adventureBooks, ...russianLiteratureBooks];

console.log(allBooks);



// 10. принимаем функцию,принимающую массив allBooks. Добавляем новое свойство для обьекта и проверяем соответствие обьектов массива новому условию 

function markRareBooks(allBooks) {
  return allBooks.map(book => {
    const isBookRare = book.year > 2000;
    return {
      ...book,
      isRare: isBookRare
    };
  });
}







