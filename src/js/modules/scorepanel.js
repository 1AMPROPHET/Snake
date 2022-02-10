export default class ScorePanel {
    constructor(maxLevel = 10, upScore = 10) {
        this.score = 0;
        this.level = 1;
        this.scoreSpan = document.getElementById('score');
        this.levelSpan = document.getElementById('level');
        this.maxLevel = maxLevel;
        this.upScore = upScore;
    }
    // 加分的方法
    addScore() {
        this.score++;
        this.scoreSpan.innerHTML = this.score + '';
        if (this.score % this.upScore === 0) {
            this.levelUp();
        }
    }
    levelUp() {
        if (this.level <= this.maxLevel) {
            this.level++;
            this.levelSpan.innerHTML = this.level + '';
        }
    }
}
