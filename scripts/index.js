const initialCards = [
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
const editProfileCloseBtn = editProfileModal.querySelector('.modal__close-btn')
const editProfileForm = document.forms['edit-profile-form']
const editProfileNameInput = editProfileForm.elements['profile-name']
const editProfileDescriptionInput =
  editProfileForm.elements['profile-description']

const newPostBtn = document.querySelector('.profile__add-btn')
const newPostModal = document.querySelector('#new-post-modal')
const newPostCloseBtn = newPostModal.querySelector('.modal__close-btn')
const newPostForm = newPostModal.querySelector('.modal__form')
const newPostImageInput = newPostForm.elements['card-image']
const newPostCaptionInput = newPostForm.elements['caption']

const profileNameEl = document.querySelector('.profile__name')
const profileDescriptionEl = document.querySelector('.profile__description')

editProfileBtn.addEventListener('click', function () {
  editProfileNameInput.value = profileNameEl.textContent
  editProfileDescriptionInput.value = profileDescriptionEl.textContent

  editProfileModal.classList.add('modal_is-opened')
})

editProfileCloseBtn.addEventListener('click', function () {
  editProfileModal.classList.remove('modal_is-opened')
})

newPostBtn.addEventListener('click', function () {
  newPostModal.classList.add('modal_is-opened')
})

newPostCloseBtn.addEventListener('click', function () {
  newPostModal.classList.remove('modal_is-opened')
})

function handleEditProfileSubmit(evt) {
  evt.preventDefault()

  const formData = {
    nameValue: editProfileNameInput.value,
    descriptionValue: editProfileDescriptionInput.value,
  }

  profileNameEl.textContent = formData.nameValue
  profileDescriptionEl.textContent = formData.descriptionValue
  editProfileModal.classList.remove('modal_is-opened')
}

function handleNewPostSubmit(evt) {
  evt.preventDefault()
  console.log(newPostImageInput)
  console.log(newPostCaptionInput)
  newPostModal.classList.remove('modal_is-opened')
}

newPostForm.addEventListener('submit', handleNewPostSubmit)
editProfileForm.addEventListener('submit', handleEditProfileSubmit)
