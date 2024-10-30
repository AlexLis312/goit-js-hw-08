import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
let feedbackData = {};

const form = document.querySelector('form');
const input = document.querySelector('form input');
const textarea = document.querySelector('form textarea');

form.addEventListener('input', throttle(localStorageFeedback, 500));
form.addEventListener('submit', onSubmit);

const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));
localStoragePopulateForm(savedData);

function localStoragePopulateForm(data) {
  if (data !== null) {
    input.value = data.email || '';
    textarea.value = data.message || '';
    feedbackData = data;
  }
}

function localStorageFeedback() {
  feedbackData = {
    email: input.value,
    message: textarea.value,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(feedbackData));
}

function onSubmit(event) {
  event.preventDefault();
  console.log(feedbackData);
  localStorage.removeItem(STORAGE_KEY);
  form.reset();
}
