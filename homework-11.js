document.addEventListener('DOMContentLoaded', () => {
  const subscribeForm = document.getElementById('subscribe-form');
  const subscribeEmail = document.getElementById('subscribe-email');

  if (!subscribeForm || !subscribeEmail) {
    console.error('Ошибка: Элементы формы не найдены в HTML! Проверьте ID.');
    return;
  }

  subscribeForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (subscribeEmail.checkValidity()) {
      const subscriberData = {
        email: subscribeEmail.value.trim()
      };
      
      console.log(subscriberData);
      
      subscribeEmail.value = '';
    } else {
      alert('Пожалуйста, введите корректный адрес электронной почты!');
    }
  });
});

let user = null;

document.addEventListener('DOMContentLoaded', () => {
  const openModalBtn = document.getElementById('open-register-btn');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const modalOverlay = document.getElementById('modal-overlay');
  const registerForm = document.getElementById('register-form');

  openModalBtn.addEventListener('click', () => {
    modalOverlay.classList.add('modal-showed');
  });

  closeModalBtn.addEventListener('click', () => {
    modalOverlay.classList.remove('modal-showed');
    registerForm.reset(); 
  });

  modalOverlay.addEventListener('click', (event) => {
    if (event.target === modalOverlay) {
      modalOverlay.classList.remove('modal-showed');
      registerForm.reset();
    }
  });

  registerForm.addEventListener('submit', (event) => {
    event.preventDefault(); 

    const firstName = document.getElementById('reg-firstname').value.trim();
    const lastName = document.getElementById('reg-lastname').value.trim();
    const dob = document.getElementById('reg-dob').value;
    const login = document.getElementById('reg-login').value.trim();
    const password = document.getElementById('reg-password').value;
    const confirmPassword = document.getElementById('reg-confirm-password').value;

    if (!registerForm.checkValidity()) {
      alert('Регистрация отклонена: Пожалуйста, корректно заполните все поля!');
      return;
    }

    if (password !== confirmPassword) {
      alert('Регистрация отклонена: Пароли не совпадают!');
      return;
    }

    user = {
      firstName: firstName,
      lastName: lastName,
      dateOfBirth: dob,
      login: login,
      password: password, 
      createdOn: new Date() 
    };

    console.log('Регистрация успешна! Объект сохранен в переменную `user`:', user);

    registerForm.reset();
    modalOverlay.classList.remove('modal-showed');
    
    alert('Вы успешно зарегистрированы!');
  });
});
