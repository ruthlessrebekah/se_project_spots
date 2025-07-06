export const settings = {
  formSelector: '.modal__form',
  inputSelector: '.modal__input',
  submitButtonSelector: '.modal__submit-btn',
  inactiveButtonClass: 'modal__submit-btn_disabled',
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

export const toggleButtonState = (inputList, buttonEl, settings) => {
  if (hasInvalidInput(inputList)) {
    buttonEl.disabled = true
    buttonEl.classList.add(settings.inactiveButtonClass)
  } else {
    console.log(settings.submitButtonSelector)
    buttonEl.disabled = false
    buttonEl.classList.remove(settings.inactiveButtonClass)
  }
}

export const resetValidation = (formEl, inputList, settings) => {
  inputList.forEach((input) => {
    hideInputError(formEl, input, settings)
  })
}

const setEventListeners = (formEl, settings) => {
  console.log('Processing form:', formEl) // Correct variable name
  console.log(
    'Looking for button with selector:',
    settings.submitButtonSelector,
  ) // Add this line
  const inputList = Array.from(formEl.querySelectorAll(settings.inputSelector))
  const buttonElement = formEl.querySelector(settings.submitButtonSelector)

  console.log('Found button:', buttonElement) // Correct variable name
  toggleButtonState(inputList, buttonElement, settings)

  inputList.forEach((inputEl) => {
    inputEl.addEventListener('input', () => {
      checkInputValidity(formEl, inputEl, settings)
      toggleButtonState(inputList, buttonElement, settings)
    })
  })
}

export const enableValidation = (settings) => {
  const formList = document.querySelectorAll(settings.formSelector)
  formList.forEach((formEl) => {
    setEventListeners(formEl, settings)
  })
}
