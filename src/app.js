import './styles.css';
import { isValid } from './utils';

console.log('App working...');

const form = document.getElementById('form');

const input = form.querySelector('#question-input');
const submitBtn = form.querySelector('#submit');

form.addEventListener('submit', submitFormHandler);
input.addEventListener('input', () => {
  submitBtn.disabled = !isValid(input.value);
});
function submitFormHandler(event) {
  event.preventDefault();
  console.log(input.value);
  if (isValid(input.value)) {
    const question = {
      text: input.value.trim(),
      date: new Date().toJSON(),
    };

    submitBtn.disabled = true;
    //Async request to server to save data
    console.log('question', question);
    input.value = '';
    input.className = '';
    submitBtn.disabled = false;
  }
}
