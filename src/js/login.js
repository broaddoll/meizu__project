class Login {
  constructor() {
    // 获取登录按钮
    this.$login = $("#login");
    // 获取注册按钮
    this.$register = $("#register");
    // 添加方法
    this.addEvent();
   
  }
  addEvent() {
    // 获取免登录复选框
    let cex = $("#cex");
    // 获取用户名框
    let $user = $("#user");
    // 获取密码框
    let $pwd = $("#pwd");
    // 假设用户名和密码输入都不正确，为false
    let flag = false;
    // 账号登录
    let $left = $(".span1");
    // 二维码登录
    let $right = $(".span2");
    // 账号登陆表单框
    let $bottom = $(".bottom");
    // 二维码框
    let $qrCode = $(".qrCode");
    // 点击logo跳转首页
    $('#gw').click(function(){
      location.href='../index.html'
    })
    // 点击二维码登录
    $right.click(function () {
      // 改变字体颜色
      $(this).css({ color: "#000" });
      // 账号登录字体为灰色
      $left.css({ color: "#999" });
      // 账号登陆框隐藏
      $bottom.hide();
      // 二维码框显示出来
      $qrCode.css({ display: "block" });
    });

    // 点击账号登录
    $left.click(function () {
      // 改变字体颜色
      $(this).css({ color: "#000" });
      // 二维码登录字体变灰色
      $right.css({ color: "#999" });
      // 账号登录框显示出来
      $bottom.show();
      // 隐藏二维码登录框
      $qrCode.css({ display: "none" });
    });
    // 用户名框失焦
    $user.blur(function () {
      // 正则验证
      if (/^\w{6,10}$/.test($(this).val())) {
        // 用户名框正确
        flag = true;
      } else {
        // 弹出提示框
        cocoMessage.error("请输入正确的账号(6到10位)", 2000);
        // 清除用户名框的值
        $(this).val("");
        // 用户名框未通过验证
        flag = false;
      }
    });
    // 密码框失焦
    $pwd.blur(function () {
      // 正则验证
      if (/^\w{8,12}$/.test($(this).val())) {
        // 密码框正确
        flag = true;
      } else {
        // 否则弹出提示框
        cocoMessage.error("请输入正确的密码(8到12位)", 2000);
        // 清除密码框框的值
        $(this).val("");
        // 密码框未通过验证
        flag = false;
        return false;
      }
    });
    // 验证码
    $(function () {
      code_draw();
      // 点击后刷新验证码
      $("#canvas").on("click", function () {
        code_draw();
      });

      $("#input-val").on("blur", function () {
        // 将输入的内容转为大写，可通过这步进行大小写验证
        var val = $(this).val().toLowerCase();
        // 获取生成验证码值
        var num = $("#canvas").attr("data-code");
        if (val == "") {
          // 弹出提示框
          cocoMessage.error("请输入验证码！", 2000);
        } else if (val == num) {
            flag = true;
        } else {
          cocoMessage.error("验证码错误，请重新输入", 2000);
          $(this).val("");
          flag = false;
        }
      });
    });
    // 鼠标移入移出登录框
    this.$login.hover(
      function () {
        $(this).css({ backgroundColor: "#3058DF" });
      },
      function () {
        $(this).css({ backgroundColor: "#387AFF" });
      }
    );
    // 点击登录框
    this.$login.click(function () {
      // 判断表单验证是否通过
      if (flag) {
        // 获取用户名值
        let user = $user.val();
        // 获取密码值
        let pwd = $pwd.val();
        // 判断账号是否存在
        $.post('../php/query.php', { uname: `${user}` }, function (data){
            // 没有用户名
            if (data =='null') {
                cocoMessage.error("无此用户名，请注册", 0);
            }else{
                // 把账号密码发送给后端
                $.post("../php/login.php",{ uname: `${user}`, pwd: `${pwd}` },function (data) {
                    // 判断密码是否正确
                    if (data=='null') {
                        cocoMessage.error("密码错误", 2000);
                    }else{
                        let div1 = document.createElement("div");
                        div1.innerText = "登录成功！";
                        cocoMessage.success(div1);
                        // 是否勾选免登录复选框
                        if (cex.is(":checked")) {
                            $.cookie("免", user, { expires: 7, path: "/" });
                            location.href = '../index.html' 
                        }else{
                          $user.val("");
                        $pwd.val("");
                        $("#input-val").val('');
                        $.cookie("免", user, { path: "/" });
                        location.href = '../index.html' 
                    
                        }
                        
                    }
                })
            }
        })
      } else {
        cocoMessage.error("请填写正确信息", 2000);
      }
    });
    // 点击注册跳转页面
    this.$register.click(function () {
      location.href = "register.html";
    });
  }
}
new Login();
