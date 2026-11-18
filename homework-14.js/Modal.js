export class Modal {
  constructor(modalId, buttonId, shouldCloseOnOverlay) {
    this.modal = document.getElementById(modalId);
    this.overlay = document.getElementById('overlay');
    this.shouldCloseOnOverlay = shouldCloseOnOverlay;

    console.log(`[Modal Init] Инициализация модалки "${modalId}". Найдена:`, !!this.modal, `Оверлей найден:`, !!this.overlay);
    
    this.#initOpen(buttonId);
  }

  open() {
    this.modal.classList.add('modal-showed');
    this.overlay.classList.add('overlay-showed');
    
    // Инициализируем кнопку закрытия Х внутри окна только при его открытии
    this.#initClose();

    // Если передан флаг true, добавляем слушатель на оверлей в момент открытия
    if (this.shouldCloseOnOverlay) {

      console.log('[Modal Action] Добавлен слушатель клика на оверлей');

      this.overlay.addEventListener('click', this.#handleClose);
    }
    
    // Запрещаем прокрутку страницы
    document.body.style.overflow = 'hidden';
  }

  close() {

    console.log('[Modal Action] Вызов метода close(). Текущее состояние isOpen():', this.isOpen());

    this.modal.classList.remove('modal-showed');
    this.overlay.classList.remove('overlay-showed');
    
    // Удаляем слушатель с оверлея при закрытии окна, передавая ту же функцию
    if (this.shouldCloseOnOverlay) {

      console.log('[Modal Action] Удален слушатель клика с оверлея');

      this.overlay.removeEventListener('click', this.#handleClose);
    }

    // Удаляем слушатель с крестика закрытия Х, чтобы не дублировать их при следующем открытии
    const closeButton = this.modal.querySelector('[data-modal-close]');
    if (closeButton) {

      console.log('[Modal Action] Удален слушатель с кнопки закрытия');

      closeButton.removeEventListener('click', this.#handleClose);
    }
    
    // Возвращаем прокрутку страницы
    document.body.style.overflow = '';
  }

  isOpen() {
    return this.modal.classList.contains('modal-showed');
  }

  #initOpen(buttonId) {
    const button = document.getElementById(buttonId);
    if (button) {
      button.addEventListener('click', () => {

        console.log(`[Modal Event] Клик по кнопке "${buttonId}" для открытия`);

        this.open();
      });
    }
  }

  #initClose() {
    const closeButton = this.modal.querySelector('[data-modal-close]');
    if (closeButton) {
      closeButton.addEventListener('click', this.#handleClose);
    }
  }

  #handleClose = () => {
    this.close();
  }
}