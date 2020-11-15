import './styles.css';
import { createModal, isValid } from './utils';
import { Question } from './question';

console.log('App working...');

const form = document.getElementById('form');
const modalBtn = document.getElementById('modal-btn');

const input = form.querySelector('#question-input');
const submitBtn = form.querySelector('#submit');

window.addEventListener('load', Question.renderList);

form.addEventListener('submit', submitFormHandler);
modalBtn.addEventListener('click', openModal);
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
    Question.create(question).then((data) => {
      input.value = '';
      input.className = '';
      submitBtn.disabled = false;
    });
    console.log('question', question);
  }
}

function openModal() {
  createModal('Авторизация', 'text');
}
