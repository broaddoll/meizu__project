class List{
    constructor(){
        // 获取颜色切换按钮
        this.color=$('section ul li:first div i');
        // 获取装图片的ul
        this.$side=$('.side');
        // 切换图片的按钮
        this.$but=$('.but li');
        //获取手机
        this.$shouji=$('#shouji');
        this.init();
        // 添加方法
        this.addEvent();

    }
    addEvent(){
        // 获取改变颜色的图片
        let $img=$('section ul li:first>img');
        // 实例this指向that
        let that=this;
        // 点击logo跳转首页
    $('#gw').click(function(){
        location.href='../index.html'
      })
        // 遍历切换颜色按钮
        this.color.each(function(i,v){
            // 点击颜色按钮
            $(v).click(function(){
                // 清空所有的小圆点圆角边框
                that.color.each(function(i,v){
                    $(v).removeClass('radio')
                })
                // 切换不同颜色手机
                let src=$(this).attr('date-title')
                $img.attr('src',`../img/cqf_${src}.png`)
                // 给当前圆点添加圆角边框
                $(this).toggleClass('radio')
            })
        })
        // 点击不按钮，改变ul的位置
        this.$but.eq(0).click(function(){
            that.init()
            $(this).css('background','#a1a1a1')
            that.$side.css({transform :'translateX(0)'})
        })
        this.$but.eq(1).click(function(){
            that.init()
            $(this).css('background','#a1a1a1')
            that.$side.css({transform :`translateX(${-310*3}px)`})
        })
        this.$but.eq(2).click(function(){
            that.init()
            $(this).css('background','#a1a1a1')
            that.$side.css({transform :`translateX(${-310*4}px)`})
        })
        // 点击手机
        this.$shouji.click(function(){
            location.href='../html/product.html'
        })
    }
    // 把所有的切换按钮背景颜色替换
    init(){
        this.$but.each(function(i,v){
            $(v).css('background','#fff')
        })
    }
}
new List();