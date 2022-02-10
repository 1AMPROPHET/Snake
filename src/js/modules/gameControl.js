import Snake from "./snake";
import Food from "./food";
import ScorePanel from "./scorepanel";
export default class GameControl {
    constructor() {
        // 创建一个属性来存储蛇移动的方向（按键的方向）
        this.direction = '';
        // 创建移动时间间隔
        this.time = 200;
        // 创建一个属性来记录游戏是否结束
        this.isLive = true;
        this.snake = new Snake();
        this.food = new Food();
        this.scorePanel = new ScorePanel(10, 1);
        this.init();
    }
    // 游戏的初始化方法
    init() {
        // 绑定键盘按下事件,将this绑定为GameControl
        document.addEventListener('keydown', this.keydownHandler.bind(this));
        // 使蛇移动
        this.move();
    }
    // 键盘响应函数
    keydownHandler(event) {
        this.direction = event.key;
    }
    // 创建控制蛇移动的方法 
    move() {
        /*
          向上：top值减少
          向下：top值增加
          向左：left值减少
          向右：left值增加
        */
        let x = this.snake.X;
        let y = this.snake.Y;
        switch (this.direction) {
            case 'ArrowUp':
            case 'Up':
                y -= 10;
                break;
            case 'ArrowDown':
            case 'Down':
                y += 10;
                break;
            case 'ArrowLeft':
            case 'Left':
                x -= 10;
                break;
            case 'ArrowRight':
            case 'Right':
                x += 10;
                break;
        }
        // 检查蛇是否吃到了食物
        this.checkEat(x, y);
        try {
            this.snake.X = x;
            this.snake.Y = y;
        }
        catch (e) {
            alert(e.message);
            this.isLive = false;
        }
        this.isLive && setTimeout(this.move.bind(this), this.time - (this.scorePanel.level - 1) * (this.time / this.scorePanel.maxLevel));
    }
    // 定义方法来检查是否吃到了食物
    checkEat(x, y) {
        if (x === this.food.X && y === this.food.Y) {
            // 吃到食物后，食物位置改变，分数增加
            this.food.change();
            // 升级加速
            this.scorePanel.addScore();
            // 蛇增加一节
            this.snake.addBody();
        }
    }
}
