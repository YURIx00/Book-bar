let navbarItem = document.querySelectorAll(".item");
for (let i = 0; i < navbarItem.length; i++) {
  navbarItem[i].addEventListener("click", function () {
    for (let i = 0; i < navbarItem.length; i++) {
      navbarItem[i].classList.remove("active");
    }
    this.classList.add("active");
  });
}

function removeAllChild(nodeName) {
  let node = document.querySelector(nodeName);
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
    $(".home-info img").attr("src", `${user.imagePath}`);
    console.log(user.imagePath);

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
    let VIP = ["", "尊贵黄金会员", "尊贵铂金会员", "尊贵钻石会员"];
    let designation = [];
    if (user.vipCLass != 0) {
      designation.push(VIP[parseInt(user.vipClass) - 1]);
    }
    designation.push("年度最佳读者");
    designation.push("茶室小点吞噬者");

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
  url: "http://localhost:8080/admin/getAllDessert",
  type: "get",
  dataType: "json",
  success: function (resp) {
    console.log(resp);
    let allDessert = resp.data;
    const catalogue = document.querySelector(".dessert-contaner catalogue");
    const dessert_info = document.querySelector(".dessert-info");
    removeAllChild(".dessert-info");
    const dessert_totPrice = document.querySelector(".dessert-shopping h2");
    dessert_totPrice.val = 1;
    const settlementBtn = document.querySelector(".shopping-add");

    let num = 1;
    allDessert.forEach((dessert) => {
      let newChild = document.createElement("dd");
      newChild.innerHTML = dessert.name + "<span>></span>";

      var random = Math.floor(Math.random() * 3) + 1;
      let dlClass = ".dl" + random;
      const dl = document.querySelector(dlClass);
      dl.appendChild(newChild);

      let newDessert = document.createElement("div");
      newDessert.classList.add("dessert-item");
      newDessert.innerHTML = `<img src="${dessert.imagePath}" /> <div class="dessert-xxx> <p class="dessert-price">现价：<strong>${dessert.cost}元</strong><span>${dessert.price}元</span></p><div class="dessert-sale-amout">库存${dessert.storage}份</div></div>`;

      // 点击加号总价格增加
      let plusBtn = document.createElement("ion-icon");
      plusBtn.name = "add-circle-outline";
      newDessert.appendChild(plusBtn);
      plusBtn.addEventListener("click", () => {
        dessert_totPrice.val = parseInt(dessert_totPrice.val) + dessert.cost;
        dessert_totPrice.innerHTML = `${dessert_totPrice.val}￥`;
      });
      dessert_info.appendChild(newDessert);

      // 点击菜单 显示甜点信息
      newChild.addEventListener("click", () => {
        newDessert.scrollIntoView({ behavior: "smooth" });
      });

      num++;
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

// 个人书架
$.ajax({
  url: "http://localhost:8080/home/getFavoriteBooksByUid",
  type: "get",
  data: {
    uid: localStorage.getItem("uid"),
  },
  dataType: "json",
  success: function (resp) {
    console.log(resp);
    allBook = resp.data.favoriteBooksList;

    const book_item_box = document.querySelector(".book-item-box");
    removeAllChild(".book-item-box");

    let num = 1;
    allBook.forEach((book) => {
      let newBook = document.createElement("div");
      newBook.classList.add("book-item");
      newBook.innerHTML = `
      <img src="${book.imagePath}" />
      <div class="author-box">
        <img src="img\\img\\default_profile.webp" />
        <p class="author-name">${book.author}</p>
        <p>10.3万字</p>
      </div>`;

      book_item_box.appendChild(newBook);

      // 点击图书，进入浏览界面
      newBook.addEventListener("click", () => {
        localStorage.setItem("bookName", book.name);
        window.location.href = `book.html`;
      });

      num++;
    });
  },
  error: function () {
    // alert("请求错误");
  },
});
