const cards = document.querySelectorAll('.imgContainer');
let hasFlippedCard = false;
let lock = false
let firstCard, secondCard;

function flipCard() {
  if(lock) return;
  this.classList.add('flip');
  if(!hasFlippedCard){
    hasFlippedCard = true;
    firstCard = this;
    return;
  }
  secondCard = this;
  checkMatch();
}

function checkMatch() {
  let isMatch = firstCard.dataset.img === secondCard.dataset.img;
  isMatch ? scoreCount() : mistakeCount();
}

function scoreCount() {
  lock = true;
  setTimeout(() => {
    let score = document.querySelector('#score').textContent;
    document.querySelector('#score').textContent = parseInt(score) + 1;
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    shuffleCards();
    reset();
  }, 1500);
}

function mistakeCount() {
  lock = true;
  setTimeout(() => {
    let mistake = document.querySelector('#mistake').textContent;
    document.querySelector('#mistake').textContent = parseInt(mistake) + 1;
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    reset();
    if(document.querySelector('#mistake').textContent == 3){
      gameOver();
    }
  }, 1500);
}

function shuffleCards() {
  cards.forEach(card => {
    let randomPosition = Math.floor(Math.random() * 6);
    card.style.order = randomPosition;
  });
}

function reset() {
  [hasFlippedCard, lock]=[false, false];
  [firstCard, secondCard]=[null, null];
}

function gameOver() {
  const overlay = document.querySelector('#overlay'); 
  overlay.style.display = 'block';
  document.querySelector('#restart').addEventListener('click', () => {
    overlay.style.display = 'none';
    document.querySelector('#score').textContent = 0;
    document.querySelector('#mistake').textContent = 0;
  });
}

cards.forEach(card => card.addEventListener('click', flipCard));