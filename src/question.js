export class Question {
  static create(question) {
    return fetch('https://podcast-native-js.firebaseio.com/questions.json', {
      method: 'POST',
      body: JSON.stringify(question),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log('response', response);
        question.id = response.name;
        return question;
      })
      .then(addToLocalStorage)
      .then(Question.renderList);
  }

  static renderList() {
    const question = getQuestionsFromLocalStorage();
    console.log('question', question);
    const html = question.length
      ? question.map(toCard).join('')
      : ` <div class="mui--text-headline">Вы еще ничего не спрашивали</div>`;

    const list = document.getElementById('list');
    list.innerHTML = html;
  }
}

function addToLocalStorage(question) {
  const all = getQuestionsFromLocalStorage();
  all.push(question);
  localStorage.setItem('questions', JSON.stringify(all));
}

function getQuestionsFromLocalStorage() {
  return JSON.parse(localStorage.getItem('questions') || '[]');
}

function toCard(question) {
  return `
  <div class="mui--text-black-54">
  ${new Date(question.date).toLocaleDateString()}
  ${new Date(question.date).toLocaleTimeString()}
  </div>
  <div>
    ${question.text}
  </div>
  <br />
  `;
}
