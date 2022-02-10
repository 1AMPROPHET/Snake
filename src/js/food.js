export default class Food {
    constructor() {
        // 获取页面中的food元素，并将值赋给element,!表示元素不为空
        this.element = document.getElementById('food');
    }
    get X() {
        // 获取x坐标
        return this.element.offsetLeft;
    }
    get Y() {
        // 获取y坐标
        return this.element.offsetTop;
    }
    // 修改食物位置的方法
    change() {
        // 生成随机位置
        // X最小值为0，最大值为290，且必须是10的倍数
        let top = Math.floor(Math.random() * 30) * 10;
        let left = Math.floor(Math.random() * 30) * 10;
        this.element.style.top = top + 'px';
        this.element.style.left = left + 'px';
    }
}
