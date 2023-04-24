import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');

form.addEventListener('input', throttle(onInputChange, 500));
window.addEventListener('load', onLoad);
form.addEventListener('submit', onFormSubmit);

function onInputChange() {
  const savedData = {
    email: form.email.value,
    message: form.message.value,
  };
  const savedDataJSON = JSON.stringify(savedData);
  localStorage.setItem(STORAGE_KEY, savedDataJSON);
}

function onLoad() {
  const savedStateJSON = localStorage.getItem(STORAGE_KEY);
  if (savedStateJSON) {
    const savedState = JSON.parse(savedStateJSON);
    form.email.value = savedState.email;
    form.message.value = savedState.message;
  }
}

function onFormSubmit(evt) {
  evt.preventDefault();

  const savedData = {
    email: form.email.value,
    message: form.message.value,
  };

  console.log(savedData);

  evt.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}
