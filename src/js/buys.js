class buys{
    constructor(){
        // 加
        this.jia = document.querySelector('#jia');
        // 减
        this.jian = document.querySelector('#jian');
        // input
        this.input = document.querySelector('#add input');
        // money
        this.money = document.querySelectorAll('#money span');
        this.price = $('#div2 #span2');
      
        // console.log(this.num);
        // 立即购买
        this.addcartleft = document.querySelector('#addcartleft');
        // 加入购物车
        this.addcartright = document.querySelector('#addcartright');
        this.addEvent();     
    }
    addEvent(){
       let that =this;
       let num=that.input.value
       $('#addcartleft').click(function(){
           location.href='../html/car.html'
       })
        this.jia.onclick = function(){
            
            num++
            that.input.value=num
             that.money[1].innerText = parseInt(that.price.text()) * num;
        };
        this.jian.onclick = function(){    
            num--;
            if( num<= 1){
                num=1
                that.input.value = num
                that.money[1].innerText =num*that.price.text();
               
                
            }else{
                
                that.input.value =num
                that.money[1].innerText =num*that.price.text();
            }
            
            
       };
       $(this.addcartright).click(function(){
        //   '{"name":"手机名字"，"img":"dizhi","价格"："jiage","数量":"num"}'
          $.cookie('js',JSON.stringify({"name":"魅族18 x","img":"../img/images/8.jpg","price":"2299","num":`${num}`}),{expires:7,path:'/'});
          location.reload(true);
      })
    }
    
}

new buys()