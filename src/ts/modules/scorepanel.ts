export default class ScorePanel {
  score = 0
  level = 1
  // 设置最大等级
  maxLevel: number
  // 设置一个变量，表示满多少分升一级
  upScore: number
  scoreSpan: HTMLElement
  levelSpan: HTMLElement
  constructor(maxLevel: number = 10, upScore: number = 10) {
    this.scoreSpan = document.getElementById('score')!
    this.levelSpan = document.getElementById('level')!
    this.maxLevel = maxLevel
    this.upScore = upScore
  }

  // 加分的方法
  addScore() {
    this.score++
    this.scoreSpan.innerHTML = this.score + ''
    if (this.score % this.upScore === 0) {
      this.levelUp()
    }
  }

  levelUp() {
    if (this.level <= this.maxLevel) {
      this.level++
      this.levelSpan.innerHTML = this.level + ''
    }
  }
}