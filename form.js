export default class Form {
  constructor(formId) {
    this.formElement = document.getElementById(formId);
    if (!this.formElement) {
      console.error(`Форма с id "${formId}" не найдена!`);
    }
  }

  // I. Метод для получения всех данных (результатов) формы в виде объекта
  getValues() {
    if (!this.formElement) return {};
    const formData = new FormData(this.formElement);
    const data = Object.fromEntries(formData.entries());
    
    // Триммим строковые поля, если они существуют
    if (data.firstName) data.firstName = data.firstName.trim();
    if (data.lastName) data.lastName = data.lastName.trim();
    if (data.login) data.login = data.login.trim();
    
    return data;
  }

  // II. Метод для проверки валидности формы 
  isValid() {
    if (!this.formElement) return false;
    return this.formElement.checkValidity();
  }

  // III. Метод для сброса формы
  reset() {
    if (this.formElement) {
      this.formElement.reset();
    }
  }
}