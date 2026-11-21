const STORAGE_KEY = 'users';
const JSON_PATH = './users.json';

const statusText = document.getElementById('statusText');
const cardsContainer = document.getElementById('cardsContainer');
const getAllBtn = document.getElementById('getAllBtn');
const deleteAllBtn = document.getElementById('deleteAllBtn');

// Вспомогательная функция задержки
function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

// Вывод статусов и уведомлений на страницу
function setStatus(text, type = '') {
  statusText.textContent = text;
  statusText.className = 'message';
  if (type) {
    statusText.classList.add(type);
  }
}

// Работа с localStorage
function getStoredUsers() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : null;
}

function saveStoredUsers(users) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

// Отрисовка карточек пользователей
function renderCards(users) {
  cardsContainer.innerHTML = '';

  if (!users || users.length === 0) {
    setStatus('Список карточек пуст', 'info');
    return;
  }

  users.forEach((user) => {
    const card = document.createElement('div');
    card.className = 'card';

    card.innerHTML = `
      <div>
        <h3>${user.name} ${user.surname}</h3>
        <p><b>ID:</b> ${user.id}</p>
        <p><b>Возраст:</b> ${user.age}</p>
        <p><b>Email:</b> ${user.email}</p>
        ${user.city ? `<p><b>Город:</b> ${user.city}</p>` : ''}
      </div>
      <button class="btn-delete-card" data-id="${user.id}">Удалить карточку</button>
    `;

    cardsContainer.appendChild(card);
  });
}

// Асинхронный запрос данных с симуляцией задержки
async function loadUsersFromJson() {
  setStatus('Данные загружаются');
  cardsContainer.innerHTML = '';

  try {
    // Симуляция длительной загрузки (2 секунды)
    await delay(2000);

    const response = await fetch(JSON_PATH);

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }

    const data = await response.json();

    if (!data.users || !Array.isArray(data.users)) {
      throw new Error('Некорректная структура JSON файла');
    }

    saveStoredUsers(data.users);
    setStatus('');
    renderCards(data.users);
  } catch (error) {
    console.error(error);
    setStatus('Ошибка при загрузке данных', 'error');
  }
}

// Удаление конкретной карточки через .filter()
function deleteSingleUser(id) {
  const currentUsers = getStoredUsers() || [];
  const filteredUsers = currentUsers.filter((user) => user.id !== id);

  saveStoredUsers(filteredUsers);
  setStatus('');
  renderCards(filteredUsers);
}

// Удаление всех карточек
function deleteAllUsers() {
  const currentUsers = getStoredUsers() || [];

  if (currentUsers.length === 0) {
    setStatus('Карточки уже удалены', 'info');
    return;
  }

  saveStoredUsers([]);
  renderCards([]);
}

// Кнопка "Получить все карточки"
async function handleGetAllCards() {
  const currentUsers = getStoredUsers() || [];

  try {
    const response = await fetch(JSON_PATH);
    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }

    const data = await response.json();
    const allUsers = data.users || [];

    // Проверяем, не отображены ли уже все пользователи
    if (currentUsers.length === allUsers.length) {
      setStatus('У вас уже отображены все пользователи', 'info');
      return;
    }

    setStatus('Данные загружаются');
    cardsContainer.innerHTML = '';

    await delay(1500);

    saveStoredUsers(allUsers);
    setStatus('');
    renderCards(allUsers);
  } catch (error) {
    console.error(error);
    setStatus('Ошибка при загрузке данных', 'error');
  }
}

// Слушатели событий
cardsContainer.addEventListener('click', (event) => {
  if (event.target.classList.contains('btn-delete-card')) {
    const id = Number(event.target.dataset.id);
    deleteSingleUser(id);
  }
});

deleteAllBtn.addEventListener('click', deleteAllUsers);
getAllBtn.addEventListener('click', handleGetAllCards);

// Запуск при открытии страницы
function init() {
  const storedUsers = getStoredUsers();

  // Если в localStorage ещё ничего нет — делаем запрос
  if (storedUsers === null) {
    loadUsersFromJson();
  } else {
    // Если данные уже есть — отрисовываем их без запроса
    renderCards(storedUsers);
  }
}

init();
