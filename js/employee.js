// 输入框动画
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

// 所有section初始化
const section_login = document.querySelector(".section-login");
const section_header = document.querySelector(".header");
const section_book = document.querySelector(".section-book");
const section_dessert = document.querySelector(".section-dessert");
const section_footer = document.querySelector(".footer");

// section_login.style.display = "flex";
// section_header.style.display = "none";
// section_book.style.display = "none";
// section_dessert.style.display = "none";
// section_footer.style.display = "none";

// 员工id
let eid = -1;

// 登录获取eid 展现界面
const login_btn = document.querySelector(".login-btn");
login_btn.addEventListener("click", function () {
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

  var login_info = {
    name: username,
    password: password,
  };

  // 写完删
  section_login.style.display = "none";
  section_header.style.display = "flex";
  section_book.style.display = "flex";
  section_dessert.style.display = "none";
  section_footer.style.display = "flex";

  $.ajax({
    url: "http://localhost:8080//admin/login",
    type: "post",
    data: login_info,
    dataType: "json",
    success: function (resp) {
      console.log(resp);
      admin = resp.data;

      section_login.style.display = "none";
      section_header.style.display = "flex";
      section_footer.style.display = "flex";
      if (admin.job == "图书管理员") {
        section_book.style.display = "flex";
      } else {
        section_dessert.style.display = "flex";
      }
    },
    error: function () {
      alert("请求错误");
    },
  });
});

// 图书信息
let ajaxData = {};
$.ajax({
  url: "http://localhost:8080/admin/getAllBook",
  type: "get",
  data: ajaxData,
  dataType: "json",
  success: function (resp) {
    console.log(resp);
    allBook = resp.data;

    const catalogue = document.querySelector(".section-book catalogue");
    const book_search_box = document.querySelector(".book-manage-box");

    let num = 1;
    allBook.array.forEach((book) => {
      let newName = "<dd>" + book.name + "<span>></span></dd>";

      var random = Math.floor(Math.random() * 3) + 1;
      let dlClass = ".dl" + random;
      const dl = document.querySelector(dlClass);
      dl.appendChild(newName);

      let newBook = document.createElement("div");
      newBook.classList.add("book-item");
      newBook.bookId = book.id;
      newBook.innerHTML = `
      <img src="${book.imagePath}" alt="" />
      <div class="book-info">
        <p>名称：<input type="text" value="${book.name}" style="width: 12rem;" id="bookName"></input></p>
        <p>作者：<input type="text" value="${book.author}" style="width: 10rem;" id="bookAuthor"></input></p>
        <p>电子版价格：<input type="number" value="${book.eprice}" style="width: 5rem;" id="bookEprice"></input>元</p>
        <p>实体书价格：<input type="number" value="${book.price}" style="width: 7rem;" id="bookPrice">元</input></p>
        <p class="book-intro">
          简介：<input type="text" value="${book.briefIntroduction}"
          style="width: 90%" id="bookIntro"></input
          >
        </p>
        <p>位置：<input type="text" value="${book.location}" style="width: 12rem;" id="bookLocation"></input></p>
        <p>数量：<input type="number" value="${book.storage}" style="width: 12rem;" id="bookStorage"></input>本</p>
        <div class="btn-box">
          <button type="submit" id="bookChangeBtn">保存修改</button>
        </div>
        <div class="btn-box">
          <button type="submit" id="bookDeleteBtn">删除</button>
        </div>
      </div>`;
      book_search_box.appendChild(newBook);

      // 点击菜单 显示图书信息
      newName.addEventListener("click", () => {
        newBook.scrollIntoView({ behavior: "smooth" });
      });

      num++;
    });
  },
  error: function () {
    // alert("请求错误");
  },
});

// 图书信息
ajaxData = {};
$.ajax({
  url: "http://localhost:8080/admin/getAllBook",
  type: "get",
  data: ajaxData,
  dataType: "json",
  success: function (resp) {
    console.log(resp);
    allBook = resp.data;

    const catalogue = document.querySelector(".section-book catalogue");
    const book_search_box = document.querySelector(".book-manage-box");

    let num = 1;
    allBook.array.forEach((book) => {
      let newName = "<dd>" + book.name + "<span>></span></dd>";

      var random = Math.floor(Math.random() * 3) + 1;
      let dlClass = ".dl" + random;
      const dl = document.querySelector(dlClass);
      dl.appendChild(newName);

      let newBook = document.createElement("div");
      newBook.classList.add("book-item");
      newBook.bookId = book.id;
      newBook.innerHTML = `
      <img src="${book.imagePath}" alt="" />
      <div class="book-info">
        <p>名称：<input type="text" value="${book.name}" style="width: 12rem;" id="bookName"></input></p>
        <p>作者：<input type="text" value="${book.author}" style="width: 10rem;" id="bookAuthor"></input></p>
        <p>电子版价格：<input type="number" value="${book.eprice}" style="width: 5rem;" id="bookEprice"></input>元</p>
        <p>实体书价格：<input type="number" value="${book.price}" style="width: 7rem;" id="bookPrice">元</input></p>
        <p class="book-intro">
          简介：<input type="text" value="${book.briefIntroduction}"
          style="width: 90%" id="bookIntro"></input
          >
        </p>
        <p>位置：<input type="text" value="${book.location}" style="width: 12rem;" id="bookLocation"></input></p>
        <p>数量：<input type="number" value="${book.storage}" style="width: 12rem;" id="bookStorage"></input>本</p>
        <div class="btn-box">
          <button type="submit" id="bookChangeBtn">保存修改</button>
        </div>
        <div class="btn-box">
          <button type="submit" id="bookDeleteBtn">删除</button>
        </div>
      </div>`;
      book_search_box.appendChild(newBook);

      // 点击菜单 显示图书信息
      newName.addEventListener("click", () => {
        newBook.scrollIntoView({ behavior: "smooth" });
      });

      num++;
    });
  },
  error: function () {
    // alert("请求错误");
  },
});
