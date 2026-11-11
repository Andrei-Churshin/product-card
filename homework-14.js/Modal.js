/*export class Modal {
  constructor(modalId, buttonId, shouldCloseOnOverlay) {
    this.modal = document.getElementById(modalId);
    this.overlay = document.getElementById('overlay');
    this.shouldCloseOnOverlay = shouldCloseOnOverlay;
    this.#initOpen(buttonId);
    this.#initClose();
  }

  open() {
    this.modal.classList.add('modal-showed');
    this.overlay.classList.add('overlay-showed');
    if (this.shouldCloseOnOverlay) {
      this.overlay.addEventListener('click', this.#handleOverlayClick);
    }
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.modal.classList.remove('modal-showed');
    this.overlay.classList.remove('overlay-showed');
    if (this.shouldCloseOnOverlay) {
      this.overlay.removeEventListener('click', this.#handleOverlayClick);
    }
    // Restore body scroll
    document.body.style.overflow = '';
  }

  isOpen() {
    return this.modal.classList.contains('modal-showed');
  }

  #initOpen(buttonId) {
    const button = document.getElementById(buttonId);
    button.addEventListener('click', () => {
      this.open();
    })
  }

  #initClose() {
    const closeButton = this.modal.querySelector('[data-modal-close]');

    closeButton.addEventListener('click', () => {
      this.close();
    })
  }

  #handleOverlayClick = () => {
    this.close();
  }
}*/

export class Modal {
  constructor(modalId, buttonId, shouldCloseOnOverlay) {
    this.modal = document.getElementById(modalId);
    this.overlay = document.getElementById('overlay');
    this.shouldCloseOnOverlay = shouldCloseOnOverlay;

    this.#initOpen(buttonId);
  }

  open() {
    this.modal.classList.add('modal-showed');
    this.overlay.classList.add('overlay-showed');
    
    this.#initClose();

    // Если передан флаг true, добавляем слушатель на оверлей в момент открытия
    if (this.shouldCloseOnOverlay) {
      this.overlay.addEventListener('click', this.#handleOverlayClick);
    }
    
    // Запрещаем прокрутку страницы
    document.body.style.overflow = 'hidden';
  }

  close() {

    this.modal.classList.remove('modal-showed');
    this.overlay.classList.remove('overlay-showed');
    
    // Удаляем слушатель с оверлея при закрытии окна, передавая ту же функцию
    if (this.shouldCloseOnOverlay) {
      this.overlay.removeEventListener('click', this.#handleOverlayClick);
    }

    // Удаляем слушатель с крестика закрытия Х, чтобы не дублировать их при следующем открытии
    const closeButton = this.modal.querySelector('[data-modal-close]');
    if (closeButton) {
      closeButton.removeEventListener('click', this.#handleCloseButtonClick);
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
        this.open();
      });
    }
  }

  #initClose() {
    const closeButton = this.modal.querySelector('[data-modal-close]');
    if (closeButton) {
      closeButton.addEventListener('click', this.#handleCloseButtonClick);
    }
  }

  #handleOverlayClick = () => {
    this.close();
  }

  #handleCloseButtonClick = () => {
    this.close();
  }
}