let navbarItem = document.querySelectorAll(".item");
for (let i = 0; i < navbarItem.length; i++) {
  navbarItem[i].addEventListener("click", function () {
    for (let i = 0; i < navbarItem.length; i++) {
      navbarItem[i].classList.remove("active");
    }
    this.classList.add("active");
  });
}

var typed = new Typed(".multiple-text", {
  strings: ["尊贵白金会员", "年度最佳读者", "茶室小点吞噬者"],
  typeSpeed: 100,
  backSpeed: 100,
  backDelay: 1000,
  loop: true,
});

let val = localStorage.getItem("test");
console.log(val);

let user = localStorage.getItem("user");
console.log(user);

// 头像
var xhr = new XMLHttpRequest();
xhr.open("GET", "/my/image/name.png", true);
xhr.responseType = "arraybuffer";

var imageType = xhr.getResponseHeader("Content-Type");
var blob = new Blob([xhr.response], { type: imageType });
var imageUrl = (window.URL || window.webkitURL).createObjectURL(blob);
$(".home-info img").attr("src", imageUrl);

//个人信息
const username = document.querySelector(".home-content h1");
username.innerHTML = user.username;
