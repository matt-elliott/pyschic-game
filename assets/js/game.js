var game = {
  wins: 0,
  loses: 0,
  remainingGuesses: 0,
  level: 1,
  alphabet: ['x','p','d'],

  setGuessCount: function () {
    switch (this.level) {
      case 1:
        this.remainingGuesses = 5;
        break;
      case 2:
        this.remainingGuesses = 3;
        break;
      case 3:
        this.remainingGuesses = 2;
    }

    this.wins = 0;
    this.loses = 0;
  },

  levelUp: function () {
    this.die();
    this.level++;

    if (this.level > 3) {
      this.endGame('You Are The Winner!');
    } else {
      this.init();
    }
  },

  updateDOM: function (element, newData, addon) {
    if (addon) {
      element.textContent += ` ${newData}`;  
    } else {
      element.textContent = newData;
    }
    
  },

  refreshDOM: function () {
    this.updateDOM(document.querySelector('#level'), this.level);
    this.updateDOM(document.querySelector('#wins'), this.wins);
    this.updateDOM(document.querySelector('#loses'), this.loses);
    this.updateDOM(document.querySelector('#remaining-guesses'), this.remainingGuesses);
  },

  pickRandomLetter: function () {
    return this.alphabet[Math.ceil(Math.random() * this.alphabet.length - 1)];
  },

  compareString: function (firstString, secondString) {
    this.updateDOM(document.getElementById('computer-move'), firstString);
    this.updateDOM(document.getElementById('user-move'), secondString);

    if (firstString === secondString) {
      this.wins++;
    } else {
      this.loses++;
    }
  },

  endGame: function (text) {
    this.die();
    this.updateDOM(document.getElementById('title'), text);
  },

  keyUpHandler: function (e) {
    game.remainingGuesses--;
    game.die();
    game.updateDOM(document.getElementById('guesses'), e.key, true);

    if (game.remainingGuesses <= 0 &&
        game.loses > game.wins) {
      game.endGame('YOU LOOSE!');
      return false;
    }
    
    if (game.wins >= game.alphabet.length - 1) {
      game.levelUp();
      return false;
    }

    game.compareString(game.randomLetter, e.key.toLowerCase());  
    game.refreshDOM();

    game.playTime = setTimeout(function () {
      game.play();
    }, 800);
  },

  play: function () {
    this.randomLetter = this.pickRandomLetter();
    document.addEventListener('keyup', this.keyUpHandler);
  },

  die: function () {
    document.removeEventListener('keyup', this.keyUpHandler);
  },

  init: function () {
    this.setGuessCount();
    this.refreshDOM();
    this.play();
  }
}
document.addEventListener('DOMContentLoaded', function () {
  game.init();
});

