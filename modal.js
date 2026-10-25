export default class Modal {
  constructor(modalId) {
    this.modalOverlay = document.getElementById(modalId);
    if (!this.modalOverlay) {
      console.error(`Модальное окно с id "${modalId}" не найдено!`);
      return;
    }
    
    // Поиск кнопки закрытия внутри модалки
    this.closeBtn = this.modalOverlay.querySelector('#close-modal-btn');
    
    // Инициализация слушателей событий в конструкторе
    this.initListeners();
  }

  // I. Метод для открытия модального окна
  open() {
    if (this.modalOverlay) {
      this.modalOverlay.classList.add('modal-showed');
    }
  }

  // II. Метод для закрытия модального окна
  close() {
    if (this.modalOverlay) {
      this.modalOverlay.classList.remove('modal-showed');
    }
  }

  // III. Метод для проверки, открыто ли сейчас окно
  isOpen() {
    return this.modalOverlay ? this.modalOverlay.classList.contains('modal-showed') : false;
  }

  // IV. Метод, который слушает кнопку (крестик) и клик по оверлею
  initListeners() {
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }

    // Закрытие по клику на серое поле вокруг окна
    this.modalOverlay.addEventListener('click', (event) => {
      if (event.target === this.modalOverlay) {
        this.close();
      }
    });
  }
}