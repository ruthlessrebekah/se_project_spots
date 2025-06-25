import {
  enableValidation,
  settings,
  resetValidation,
  toggleButtonState,
} from '../scripts/validation.js'
import { setButtonText } from '../utils/helpers.js'
import './index.css'
import Api from '../utils/Api.js'
import goldenGateBridgeImage from '../images/7-photo-by-griffin-wooldridge-from-pexels.jpg'
import valThorensImage from '../images/1-photo-by-moritz-feldmann-from-pexels.jpg'
import restaurantTerraceImage from '../images/2-photo-by-ceiline-from-pexels.jpg'
import anOutdoorCafeImage from '../images/3-photo-by-tubanur-dogan-from-pexels.jpg'
import forestBridgeImage from '../images/4-photo-by-maurice-laschet-from-pexels.jpg'
import tunnelImage from '../images/5-photo-by-van-anh-nguyen-from-pexels.jpg'
import mountainHouseImage from '../images/6-photo-by-moritz-feldmann-from-pexels.jpg'

const initialCards = [
  {
    name: 'Golden Gate Bridge',
    link: goldenGateBridgeImage,
  },
  {
    name: 'Val Thorens',
    link: valThorensImage,
  },
  {
    name: 'Restaurant terrace',
    link: restaurantTerraceImage,
  },
  {
    name: 'An outdoor cafe',
    link: anOutdoorCafeImage,
  },
  {
    name: 'A very long bridge, over the forest and through the trees',
    link: forestBridgeImage,
  },
  {
    name: 'Tunnel with morning light',
    link: tunnelImage,
  },
  {
    name: 'Mountain house',
    link: mountainHouseImage,
  },
]

const api = new Api({
  baseUrl: 'https://around-api.en.tripleten-services.com/v1',
  headers: {
    authorization: '281d0863-c6ec-4780-a7d9-4358227ce389',
    'Content-Type': 'application/json',
  },
})

// Modal elements
const editProfileBtn = document.querySelector('.profile__edit-btn')
const editProfileModal = document.querySelector('#edit-profile-modal')
const newPostModal = document.querySelector('#new-post-modal')
const avatarModalBtn = document.querySelector('.profile__avatar-btn')
const editProfileCloseBtn = editProfileModal.querySelector('.modal__close-btn')
const editProfileForm = document.forms['edit-profile-form']
const editProfileNameInput = editProfileForm.elements['profile-name']
const editProfileDescriptionInput =
  editProfileForm.elements['profile-description']

// New post form elements
const newPostBtn = document.querySelector('.profile__add-btn')
const newPostCloseBtn = newPostModal.querySelector('.modal__close-btn')
const newPostForm = document.forms['new-post-form']
const newPostImageInput = newPostForm.elements['card-image']
const newPostCaptionInput = newPostForm.elements['caption']

// Avatar form elements
const avatarModal = document.querySelector('#avatar-modal')
const avatarCloseBtn = avatarModal.querySelector('.modal__close-btn')
const avatarForm = avatarModal.querySelector('.modal__form')
const avatarInput = avatarModal.querySelector('#profile-avatar-input')

const profileNameEl = document.querySelector('.profile__name')
const profileDescriptionEl = document.querySelector('.profile__description')

// Delete modal elements
const deleteModal = document.querySelector('#delete-modal')
const deleteForm = document.querySelector('#delete-form')
const deleteCancelBtn = deleteForm.querySelector('.modal__button_cancel')

// Preview image popup elements
const previewModal = document.querySelector('#preview-modal')
const previewModalCloseBtn = previewModal.querySelector('.modal__close-btn')
const previewImageEl = previewModal.querySelector('.modal__image')
const previewCaptionEl = previewModal.querySelector('.modal__caption')

// Card related elements
let selectedCard, selectedCardId
let currentUser // Store user info globally for access in handlers

const cardTemplate = document
  .querySelector('#card-template')
  .content.querySelector('.card')
const cardsList = document.querySelector('.cards__list')

api
  .getAppInfo()
  .then(([cards, userInfo]) => {
    currentUser = userInfo // Set current user info after API call
    cards.forEach((item) => {
      const cardEl = getCardEl(item)
      cardsList.append(cardEl)
    })

    const avatarImg = document.querySelector('.profile__avatar')
    avatarImg.src = userInfo.avatar
    profileNameEl.textContent = userInfo.name
    profileDescriptionEl.textContent = userInfo.about

    // If you want to render local cards too:
    // initialCards.forEach((item) => {
    //   const cardEl = getCardEl(item)
    //   cardsList.append(cardEl)
    // })
  })
  .catch(console.error)

function updateProfileContent(data) {
  profileNameEl.textContent = data.name
  profileDescriptionEl.textContent = data.about
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
  const submitButton = evt.submitter
  setButtonText(submitButton, true)
  api
    .editUserInfo({
      name: editProfileNameInput.value,
      about: editProfileDescriptionInput.value,
    })
    .then((data) => {
      updateProfileContent(data)
      resetProfileForm()
      closeModal(editProfileModal)
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(submitButton, false)
    })
}

function getCardEl(data) {
  const cardEl = cardTemplate.cloneNode(true)
  const cardTitleEl = cardEl.querySelector('.card__title')
  const cardImageEl = cardEl.querySelector('.card__image')

  cardImageEl.src = data.link
  cardImageEl.alt = data.name
  cardTitleEl.textContent = data.name

  const cardLikeBtnEl = cardEl.querySelector('.card__like-btn')

  // Set initial like button state based on whether the user has liked the card
  if (data.isLiked) {
    cardLikeBtnEl.classList.add('card__like-btn_active')
  } else {
    cardLikeBtnEl.classList.remove('card__like-btn_active')
  }

  function handleLikeButtonClick(evt) {
    if (!currentUser) return // Prevent like/unlike if user info is not loaded
    const isLiked = data.isLiked
    api
      .changeLikeStatus(data._id, isLiked)
      .then((updatedCard) => {
        data.isLiked = updatedCard.isLiked
        // Update like count if element exists
        // const likeCountEl = cardEl.querySelector('.card__like-count');
        // if (likeCountEl) {
        //   likeCountEl.textContent = updatedCard.likes.length;
        if (isLiked) {
          cardLikeBtnEl.classList.remove('card__like-btn_active')
        } else {
          cardLikeBtnEl.classList.add('card__like-btn_active')
        }
      })
      .catch(console.error)
  }

  cardLikeBtnEl.addEventListener('click', handleLikeButtonClick)

  const cardDeleteBtnEl = cardEl.querySelector('.card__delete-btn')
  function handleCardDelete(cardEl, cardId) {
    selectedCard = cardEl
    selectedCardId = cardId
    openModal(deleteModal)
  }

  cardDeleteBtnEl.addEventListener('click', () =>
    handleCardDelete(cardEl, data._id),
  )

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

function handleDeleteSubmit(evt) {
  evt.preventDefault()
  const submitButton = evt.submitter
  setButtonText(submitButton, true, 'Delete', 'Deleting...')
  api
    .deleteCard(selectedCardId)
    .then(() => {
      selectedCard.remove()
      selectedCard = null
      selectedCardId = null
      closeModal(deleteModal)
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(submitButton, false, 'Delete', 'Deleting...')
    })
}

deleteForm.addEventListener('submit', handleDeleteSubmit)

deleteCancelBtn.addEventListener('click', function () {
  selectedCard = null
  selectedCardId = null
  closeModal(deleteModal)
})

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

function handlePostModalOpen() {
  openModal(newPostModal)
}

newPostBtn.addEventListener('click', handlePostModalOpen)

editProfileModal.addEventListener('mousedown', closeModalOnOverlayClick)
newPostModal.addEventListener('mousedown', closeModalOnOverlayClick)
previewModal.addEventListener('mousedown', closeModalOnOverlayClick)

const closeButtons = document.querySelectorAll('.modal__close-btn')
closeButtons.forEach((button) => {
  const modal = button.closest('.modal')
  button.addEventListener('click', () => closeModal(modal))
})

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

function addNewCard(cardData, prepend = true) {
  const cardEl = getCardEl(cardData)
  if (prepend) {
    cardsList.prepend(cardEl)
  } else {
    cardsList.append(cardEl)
  }
}

function handleNewPostSubmit(evt) {
  evt.preventDefault()
  const submitButton = evt.submitter
  setButtonText(submitButton, true, 'Create', 'Saving...')

  const inputValues = getNewPostValues()
  api
    .addNewCard(inputValues)
    .then((cardData) => {
      addNewCard(cardData)
      resetNewPostForm()
      closeModal(newPostModal)
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(submitButton, false, 'Create', 'Saving...')
    })
}

function handleAvatarSubmit(evt) {
  evt.preventDefault()
  const submitButton = evt.submitter
  setButtonText(submitButton, true)

  api
    .editAvatarInfo(avatarInput.value)
    .then((data) => {
      const avatarImg = document.querySelector('.profile__avatar')
      if (data && data.avatar) {
        avatarImg.src = data.avatar
        closeModal(avatarModal)
      } else {
        alert('Failed to update avatar. Please try again.')
      }
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(submitButton, false)
    })
}

newPostForm.addEventListener('submit', handleNewPostSubmit)
editProfileForm.addEventListener('submit', handleEditProfileSubmit)

avatarModalBtn.addEventListener('click', () => {
  openModal(avatarModal)
})

avatarForm.addEventListener('submit', handleAvatarSubmit)

enableValidation(settings)
