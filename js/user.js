let navbarItem = document.querySelectorAll(".item");
for (let i = 0; i < navbarItem.length; i++) {
  navbarItem[i].addEventListener("click", function () {
    for (let i = 0; i < navbarItem.length; i++) {
      navbarItem[i].classList.remove("active");
    }
    this.classList.add("active");
  });
}

// 获取用户信息
let uid = localStorage.getItem("uid");
let user = {};
let ajaxData = {
  uid: uid,
};

$.ajax({
  url: "http://localhost:8080/user/getUserById",
  type: "get",
  data: ajaxData,
  dataType: "json",
  success: function (resp) {
    console.log(resp);
    user = resp.data;
  },
  error: function () {
    // alert("请求错误");
  },
});

let val = localStorage.getItem("test");
console.log(val);

// 头像
var xhr = new XMLHttpRequest();
xhr.open("GET", "/my/image/name.png", true);
xhr.responseType = "arraybuffer";

var imageType = xhr.getResponseHeader("Content-Type");
var blob = new Blob([xhr.response], { type: imageType });
var imageUrl = (window.URL || window.webkitURL).createObjectURL(blob);
$(".home-info img").attr("src", imageUrl);

// 个人信息
const username = document.querySelector(".home-content h1");
username.innerHTML = user.username;

// 称号

let VIP = ["尊贵黄金会员", "尊贵铂金会员", "尊贵钻石会员"];
let designation = [];
designation.insert(VIP[user.vipCLass]);
designation.insert("年度最佳读者");
designation.insert("茶室小点吞噬者");

var typed = new Typed(".multiple-text", {
  strings: designation,
  typeSpeed: 100,
  backSpeed: 100,
  backDelay: 1000,
  loop: true,
});

// 窗口滑动
const toReading = document.querySelector(".toReading");
toReading.addEventListener("click", () => {
  window.location.href = "library.html";
});

const toDessert = document.querySelector(".toDessert");
const section_dessert = document.querySelector(".section-dessert");
toDessert.addEventListener("click", () => {
  section_dessert.scrollIntoView({ behavior: "smooth" });
});

const toBookShelf = document.querySelector(".toBookShelf");
const section_bookshelf = document.querySelector(".section-bookshelf");
toBookShelf.addEventListener("click", () => {
  section_bookshelf.scrollIntoView({ behavior: "smooth" });
});

const toVip = document.querySelector(".toVip");
toBookShelf.addEventListener("click", () => {
  window.location.href = "index.html";
});

// 茶室小点
$.ajax({
  url: "http://localhost:8080/admin/getAllDessert",
  type: "get",
  data: ajaxData,
  dataType: "json",
  success: function (resp) {
    console.log(resp);
    let allDessert = resp.data;
    const catalogue = document.querySelector(".dessert-contaner catalogue");
    const dessert_info = document.querySelector(".dessert-info");
    const dessert_totPrice = document.querySelector(".dessert-shopping h2");
    const settlementBtn = document.querySelector(".shopping-add");

    let num = 1;
    allDessert.array.forEach((dessert) => {
      let newChild = "<dd>" + dessert.name + "<span>></span></dd>";

      var random = Math.floor(Math.random() * 3) + 1;
      let dlClass = ".dl" + random;
      const dl = document.querySelector(dlClass);
      dl.appendChild(newChild);

      let newDessert = `<div class=\"dessert-item\"> <img src=\"img\\img\\dessert${num}.jpg\" /> <div class=\"dessert-xxx\"> <p class=\"dessert-price\">现价：<strong>${dessert.cost}元</strong><span>${dessert.price}元</span></p><div class=\"dessert-sale-amout\">库存${dessert.storage}份</div></div><ion-icon name=\"add-circle-outline\" val=\"${dessert.cost}\"></ion-icon></div>`;
      dessert_info.appendChild(newDessert);

      // 点击菜单 显示甜点信息
      newChild.addEventListener("click", () => {
        newDessert.scrollIntoView({ behavior: "smooth" });
      });

      num++;
    });

    // 点击加号总价格增加
    const allAddBtn = document.querySelectorAll(".dessert-item ion-icon");
    allAddBtn.forEach((addBtn) => {
      addBtn.addEventListener("click", () => {
        dessert_totPrice.val = +dessert_totPrice.val + dessert.cost;
        dessert_totPrice.innerHTML = `${dessert_totPrice.val}￥`;
      });
    });

    // 点击结算按钮清空金额
    settlementBtn.addEventListener("click", () => {
      dessert_totPrice.val = 0;
      dessert_totPrice.innerHTML = `${dessert_totPrice.val}￥`;
    });
  },
  error: function () {
    // alert("请求错误");
  },
});
