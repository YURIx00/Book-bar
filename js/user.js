let navbarItem = document.querySelectorAll(".item");
for (let i = 0; i < navbarItem.length; i++) {
  navbarItem[i].addEventListener("click", function () {
    for (let i = 0; i < navbarItem.length; i++) {
      navbarItem[i].classList.remove("active");
    }
    this.classList.add("active");
  });
}

function removeAllChild(node) {
  while (node.hasChildNodes()) {
    node.removeChild(node.firstChild);
  }
}

console.log(`uid: ${localStorage.getItem("uid")}`);

// 获取用户信息
$.ajax({
  url: "http://localhost:8080/user/getUserById",
  type: "get",
  data: {
    id: localStorage.getItem("uid"),
  },
  dataType: "json",
  success: function (resp) {
    console.log(resp);
    user = resp.data;

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

    // 个人简介
    const personIntro = document.querySelector(".home-content p");
    personIntro.innerHTML = user.briefIntroduction;

    // 个人余额
    const btn = document.querySelector(".btn");
    btn.innerHTML = `余额：${user.balance}元`;

    // 称号
    let VIP = ["尊贵黄金会员", "尊贵铂金会员", "尊贵钻石会员"];
    let designation = [];
    if (user.vipCLass != 0) {
      designation.insert(VIP[user.vipCLass - 1]);
    }
    designation.insert("年度最佳读者");
    designation.insert("茶室小点吞噬者");

    var typed = new Typed(".multiple-text", {
      strings: designation,
      typeSpeed: 100,
      backSpeed: 100,
      backDelay: 1000,
      loop: true,
    });
  },
  error: function () {
    // alert("请求错误");
  },
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
toVip.addEventListener("click", () => {
  window.location.href = "index.html";
});

// 茶室小点
$.ajax({
  url: "http://localhost:8080/home/getFavoriteBooksByUid",
  type: "get",
  dataType: "json",
  success: function (resp) {
    console.log(resp);
    let allDessert = resp.data;
    const catalogue = document.querySelector(".dessert-contaner catalogue");
    const dessert_info = document.querySelector(".dessert-info");
    removeAllChild(dessert_info);
    const dessert_totPrice = document.querySelector(".dessert-shopping h2");
    const settlementBtn = document.querySelector(".shopping-add");

    let num = 1;
    allDessert.array.forEach((dessert) => {
      let newChild = "<dd>" + dessert.name + "<span>></span></dd>";

      var random = Math.floor(Math.random() * 3) + 1;
      let dlClass = ".dl" + random;
      const dl = document.querySelector(dlClass);
      dl.appendChild(newChild);

      let newDessert = document.createElement("div");
      newDessert.classList.add("dessert-item");
      newDessert.innerHTML = `<img src="${dessert.imagePath}" /> <div class="dessert-xxx> <p class="dessert-price">现价：<strong>${dessert.cost}元</strong><span>${dessert.price}元</span></p><div class="dessert-sale-amout">库存${dessert.storage}份</div></div><ion-icon name="add-circle-outline" val="${dessert.cost}"></ion-icon>`;
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

$.ajax({
  url: "http://localhost:8080/home/getFavoriteBooksByUid",
  type: "get",
  data: {
    id: localStorage.getItem("uid"),
  },
  dataType: "json",
  success: function (resp) {
    console.log(resp);
    allBook = resp.data;

    const book_item_box = document.querySelector(".book_item_box");
    removeAllChild(book_item_box);

    let num = 1;
    allBook.array.forEach((book) => {
      let newBook = document.createElement("div");
      newBook.classList.add("book-item");
      newBook.innerHTML = `<div class="book-item">
      <img src="${book.imagePath}" />
      <div class="author-box">
        <img src="img\\img\\default_profile.webp" />
        <p class="author-name">${book.imagePath}</p>
        <p>10.3万字</p>
      </div>
    </div>`;

      book_item_box.appendChild(newBook);

      // 点击图书，进入浏览界面
      newBook.addEventListener("click", () => {
        window.open("`book.html?id=${book.id}`", "_blank");
      });

      num++;
    });

    const allBookElement = document.querySelectorAll(".book-slide");
    allBookElement.forEach((bookElement) => {
      window.location.href = `book.html?bookName=${bookElement.name}`;
    });
  },
  error: function () {
    // alert("请求错误");
  },
});
