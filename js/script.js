const header_item_icon = document.querySelector(".header-item-icon");
function iconTor() {
  const header_icon_down = document.querySelector(
    ".header-item-icon .header-icon-dowm"
  );
  header_icon_down.style.transform = `rotate(${720}deg)`;
}
header_item_icon.addEventListener("hover", iconTor);

// 滑动到Login
const toLogin = document.querySelector(".toLogin");
const section_login = document.querySelector(".section-login");
toLogin.addEventListener("click", () => {
  section_login.scrollIntoView({ behavior: "smooth" });
});

// 滑动到Vip
const toVip = document.querySelector(".toVip");
const section_vip = document.querySelector(".section-vip");
toVip.addEventListener("click", () => {
  section_vip.scrollIntoView({ behavior: "smooth" });
});

//滑动到Dessert
const toDessert = document.querySelector(".toDessert");
const sectipn_dessert = document.querySelector(".section-dessert");
toDessert.addEventListener("click", () => {
  sectipn_dessert.scrollIntoView({ behavior: "smooth" });
});

// 登录窗口动画
let dir = 1;
const change_btn = document.querySelector(".login-subtitle span");
const login_box = document.querySelector(".login-box");
const login_logo = document.querySelector(".login-logo");
const again_password = document.querySelector(".again_password");
function moveSliver() {
  const front = document.querySelector(".login-front");
  const back = document.querySelector(".login-back");
  const title = document.querySelector(".login-title");
  const subtitle = document.querySelector(".login-subtitle p");
  const subtitle_span = document.querySelector(".login-subtitle span");
  const input_field = document.querySelectorAll(".input-field");

  if (dir == 1) {
    front.style.left = "38%";
    back.style.right = "63%";
    setTimeout(() => {
      title.innerHTML = "登录";
      subtitle.innerHTML = "还没有创建账号吗? ";
      subtitle_span.innerHTML = " 注册";
      again_password.style.display = "none";
      input_field.forEach((element) => {
        element.value = "";
      });
    }, "500");
    dir = -dir;
  } else {
    front.style.left = "3rem";
    back.style.right = "3rem";
    setTimeout(() => {
      title.innerHTML = "注册";
      subtitle.innerHTML = "已经创建了账号? ";
      subtitle_span.innerHTML = " 登录";
      again_password.style.display = "block";
      input_field.forEach((element) => {
        element.value = "";
      });
    }, "500");
    dir = -dir;
  }
}
change_btn.addEventListener("click", moveSliver);

// 登录输入框动画
const login_inputs = document.querySelectorAll(".input-field");
login_inputs.forEach((inp) => {
  inp.addEventListener("focus", () => {
    inp.classList.add("active");
  });
  inp.addEventListener("blur", () => {
    if (inp.value != "") return;
    inp.classList.remove("active");
  });
});

const btn = document.querySelector(".signup-btn");

localStorage.setItem("uid", "-1");
let val = localStorage.getItem("uid");
console.log(val);

function clickSignupBtn() {
  let username = $(".username-field").val();
  let password = $(".password-field").val();

  if (username == "") {
    alert("用户名不能为空");
    return;
  }

  if (password == "") {
    alert("密码不能为空");
    return;
  }

  if (dir == 1 && password !== $(".again-password-field").val()) {
    alert("重复密码不同");
    return;
  }

  var login_info = {
    username: username,
    password: password,
  };

  if (dir == 1) {
    // 注册
    $.ajax({
      url: "http://localhost:8080/user/createUser",
      type: "post",
      data: login_info,
      dataType: "json",
      success: function (resp) {
        console.log("注册成功");
        console.log(resp);
        localStorage.setItem("uid", resp.uid);

        window.location.href = "user.html";
      },
      error: function () {
        alert("请求错误");
      },
    });
  } else {
    // 登录
    $.ajax({
      url: "http://localhost:8080/user/login",
      type: "post",
      data: login_info,
      dataType: "json",
      success: function (resp) {
        console.log("登录成功");
        console.log(resp);
        localStorage.setItem("uid", resp.uid);

        window.location.href = "user.html";
      },
      error: function () {
        alert("请求错误");
      },
    });
  }
}
btn.addEventListener("click", clickSignupBtn);

// vip购买
const vip = document.querySelectorAll(".vip-btn");
const vip1 = document.querySelector(".vip1");
vip1.vipClass = 1;
const vip2 = document.querySelector(".vip2");
vip2.vipClass = 2;
const vip3 = document.querySelector(".vip3");
vip3.vipClass = 3;

vip.forEach(function (element, number) {
  element.addEventListener("click", () => {
    let vipUpgrade = {
      vipClass: number,
    };

    if (localStorage.getItem("uid") == -1) {
      section_login.scrollIntoView({ behavior: "smooth" });
      alert("请先登录");
    } else {
      $.ajax({
        url: "http://localhost:8080/home/upgradeVip",
        type: "post",
        data: vipUpgrade,
        dataType: "json",
        success: function (resp) {
          console.log(resp);
        },
        error: function () {
          alert("请求错误");
        },
      });
    }
  });
});
