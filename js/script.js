const header_item_icon = document.querySelector(".header-item-icon");
function iconTor() {
  const header_icon_down = document.querySelector(
    ".header-item-icon .header-icon-dowm"
  );
  header_icon_down.style.transform = `rotate(${720}deg)`;
}
header_item_icon.addEventListener("hover", iconTor);

// login
const change_btn = document.querySelector(".login-subtitle span");
const login_box = document.querySelector(".login-box");
const login_logo = document.querySelector(".login-logo");
const again_password = document.querySelector(".again_password");

let dir = 1;
function moveSliver() {
  const front = document.querySelector(".login-front");
  const back = document.querySelector(".login-back");
  const title = document.querySelector(".login-title");
  const subtitle = document.querySelector(".login-subtitle p");
  const subtitle_span = document.querySelector(".login-subtitle span");
  if (dir == 1) {
    front.style.left = "38%";
    back.style.right = "63%";
    setTimeout(() => {
      title.innerHTML = "登录";
      subtitle.innerHTML = "还没有创建账号吗? ";
      subtitle_span.innerHTML = " 注册";
      again_password.style.display = "none";
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
    }, "500");
    dir = -dir;
  }
}
change_btn.addEventListener("click", moveSliver);

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

// $.ajax({
//   type: "get",        // 请求方式
//   url: "js/data.txt", // 请求路径
//   dataType: "json",   // 预期返回一个 json 类型数据
//   success: function (data) {   // data是形参名
//       console.log(data);
//   }
// });

function clickSignupBtn() {
  let username = $(".username-field").val();
  let password = $(".password-field").val();
  let again_password = $(".again-password-field").val();

  if (username == "") {
    alert("用户名不能为空");
    return;
  }

  if (password == "") {
    alert("密码不能为空");
    return;
  }

  if (password !== again_password) {
    alert("重复密码不同");
    return;
  }
  var login_info = {
    username: username,
    password: password,
    again_password: again_password,
  };

  window.location.href = "user.html";

  if (dir == 1) {
    // 注册
    $.ajax({
      url: "queryProvinceServlet",
      type: "post",
      data: login_info,
      dataType: json,
      success: function (resp) {
        console.log(resp);
        localStorage.setItem("Personal_info", resp);
        window.location.href = "user.html";
      },
      error: function () {
        alert("请求错误");
      },
    });
  } else {
    // 登录
    $.ajax({
      url: "queryProvinceServlet",
      type: "get",
      data: login_info,
      dataType: json,
      success: function (resp) {
        console.log(resp);
        localStorage.setItem("Personal_info", resp);

        window.location.href = "user.html";
      },
      error: function () {
        alert("请求错误");
      },
    });
  }
}

btn.addEventListener("click", clickSignupBtn);
