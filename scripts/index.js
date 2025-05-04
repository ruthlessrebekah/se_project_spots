import {
  settings,
  toggleButtonState,
  resetValidation,
  enableValidation,
} from './validation.js'

const initialCards = [
  {
    name: 'Golden Gate Bridge',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg',
  },
  {
    name: 'Val Thorens',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg',
  },
  {
    name: 'Restaurant terrace',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg',
  },
  {
    name: 'An outdoor cafe',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg',
  },
  {
    name: 'A very long bridge, over the forest and through the trees',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg',
  },
  {
    name: 'Tunnel with morning light',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg',
  },
  {
    name: 'Mountain house',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg',
  },
]

const editProfileBtn = document.querySelector('.profile__edit-btn')
const editProfileModal = document.querySelector('#edit-profile-modal')
const newPostModal = document.querySelector('#new-post-modal')
const editProfileCloseBtn = editProfileModal.querySelector('.modal__close-btn')
const editProfileForm = document.forms['edit-profile-form']
const editProfileNameInput = editProfileForm.elements['profile-name']
const editProfileDescriptionInput =
  editProfileForm.elements['profile-description']

const newPostBtn = document.querySelector('.profile__add-btn')
const newPostCloseBtn = newPostModal.querySelector('.modal__close-btn')
const newPostForm = document.forms['new-post-form']
const newPostImageInput = newPostForm.elements['card-image']
const newPostCaptionInput = newPostForm.elements['caption']

const profileNameEl = document.querySelector('.profile__name')
const profileDescriptionEl = document.querySelector('.profile__description')

const previewModal = document.querySelector('#preview-modal')
const previewModalCloseBtn = previewModal.querySelector('.modal__close-btn')
const previewImageEl = previewModal.querySelector('.modal__image')
const previewCaptionEl = previewModal.querySelector('.modal__caption')

const cardTemplate = document
  .querySelector('#card-template')
  .content.querySelector('.card')
const cardsList = document.querySelector('.cards__list')

function updateProfileContent() {
  const inputValues = {
    nameValue: editProfileNameInput.value,
    descriptionValue: editProfileDescriptionInput.value,
  }
  profileNameEl.textContent = inputValues.nameValue
  profileDescriptionEl.textContent = inputValues.descriptionValue
}

function resetProfileForm() {
  editProfileForm.reset()
  const inputList = Array.from(
    editProfileForm.querySelectorAll(settings.inputSelector),
  )
  const buttonElement = editProfileForm.querySelector(
    settings.submitButtonSelector,
  )
  toggleButtonState(inputList, buttonElement, settings)
}

function handleEditProfileSubmit(evt) {
  evt.preventDefault()
  updateProfileContent()
  resetProfileForm()
  closeModal(editProfileModal)
}

function getCardEl(data) {
  const cardEl = cardTemplate.cloneNode(true)
  const cardTitleEl = cardEl.querySelector('.card__title')
  const cardImageEl = cardEl.querySelector('.card__image')

  cardImageEl.src = data.link
  cardImageEl.alt = data.name
  cardTitleEl.textContent = data.name

  const cardLikeBtnEl = cardEl.querySelector('.card__like-btn')
  function handleLikeButtonClick() {
    cardLikeBtnEl.classList.toggle('card__like-btn_active')
  }

  cardLikeBtnEl.addEventListener('click', handleLikeButtonClick)

  const cardDeleteBtnEl = cardEl.querySelector('.card__delete-btn')
  function handleCardDeleteClick() {
    cardEl.remove()
  }

  cardDeleteBtnEl.addEventListener('click', handleCardDeleteClick)

  function createHandlePreviewModalOpen(data) {
    return function handlePreviewModalOpen() {
      previewImageEl.src = data.link
      previewImageEl.alt = data.name
      previewCaptionEl.textContent = data.name
      openModal(previewModal)
    }
  }

  cardImageEl.addEventListener('click', createHandlePreviewModalOpen(data))

  return cardEl
}

function openModal(modal) {
  modal.classList.add('modal_is-opened')
  document.addEventListener('keydown', handleEscClose)
}

function closeModal(modal) {
  modal.classList.remove('modal_is-opened')
  document.removeEventListener('keydown', handleEscClose)
}

function closeModalOnOverlayClick(evt) {
  if (evt.target.classList.contains('modal')) {
    closeModal(evt.target)
  }
}

function handleEscClose(evt) {
  if (evt.key === 'Escape') {
    const openedModal = document.querySelector('.modal_is-opened')
    if (openedModal) {
      closeModal(openedModal)
    }
  }
}

function handleProfileEditClick() {
  editProfileNameInput.value = profileNameEl.textContent
  editProfileDescriptionInput.value = profileDescriptionEl.textContent
  resetValidation(
    editProfileForm,
    [editProfileNameInput, editProfileDescriptionInput],
    settings,
  )
  openModal(editProfileModal)
}

editProfileBtn.addEventListener('click', handleProfileEditClick)

function handleProfileModalClose() {
  closeModal(editProfileModal)
}

editProfileCloseBtn.addEventListener('click', handleProfileModalClose)

function handlePreviewModalClose() {
  closeModal(previewModal)
}

previewModalCloseBtn.addEventListener('click', handlePreviewModalClose)

function handlePostModalOpen() {
  resetValidation(
    newPostForm,
    Array.from(newPostForm.querySelectorAll(settings.inputSelector)),
    settings,
  )
  openModal(newPostModal)
}

newPostBtn.addEventListener('click', handlePostModalOpen)

function handlePostModalClose() {
  closeModal(newPostModal)
}

newPostCloseBtn.addEventListener('click', handlePostModalClose)

editProfileModal.addEventListener('mousedown', closeModalOnOverlayClick)
newPostModal.addEventListener('mousedown', closeModalOnOverlayClick)
previewModal.addEventListener('mousedown', closeModalOnOverlayClick)

function getNewPostValues() {
  return {
    name: newPostCaptionInput.value,
    link: newPostImageInput.value,
  }
}

function resetNewPostForm() {
  newPostForm.reset()
  const inputList = Array.from(
    newPostForm.querySelectorAll(settings.inputSelector),
  )
  const buttonElement = newPostForm.querySelector(settings.submitButtonSelector)
  toggleButtonState(inputList, buttonElement, settings)
}

function handleNewPostSubmit(evt) {
  evt.preventDefault()
  const inputValues = getNewPostValues()
  const cardEl = getCardEl(inputValues)
  cardsList.prepend(cardEl)
  resetNewPostForm()
  closeModal(newPostModal)
}

newPostForm.addEventListener('submit', handleNewPostSubmit)
editProfileForm.addEventListener('submit', handleEditProfileSubmit)

function renderCard(item) {
  const cardEl = getCardEl(item)
  cardsList.append(cardEl)
}

initialCards.forEach(renderCard)

enableValidation(settings)
