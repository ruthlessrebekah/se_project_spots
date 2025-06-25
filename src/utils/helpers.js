export function setButtonText(
  btn,
  isLoading,
  defaultText = 'Save',
  loadingText = 'Saving...',
) {
  if (isLoading) {
    btn.setAttribute('disabled', 'true')
    btn.textContent = loadingText
  } else {
    btn.removeAttribute('disabled')
    btn.textContent = defaultText
  }
}
