document.addEventListener('DOMContentLoaded', () => {
  const subscribeForm = document.getElementById('subscribe-form');
  const subscribeEmail = document.getElementById('subscribe-email');

  // Проверяем, нашлись ли элементы на странице, чтобы избежать ошибок
  if (!subscribeForm || !subscribeEmail) {
    console.error('Ошибка: Элементы формы не найдены в HTML! Проверьте ID.');
    return;
  }

  subscribeForm.addEventListener('submit', (event) => {
    // Теперь это сработает гарантированно и страница не перезагрузится
    event.preventDefault();

    if (subscribeEmail.checkValidity()) {
      const subscriberData = {
        email: subscribeEmail.value.trim()
      };
    console.log(subscriberData);

      // Очищаем инпут
      subscribeEmail.value = '';
    } else {
      alert('Пожалуйста, введите корректный адрес электронной почты!');
    }
  });
});

// Внешняя переменная для сохранения данных успешной регистрации
let user = null;

document.addEventListener('DOMContentLoaded', () => {
  // Находим элементы управления модальным окном
  const openModalBtn = document.getElementById('open-register-btn');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const modalOverlay = document.getElementById('modal-overlay');

  // Находим элементы формы
  const registerForm = document.getElementById('register-form');

  // --- Открытие и закрытие модального окна ---

  // Открываем модалку по клику на "Регистрация"
  openModalBtn.addEventListener('click', () => {
    modalOverlay.classList.add('modal-showed');
  });

  // Закрываем модалку по клику на крестик
  closeModalBtn.addEventListener('click', () => {
    modalOverlay.classList.remove('modal-showed');
    registerForm.reset(); // Очищаем форму при закрытии
  });

  // Дополнительно: Закрытие модалки при клике на сам оверлей (серое поле вокруг окна)
  modalOverlay.addEventListener('click', (event) => {
    if (event.target === modalOverlay) {
      modalOverlay.classList.remove('modal-showed');
      registerForm.reset();
    }
  });

  /*// --- Валидация и отправка формы ---
  registerForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Отменяем перезагрузку страницы

    // Получаем значения полей
    const firstName = document.getElementById('reg-firstname').value.trim();
    const lastName = document.getElementById('reg-lastname').value.trim();
    const dob = document.getElementById('reg-dob').value;
    const login = document.getElementById('reg-login').value.trim();
    const password = document.getElementById('reg-password').value;
    const confirmPassword = document.getElementById('reg-confirm-password').value;

    // 1. Проверяем встроенную валидацию браузера
    if (!registerForm.checkValidity()) {
      alert('Регистрация отклонена: Пожалуйста, корректно заполните все поля!');
      return;
    }

    // 2. Проверяем совпадение паролей
    if (password !== confirmPassword) {
      alert('Регистрация отклонена: Пароли не совпадают!');
      return;
    }

     // 3. Формируем объект пользователя при успешной регистрации
    user = {
      firstName: firstName,
      lastName: lastName,
      dateOfBirth: dob,
      login: login,
      password: password, // В реальных проектах пароли не хранят в чистом виде, но для учебного задания ок
      createdOn: new Date() // Текущее время создания объекта
    };

    // 4. Выводим объект в консоль
    console.log('Регистрация успешна! Объект сохранен в переменную user:', user);

    // 5. Очищаем форму и закрываем модальное окно
    registerForm.reset();
    modalOverlay.classList.remove('modal-showed');
    alert('Вы успешно зарегистрированы!');
  });*/

  registerForm.addEventListener('submit', (event) => {
    event.preventDefault(); 
    if (!registerForm.checkValidity()) {
      alert('Регистрация отклонена: Пожалуйста, корректно заполните все поля!');
      return;
    }

    // 1. Создаем объект FormData, передавая в него саму форму
    const formData = new FormData(registerForm);

    // 2. Превращаем FormData в обычный чистый JavaScript-объект
    const userData = Object.fromEntries(formData.entries());

    // 3. Дополнительные проверки (например, совпадение паролей)
    // Значения берутся по ключам, которые соответствуют атрибутам name в HTML
    if (userData.password !== userData['confirm-password']) {
      alert('Регистрация отклонена: Пароли не совпадают!');
      return;
    }

    // 4. Триммим строковые поля и добавляем системные свойства
    userData.firstName = userData.firstName.trim();
    userData.lastName = userData.lastName.trim();
    userData.login = userData.login.trim();
    userData.createdOn = new Date();

    // Удаляем техническое поле повтора пароля, оно больше не нужно
    delete userData['confirm-password'];

    // 5. Записываем результат в глобальную переменную user
    user = userData;

    // Безопасный вывод в консоль (скрываем пароль перед логом)
    const { password: _, ...safeUserLog } = user;
    console.log('Регистрация успешна! Данные сохранены в user:', safeUserLog);

    registerForm.reset();
      modalOverlay.classList.remove('modal-showed');
      alert('Вы успешно зарегистрированы!');
  });
});
