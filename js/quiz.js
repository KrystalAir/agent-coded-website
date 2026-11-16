const welcome = document.querySelector('#welcome');
const quiz = document.querySelector('#quiz');
const result = document.querySelector('#result');
const start = document.querySelector('#start');
const heading = document.querySelector('#question');
const form = document.querySelector('#quiz-form');
const options = document.querySelector('#options');
const previous = document.querySelector('#previous');
const next = document.querySelector('#next');
const progress = document.querySelector('#progress');
const progressText = document.querySelector('#progress-text');
const category = document.querySelector('#category');
const portraitFrame = document.querySelector('#portrait-frame');
const resultPhoto = document.querySelector('#result-photo');
const photoStatus = document.querySelector('#photo-status');
const photoSource = document.querySelector('#photo-source');
const photoCredit = document.querySelector('#photo-credit');
const answers = new Map();
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let questionIndex = 0;
let isTransitioning = false;

document.querySelector('#quiz-summary').textContent = `${questions.length} 道情境題 · ${houses.length} 個時裝屋`;
progress.max = questions.length;

function showSection(active, focusTarget) {
  for (const section of [welcome, quiz, result]) section.hidden = section !== active;
  window.scrollTo(0, 0);
  focusTarget.focus({ preventScroll: true });
}

async function transitionSection(outgoing, incoming, render) {
  if (isTransitioning) return;
  if (reducedMotion.matches || typeof outgoing.animate !== 'function') {
    render();
    return;
  }

  isTransitioning = true;
  outgoing.inert = true;
  try {
    const fadeOut = outgoing.animate([
      { opacity: 1, transform: 'translateY(0)' },
      { opacity: 0, transform: 'translateY(-8px)' },
    ], { duration: 190, easing: 'ease-in', fill: 'forwards' });
    await fadeOut.finished;
    fadeOut.cancel();
    outgoing.inert = false;
    render();

    const fadeIn = incoming.animate([
      { opacity: 0, transform: 'translateY(8px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ], { duration: 310, easing: 'ease-out' });
    await fadeIn.finished;
  } finally {
    outgoing.inert = false;
    isTransitioning = false;
  }
}

function moveQuestion(offset) {
  return transitionSection(quiz, quiz, () => {
    questionIndex += offset;
    showQuestion();
  });
}

function showQuestion() {
  const question = questions[questionIndex];
  const chosen = answers.get(question.id);
  const isLast = questionIndex === questions.length - 1;

  heading.textContent = question.prompt;
  category.textContent = questionTypes[question.type].label;
  progressText.textContent = `第 ${questionIndex + 1} 題，共 ${questions.length} 題`;
  progress.value = questionIndex + 1;
  previous.disabled = questionIndex === 0;
  next.firstChild.textContent = isLast ? '查看結果 ' : '下一題 ';
  next.disabled = chosen === undefined;

  const inputs = question.options.map(([answer], index) => {
    const label = document.createElement('label');
    label.className = 'option';

    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'answer';
    radio.value = index;
    radio.checked = chosen === index;
    radio.required = true;

    const text = document.createElement('span');
    text.textContent = answer;
    label.append(radio, text);
    return label;
  });
  options.replaceChildren(...inputs);
  showSection(quiz, heading);
}

function showResult({ house, evidence, close }) {
  const title = document.querySelector('#result-house');
  title.textContent = house.name;
  document.querySelector('#result-label').textContent = `${house.word} · ${house.label}`;
  document.querySelector('#result-description').textContent = house.description;
  document.querySelector('#result-tip').textContent = house.styleTip;
  document.querySelector('#close-note').hidden = !close;
  document.querySelector('#evidence-section').hidden = evidence.length === 0;
  document.querySelector('#evidence-list').replaceChildren(...evidence.map(({ label, phrase }) => {
    const item = document.createElement('li');
    const tag = document.createElement('span');
    tag.textContent = label;
    item.append(tag, `你${phrase}。`);
    return item;
  }));
  showHousePhoto(house);
  result.style.setProperty('--house-color', house.accent);
  showSection(result, title);
}

function setPhotoState(state) {
  portraitFrame.setAttribute('aria-busy', String(state === 'loading'));
  resultPhoto.hidden = state !== 'ready';
  photoStatus.hidden = state === 'ready';
  photoStatus.textContent = {
    loading: '正在載入秀場照片…',
    unavailable: '照片暫時無法顯示，可從下方連結查看原圖集。',
    missing: '這個品牌的照片尚未收錄。',
  }[state] ?? '';
}

function showHousePhoto(house) {
  const photo = housePhotos[house.id];
  photoSource.hidden = !photo;
  photoCredit.hidden = !photo;

  if (!photo) {
    resultPhoto.removeAttribute('src');
    setPhotoState('missing');
    return;
  }

  photoSource.href = photo.source;
  photoSource.textContent = `${photo.collection} · Look ${photo.look} · Vogue Runway ↗`;
  photoCredit.textContent = `攝影／${photo.credit}`;
  resultPhoto.alt = `${house.name} 秀場照片，${photo.alt}`;
  setPhotoState('loading');
  resultPhoto.src = photo.src;

  if (resultPhoto.complete && resultPhoto.naturalWidth > 0) setPhotoState('ready');
}

resultPhoto.addEventListener('load', () => setPhotoState('ready'));
resultPhoto.addEventListener('error', () => {
  if (resultPhoto.hasAttribute('src')) setPhotoState('unavailable');
});

start.addEventListener('click', () => transitionSection(welcome, quiz, showQuestion));

form.addEventListener('change', event => {
  if (event.target.name !== 'answer') return;

  answers.set(questions[questionIndex].id, Number(event.target.value));
  next.disabled = false;
});

form.addEventListener('submit', event => {
  event.preventDefault();
  if (!answers.has(questions[questionIndex].id)) return;

  if (questionIndex === questions.length - 1) {
    return transitionSection(quiz, result, () => showResult(matchHouse(answers)));
  }

  return moveQuestion(1);
});

previous.addEventListener('click', () => {
  if (questionIndex === 0) return;

  return moveQuestion(-1);
});

document.querySelector('#restart').addEventListener('click', () => {
  return transitionSection(result, welcome, () => {
    answers.clear();
    questionIndex = 0;
    showSection(welcome, start);
    resultPhoto.removeAttribute('src');
  });
});
