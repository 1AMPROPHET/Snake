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
        this.head.style.left = val + 'px';
    }
    set Y(val) {
        this.head.style.top = val + 'px';
    }
    // 蛇增加身体
    addBody() {
        // 向element中添加div
        this.element.appendChild(document.createElement('div'));
        // this.element.insertAdjacentHTML('beforeend', '<div></div>')
    }
}
