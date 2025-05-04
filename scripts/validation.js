const settings = {
  formSelector: '.modal__form',
  inputSelector: '.modal__input',
  submitButtonSelector: '.modal__submit-btn',
  inactiveButtonClass: 'modal__button_disabled',
  inputErrorClass: 'modal__input_type_error',
  errorClass: 'modal__error_visible',
}

const showInputError = (formEl, inputEl, errorMsg, settings) => {
  const errorMsgID = inputEl.id + '-error'
  const errorMsgEl = formEl.querySelector('#' + errorMsgID)
  errorMsgEl.textContent = errorMsg
  inputEl.classList.add(settings.inputErrorClass)
}

const hideInputError = (formEl, inputEl, settings) => {
  const errorMsgID = inputEl.id + '-error'
  const errorMsgEl = formEl.querySelector('#' + errorMsgID)
  errorMsgEl.textContent = ''
  inputEl.classList.remove(settings.inputErrorClass)
}

const checkInputValidity = (formEl, inputEl, settings) => {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, inputEl.validationMessage, settings)
  } else {
    hideInputError(formEl, inputEl, settings)
  }
}

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid
  })
}

const toggleButtonState = (inputList, buttonEl, settings) => {
  if (hasInvalidInput(inputList)) {
    buttonEl.disabled = true
    buttonEl.classList.add(settings.inactiveButtonClass)
  } else {
    buttonEl.disabled = false
    buttonEl.classList.remove(settings.inactiveButtonClass)
  }
}

const resetValidation = (formEl, inputList, settings) => {
  inputList.forEach((input) => {
    hideInputError(formEl, input, settings)
  })
}

const setEventListeners = (formEl, settings) => {
  const inputList = Array.from(formEl.querySelectorAll(settings.inputSelector))
  const buttonElement = formEl.querySelector(settings.submitButtonSelector)

  toggleButtonState(inputList, buttonElement, settings)

  inputList.forEach((inputEl) => {
    inputEl.addEventListener('input', () => {
      checkInputValidity(formEl, inputEl, settings)
      toggleButtonState(inputList, buttonElement, settings)
    })
  })
}

const enableValidation = (settings) => {
  const formList = document.querySelectorAll(settings.formSelector)
  formList.forEach((formEl) => {
    setEventListeners(formEl, settings)
  })
}

enableValidation(settings)
export { toggleButtonState, resetValidation, settings }
