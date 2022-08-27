class car {
    constructor() {
        //商品内容 
        this.con_purchased = document.querySelector("#con-purchased");
        // 加减
        this.button = document.querySelectorAll("#good-unit-price button");
        // num框
        this.inp = document.querySelector("#good-unit-price input");
        // 获取数量
        this.num = this.inp.value;
        // 商品价格
        this.span = document.querySelectorAll("#good-unit-price span");
        // 结算
        this.settime_column = document.querySelector("#Settling-column");
        // 优惠价格
        this.Settling = document.querySelectorAll("#Settling-column-right-sp");
        // 购买的数量
        this.sp = document.querySelectorAll(".Settling-column-span");
        // 优惠时间
        this.settime = document.querySelectorAll("#good-price-p-2");
        // 编辑按钮
        this.redact = document.querySelector("#redact");
        // --
        this.red_i = document.querySelector("#redact-i");
        this.redact_i = document.querySelector("#redact-i");
        // 手机详情页
        this.con_purchased = document.querySelector("#con-purchased");
        // 选取
        this.chenk = document.querySelectorAll(".checkbox");
        // 改
        this.num = $('#inp_num').val();
        this.setnum();

        this.chenkAll();
        this.good_num();
        this.timer();
        this.red();
    }

    setnum() {
        let mc_str = $.cookie('js') ? $.cookie('js') : '';
        let cook_str = $.cookie('免') ? $.cookie('免') : '';
        
        let mc_obj = this.strtoobj(mc_str);
        let num = mc_obj.num;
        $('#user').text(cook_str);
        $('#user').hover(function () {
                // over
                $(this).css({color:'#008cff'})
            }, function () {
                // out
                $(this).css({color:''})
            }
        )
        if (mc_str) {//有商品
            $('#con-purchased').css('display', 'bolck');
            $('#inp_num').val(num);
            $(this.span).text('￥' + num * 2299.00);
            $('.jtl').text('￥' + num * 2299.00);

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

    chenkAll() {
        // 全选
        let that = this;
        this.chenk[0].onclick = function () {
            for (let i = 0, len = that.chenk.length; i < len; i++) {
                that.chenk[i].checked = this.checked;
            }
        }
        this.chenk[3].onclick = function () {
            for (let i = 0, len = that.chenk.length; i < len; i++) {
                that.chenk[i].checked = this.checked;
            }
        }

        for (let i = 1, len = this.chenk.length - 1; i < len; i++) {
            this.chenk[i].onclick = function () {
                let flag = true
                for (let j = 1, len = that.chenk.length - 1; j < len; j++) {
                    if (that.chenk[j].checked == false) {
                        flag = false;
                        break;
                    }
                }
                that.chenk[0].checked = flag;
                that.chenk[3].checked = flag;
            }
        }
       


        $('.mwd').click(() => {
            let mwd = this.chenk[3].checked;
            if (mwd) {
                that.chenk[0].checked = false;
                that.chenk[1].checked = false;
                that.con_purchased.innerText = "";
                that.settime_column.innerText = "";
                $.removeCookie('js', { path: '/' });
            }
        })


    }


    // 编辑
    red() {
        let that = this;
        that.red_i.innerText = "--";
        this.redact.onclick = function () {
            that.red_i.innerText = "删除";
            that.red_i.style.color = "blue";
            that.red_i.onclick = function () {
                that.con_purchased.innerText = "";
                that.settime_column.innerText = "";
                $.removeCookie('js', { path: '/' });

            }
        }
    }
    // 按钮加减
    good_num() {
        let that = this;
        that.button[1].onclick = function () {
            let num = $('#inp_num').val();
            num++;
            that.inp.value = num;
            that.sp[0].innerText = "共" + num + "件，已选择";
            that.sp[1].innerText = num + "件";
            that.span[0].innerText = "￥" + 2299 * num;
            that.Settling[1].innerText = "￥" + 2299 * num;
            that.Settling[0].innerText = "￥" + 500 * num;
            $.cookie('js',JSON.stringify({"name":"魅族18 x","img":"../img/images/8.jpg","price":"2299","num":`${num}`}),{expires:7,path:'/'});
        }
        that.button[0].onclick = function () {
            let num = $('#inp_num').val();
            num--;
            if (num <= 1) {
                num = 1;
            }
            that.inp.value = num;
            that.sp[0].innerText = "共" + num + "件，已选择";
            that.sp[1].innerText = num + "件";
            
            that.span[0].innerText = "￥" + 2299 * num;
            that.Settling[1].innerText = "￥" + 2299 * num;
            that.Settling[0].innerText = "￥" + 500 * num;
            $.cookie('js',JSON.stringify({"name":"魅族18 x","img":"../img/images/8.jpg","price":"2299","num":`${num}`}),{expires:7,path:'/'});
        }
        that.inp.onblur = function () {
            
                let num = $('#inp_num').val();
                
                if (num <= 1 || isNaN(num)) {
                    num = 1;
                }
                that.inp.value = num;
                that.sp[0].innerText = "共" + num + "件，已选择";
                that.sp[1].innerText = num + "件";
                
                that.span[0].innerText = "￥" + 2299 * num;
                that.Settling[1].innerText = "￥" + 2299 * num;
                that.Settling[0].innerText = "￥" + 500 * num;
                $.cookie('js',JSON.stringify({"name":"魅族18 x","img":"../img/images/8.jpg","price":"2299","num":`${num}`}),{expires:7,path:'/'});
            }
    }
    timer() {
        let timer = setInterval(() => {
            // 创建未来的一个日期对象
            let future = new Date(2022, 4, 23);
            // 创建一个现在的日期对象
            let now = new Date();
            // 求差值转秒
            let diff = Math.floor((future.getTime() - now.getTime()) / 1000);
            // 天
            let date = Math.floor(diff / 60 / 60 / 24);
            // 时
            let hours = Math.floor((diff - date * 24 * 60 * 60) / 60 / 60);
            // 分
            let minutes = Math.floor((diff - date * 24 * 60 * 60 - hours * 60 * 60) / 60);
            // 秒
            let second = diff % 60;
            for (let i = 0, len = this.settime.length; i < len; i++) {
                this.settime[i].innerText = "限时特惠，剩余" + this.toDoub(date) + "天" + this.toDoub(hours) + "时" + this.toDoub(minutes) + "分" + this.toDoub(second) + "秒";
            }
            if (date === 0 && hours === 0 && minutes === 0 && second === 0) {
                clearInterval(timer);
            }
        }, 1000);
    }
    toDoub(n) {
        return n < 10 ? "0" + n : n;
    }
}
new car();