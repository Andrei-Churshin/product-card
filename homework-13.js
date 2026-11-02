class Drink {
    #temperature;

    constructor(name, size, price, temperature = 20.0) {
        if (new.target === Drink) {
            throw new Error("Нельзя создать экземпляр абстрактного класса Drink напрямую!");
        }
        this.name = name;
        this.size = size;
        this.price = price;
        this.#temperature = temperature;
    }

    getTemperature() {
        return this.#temperature;
    }

    setTemperature(temp) {
        this.#temperature = temp;
        console.log(`[ЛОГ] Температура напитка '${this.name}' изменена до ${this.#temperature}°C.`);
    }

    getInfo() {
        throw new Error("Метод getInfo() должен быть реализован в классе-наследнике!");
    }

    heatUp(degrees) {
        const newTemp = this.#temperature + degrees;
        this.setTemperature(newTemp);
        console.log(`[ЛОГ] Напиток ${this.name} подогрет.`);
    }

    setRefreshing() {
        this.setTemperature(5.0);
        console.log(`[ЛОГ] Напиток ${this.name} охлажден до прохладного состояния.`);
    }

    // ИСПРАВЛЕННЫЙ МЕТОД: Разделяем логику для горячих и холодных напитков
    #prepareProcess() {
        console.log(`[ЛОГ] Запущен процесс приготовления напитка: ${this.name}...`);
        if (this.name === "Лимонад") {
            this.setRefreshing(); 
        } else {
            this.heatUp(5.0); // Небольшой догрев вместо 60°C
        }
    }

    serve() {
        this.#prepareProcess();
        console.log(`[ЛОГ] Напиток '${this.name}' (${this.size}) успешно подан гостю! ☕️\n`);
    }
}

class Coffee extends Drink {
    constructor(size, price, beanType, milkType) {
        super("Кофе", size, price, 80.0);
        this.beanType = beanType;
        this.milkType = milkType;
    }

    getInfo() {
        return `Кофе | Зерна: ${this.beanType}, Молоко: ${this.milkType}, Размер: ${this.size}, Цена: ${this.price} руб.`;
    }
}

class Tea extends Drink {
    constructor(size, price, teaSort) {
        super("Чай", size, price, 85.0);
        this.teaSort = teaSort;
    }

    getInfo() {
        return `Чай | Сорт: ${this.teaSort}, Размер: ${this.size}, Цена: ${this.price} руб.`;
    }
}

class Lemonade extends Drink {
    constructor(size, price, fruitFlavor) {
        super("Лимонад", size, price, 6.0);
        this.fruitFlavor = fruitFlavor;
    }

    getInfo() {
        return `Лимонад | Вкус: ${this.fruitFlavor}, Размер: ${this.size}, Цена: ${this.price} руб.`;
    }
}

class Cafe {
    constructor(name, location) {
        this.name = name;
        this.location = location;
    }

    getCafeInfo() {
        return `Кафе: '${this.name}', Адрес: ${this.location}`;
    }

    orderDrink(drink) {
        console.log(`--- Новый заказ в кафе '${this.name}' ---`);
        console.log(`Информация о заказе: ${drink.getInfo()}`);
        drink.serve();
    }
}

// Проверка
const myCafe = new Cafe("Coffee & Drinks","ТЦ Форум, г. Мерсин");

console.log(myCafe.getCafeInfo());

const latte = new Coffee("0.4л", 150.0, "Арабика", "Миндальное");
const greenTea = new Tea("0.5л", 100.0, "Зеленый с жасмином");
const citrusLemonade = new Lemonade("0.5л", 120.0, "Апельсин-маракуйя");

myCafe.orderDrink(latte);
myCafe.orderDrink(greenTea);
myCafe.orderDrink(citrusLemonade);

