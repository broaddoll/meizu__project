class setcar {
    constructor() {
        // 实例属性
        // 获取数量框中的值
        this.num = $('#inp_num').val();
        this.setnum();
    }
    // 原型方法
    setnum() {
        let mc_str = $.cookie('js') ? $.cookie('js') : '';
        let mc_obj = this.strtoobj(mc_str);
        let num = mc_obj.num;
        // console.log(mc_obj);
        if (mc_str) {//有商品
            $('#con-purchased').css('display', 'bolck');
            $('#inp_num').val(num);
        } else {//没商品 隐藏购物车商品页面
            $('#con-purchased').css('display', 'none');
        }
    }
    // 字符串转对象
    strtoobj(str) {
        if (!str) {
            return {};
        } else {
            return JSON.parse(str);

        }
    }
}
new setcar();