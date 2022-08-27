function getStyle(obj, attr) {//obj 对象 attr 属性
    return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr];
}
function sport(obj, josn, fn) {
    // 1.清除上一次的计时器
    clearInterval(obj.timer);
    // 2.开启新的计时器
    obj.timer = setInterval(() => {
        // 1.设置开关
        let flag = true;
        // 2.遍历josn 获取属性名
        for (let attr in josn) {//for in attr获取的是传过来的对象的属性名 {height：100}
            // 1.获取行内样式 当前值  判断是否为透明度样式 如果是 就转成整数 不是就直接获取样式转成数字型
            let cur = attr === 'opacity' ? parseInt(parseFloat(getStyle(obj, attr)) * 100) : parseInt(getStyle(obj, attr));
            // 2.计算变化的速度 缓冲运动 距离 /固定值 ；距离 = 目标值-当前值
            let speed = (josn[attr] - cur) / 2;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            //缓冲运动的停止条件
            // 3.判断属性是否达到目标 当前值 不等于 目标值
            if (cur != josn[attr]) {
                flag = false;
            }
            // 4.设置运动 带单位和不带单位的 运动= 当前值+速度
            if (attr === 'opacity') {//如果是不带单位的 计算结果 转成小数
                obj.style.opacity = (cur + speed) / 100;
                obj.style.filter = `alpha(opacity=${cur + speed})`;
            } else {
                obj.style[attr] = cur + speed + 'px';
            }
        }
        // 3.检测开关 停止计时器 检测函数
        if (flag) {
            clearInterval(obj.timer);//开关为ture 停止计时器
            if (fn instanceof Function) {
                fn();
            }
        }
    }, 30)

}