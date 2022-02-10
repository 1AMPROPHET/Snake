export default class Snake {
    constructor() {
        this.element = document.getElementById('snake');
        this.head = document.querySelector('#snake > div');
        this.body = this.element.getElementsByTagName('div');
    }
    // 获取蛇的X坐标
    get X() {
        return this.head.offsetLeft;
    }
    // 获取蛇的Y坐标
    get Y() {
        return this.head.offsetTop;
    }
    // 设置蛇头坐标
    set X(val) {
        if (this.X === val) {
            return;
        }
        // X的合法范围
        if (val < 0 || val > 290) {
            // 蛇撞墙了
            throw new Error('Game failed.');
        }
        // 修改X时，是在修改水平坐标，蛇在左右移动，蛇在向左移动时，不能向右，反之
        if (this.body[1] && this.body[1].offsetLeft === val) {
            // 发生了掉头, 让蛇向原有方向继续移动
            if (val > this.X) {
                val = this.X - 10;
            }
            else {
                val = this.X + 10;
            }
        }
        // 移动身体
        this.moveBody();
        this.head.style.left = val + 'px';
        this.checkHeadBody();
    }
    set Y(val) {
        if (this.Y === val) {
            return;
        }
        // Y的合法范围
        if (val < 0 || val > 290) {
            // 蛇撞墙了
            throw new Error('Game failed.');
        }
        // 修改Y时，是在修改水平坐标，蛇在左右移动，蛇在向左移动时，不能向右，反之
        if (this.body[1] && this.body[1].offsetTop === val) {
            // 发生了掉头, 让蛇向原有方向继续移动
            if (val > this.Y) {
                val = this.Y - 10;
            }
            else {
                val = this.Y + 10;
            }
        }
        // 移动身体
        this.moveBody();
        this.head.style.top = val + 'px';
        this.checkHeadBody();
    }
    // 蛇增加身体
    addBody() {
        // 向element中添加div
        this.element.appendChild(document.createElement('div'));
        // this.element.insertAdjacentHTML('beforeend', '<div></div>')
    }
    moveBody() {
        /*
          将后面的身体设置为前面身体的位置
        */
        for (let i = this.body.length - 1; i > 0; i--) {
            // 获取前边身体的位置
            let x = this.body[i - 1].offsetLeft;
            let y = this.body[i - 1].offsetTop;
            // 设置到当前身体位置
            this.body[i].style.left = x + 'px';
            this.body[i].style.top = y + 'px';
        }
    }
    // 检查身体碰撞
    checkHeadBody() {
        for (let i = 1; i < this.body.length; i++) {
            if (this.X === this.body[i].offsetLeft && this.Y === this.body[i].offsetTop) {
                throw new Error('Game Over.');
            }
        }
    }
}
