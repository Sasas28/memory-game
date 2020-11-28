let hasFlippedCard = false;
let lock = false
let firstCard, secondCard;

//UI Task
class UI{
static flipCard() {
  if(lock) return;
  this.classList.add('flip');
  if(!hasFlippedCard){
    hasFlippedCard = true;
    firstCard = this;
    return;
  }
  secondCard = this;
  UI.checkMatch();
}

static checkMatch() {
  let isMatch = firstCard.dataset.img === secondCard.dataset.img;
  isMatch ? UI.scoreCounter() : UI.mistakeCounter();
}

static scoreCounter() {
  lock = true;
  setTimeout(() => {
    let score = document.querySelector('#score').textContent;
    document.querySelector('#score').textContent = parseInt(score) + 1;
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    UI.shuffleCards();
    UI.resetCard();
  }, 1500);
}

static mistakeCounter() {
  lock = true;
  setTimeout(() => {
    let mistake = document.querySelector('#mistake').textContent;
    document.querySelector('#mistake').textContent = parseInt(mistake) + 1;
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    reset();
    if(document.querySelector('#mistake').textContent == 3){
      UI.gameOver();
    }
  }, 1500);
}

static shuffleCards() {
  cards.forEach(card => {
    let randomPosition = Math.floor(Math.random() * 6);
    card.style.order = randomPosition;
  });
}

static resetCard() {
  [hasFlippedCard, lock]=[false, false];
  [firstCard, secondCard]=[null, null];
}

static gameOver() {
  const overlay = document.querySelector('#overlay'); 
  overlay.style.display = 'block';
  document.querySelector('#restart').addEventListener('click', () => {
    overlay.style.display = 'none';
    document.querySelector('#score').textContent = 0;
    document.querySelector('#mistake').textContent = 0;
  });
}
//UI ends here  
}

//When player click a card
const cards = document.querySelectorAll('.imgContainer');
cards.forEach(card => card.addEventListener('click', UI.flipCard));