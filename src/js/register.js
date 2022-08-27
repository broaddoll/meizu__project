class Register {
  constructor() {
    // 获取注册按钮
    this.$register = $("#register");
    // 获取登录按钮
    this.$login = $("#login");
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
    // 点击logo跳转首页
    $('#gw').click(function(){
      location.href='../index.html'
    })
    // 用户名框失焦
    $user.blur(function () {
      // 正则验证
      if (/^\w{6,10}$/.test($(this).val())) {
        // 用户名框正确
        flag = true;
      } else {
        // 否则弹出提示框
        cocoMessage.error("请输入6-10位的账号", 2000);
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
        cocoMessage.error("请输入8-12位的密码", 2000);
        // 清除密码框框的值
        $(this).val("");
        // 密码框未通过验证
        flag = false;
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
    // 鼠标移入移出注册框
    this.$register.hover(
      function () {
        $(this).css({ backgroundColor: "#3058DF" });
      },
      function () {
        $(this).css({ backgroundColor: "#387AFF" });
      }
    );
    // 点击注册按钮
    this.$register.click(function () {
      // 判断表单是否完整
      if (flag) {
        // 获取用户名值
        let user = $user.val();
        // 获取密码值
        let pwd = $pwd.val();
        // 判断是否勾选注册协议
        if (cex.is(":checked")) {
          //  接入数据库
          $.post("../php/query.php", { uname: `${user}` }, function (data) {
            // 判断是否有此用户名
            if (data == 'null') {
              // 把账号密码加入数据库
              $.post("../php/register.php",{ uname: `${user}`, pwd: `${pwd}` },function () {
                  let div1 = document.createElement("div");
                  div1.innerText = "注册成功！";
                  cocoMessage.success(div1);
                  $user.val("");
                  $pwd.val("");
                  $("#input-val").val("");
                }
              );
            }else{
              cocoMessage.error("此用户名被注册", 2000);
            }
          });
        } else {
          cocoMessage.error("请勾选注册协议", 2000);
          return;
        }
      } else {
        cocoMessage.error("请填写正确信息", 2000);
      }
    });
    // 点击登录按钮跳转页面
    this.$login.click(function () {
      location.href = "login.html";
    });
  }
}
new Register();
