window.onload = function () {
    // 导入公共部分
    $('header').load('./html/index_public.html #index-tou', () => {
    // 二级菜单
class menu {
    constructor() {
        // 实例属性
        // 获取页面元素  导航栏
        this.nav = $('#nav>div');
        // 获取二级菜单
        this.menu = $('.menuCenter');
        this.menuFather = $('.menu');
        // 获取ul下的li
        this.li = $('.menuCenter li');
        this.img = $('.menuCenter li img');
        // 登陆注册
        this.land = $('#personal');
        this.land_kuang = $('#land');
        // 购物车
        this.car = $('#car');
        this.carMenu = $('.smallCar');
        // 获取头部
        this.header = $('header');
        // 添加事件
        this.addEvent();
        this.state();
    }
    // 原型方法
    addEvent() {
        let that = this;
        $(this.nav.eq(0)).mouseenter(function () {
            that.menuFather.css({ 'display': 'block', });
            sport(that.menuFather[0], { 'height': '183' });
            for (let i = 0, len = that.li.length; i < len; i++) {
                sport(that.li[i], { 'opacity': '100' })
                sport(that.img[i], { 'opacity': '100' })
            }
        })
        // 鼠标划入二级菜单，所有的图片透明度50%
        this.menuFather.mouseenter(function () {
            for (let i = 0, len = that.li.length; i < len; i++) {
                sport(that.li[i], { 'opacity': '50' })
            }
        }

        )
        // 遍历所有li 添加事件
        $.each(this.li, function (i, v) {
            $(v).mouseenter(function () {
                $(this).css('opacity', '1');
            })
            $(v).mouseleave(function () {
                $(this).css('opacity', '0.5');
            })
        })
        // 鼠标离开二级菜单，二级菜单高度为0
        this.menuFather.mouseleave(function () {
            that.menuFather.css({ "display": "none", 'height': '0' });
            for (let i = 0, len = that.li.length; i < len; i++) {
                sport(that.li[i], { 'opacity': '0' })
                sport(that.img[i], { 'opacity': '0' })
            }
        })
        // 鼠标移入登陆注册 显示二级菜单
        this.land.mouseenter(function () {
            that.land_kuang.css('display', 'block');
            that.menuFather.css({ "display": "none", 'height': '0' });

        })
        this.land.mouseleave(function () {
            that.land_kuang.css('display', 'none');
        })

    }
    // 修改导航栏中的数据
    state() {
        let that = this;
        // 获取当前cookie中的用户名
        let user_str = $.cookie(decodeURIComponent('免')) ? $.cookie(decodeURIComponent('免')) : '';
        if (user_str) {
            
            $("#land").empty();
            $("#land").append(`<li><a href="./login.html">我的订单</a></li>
            <li><a href="">个人中心</a></li>
            <li><a href="">了解更多</a></li>
            <li><a href="">M码通道</a></li>`);
            // 删除小人
            $('#ren').remove();
            $('#personal').append(`<img src="./img/wpy-touxiang.png" id="touxiang"  style="width:29px;height:29px;border-radius: 50px;">`);
            // 获取商品的cookie
            let mc_str = $.cookie('js') ? $.cookie('js') : '';
            let mc_obj = that.strtoobj(mc_str);
            let price = mc_obj.price;
            let num = mc_obj.num;
            $('#jiage').append(`<span>￥${price}&nbsp;x&nbsp;</span><span id="#car-price-num">${num}</span>`);
            $('.car-num').text(num);
            if (mc_str) {
                this.car.mouseenter(function () {
                    $('#meihao').css('display', 'none');
                    $('#youhao').css('display', 'block');
                })
                this.car.mouseleave(function () {
                    $('#meihao').css('display', 'none');
                    $('#youhao').css('display', 'none');
                })
            } else {
                this.car.mouseenter(function () {
                    $('#meihao').css('display', 'block');
                    $('#youhao').css('display', 'none');
                })
                this.car.mouseleave(function () {
                    $('#meihao').css('display', 'none');
                    $('#youhao').css('display', 'none');
                })
            }

        }else{
            $('#www').attr('href','./html/car-login.html');
        }
    }
    strtoobj(str) {
        if (!str) {
            return {};
        } else {
            return JSON.parse(str);

        }
    }
}

new menu();

    });
    $('footer').load('./html/index_public.html footer')
}