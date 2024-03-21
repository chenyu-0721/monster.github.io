function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      winner: null,
      logMessages: [],
      img1: "img/capoo1.png",
      img2: "img/rabbit.png",
      winimg: "",
      win: "",
      capooattack: "",
      rabbitattack: "",
      game: false,
    };
  },
  computed: {
    monsterBarStyles() {
      if (this.monsterHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.monsterHealth + "%" };
    },
    playerBarStyles() {
      if (this.playerHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.playerHealth + "%" };
    },
    mayUseSpecialAttack() {
      return this.currentRound % 3 !== 0;
    },
    showgame() {
      return this.game;
    },
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        // A draw
        this.win = "和局";
        this.winner = "draw";
        this.game = 1;
      } else if (value <= 0) {
        // Player lost
        this.winner = "monster";
        this.img1 = "img/capoo5.png";
        this.img2 = "img/rabbit4.png";
        this.win = "Rabbit Win";
        this.game = 1;
      } else if (this.currentRound >= 15) {
        this.winner = "monster";
        this.win = "Rount Out";
        this.game = 1;
      }
      1;
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        // A draw
        this.win = "和局";
        this.winner = "draw";
        this.game = 1;
      } else if (value <= 0) {
        // Monster lost
        this.winner = "player";
        this.img1 = "img/capoo6.png";
        this.img2 = "img/rabbit5.png";
        this.win = "Capoo Win";
        this.game = 1;
      } else if (this.currentRound >= 15) {
        this.winner = "monster";
        this.win = "Rount Out";
        this.game = 1;
      }
    },
  },
  methods: {
    startGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.winner = null;
      this.currentRound = 0;
      this.logMessages = [];
      this.img1 = "img/capoo1.png";
      this.img2 = "img/rabbit.png";
      this.game = 0;
    },
    attackMonster() {
      ++this.currentRound;
      const attackValue = getRandomValue(5, 12);
      this.monsterHealth -= attackValue;
      this.addLogMessage("Capoo", "attack", attackValue);
      this.attackPlayer();
      this.img1 = "img/capoo2.png";
      this.img2 = "img/rabbit2.png";
    },
    attackPlayer() {
      const attackValue = getRandomValue(8, 15);
      this.playerHealth -= attackValue;
      this.addLogMessage("Rabbit", "attack", attackValue);
    },
    specialAttackMonster() {
      ++this.currentRound;
      const attackValue = getRandomValue(10, 25);
      this.monsterHealth -= attackValue;
      this.addLogMessage("Capoo", "special_attack", attackValue);
      const attackValue1 = getRandomValue(8, 15);
      this.playerHealth -= attackValue;
      this.addLogMessage("Rabbit", "special_attack", attackValue1);
      this.img1 = "img/capoo3.png";
      this.img2 = "img/rabbit3.png";
    },
    healPlayer() {
      ++this.currentRound;
      const healValue = getRandomValue(8, 20);
      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healValue;
      }
      this.addLogMessage("Capoo", "heal", healValue);
      this.attackPlayer();
      this.img1 = "img/capoo4.png";
      this.img2 = "img/rabbit2.png";
    },
    surrender() {
      this.winner = "monster";
      this.img1 = "img/capoo5.png";
      this.img2 = "img/rabbit4.png";
      this.win = "Rabbit Win";
      this.game = 1;
    },
    addLogMessage(who, what, value) {
      this.logMessages.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value,
      });
    },
  },
});

app.mount("#game");
