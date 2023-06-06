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

function removeAllChild(nodeName) {
  let node = document.querySelector(nodeName);
  while (node.hasChildNodes()) {
    node.removeChild(node.firstChild);
  }
}

// 所有section初始化
const section_login = document.querySelector(".section-login");
const section_header = document.querySelector(".header");
const section_book = document.querySelector(".section-book");
const section_dessert = document.querySelector(".section-dessert");
const section_footer = document.querySelector(".footer");

section_login.style.display = "flex";
section_header.style.display = "none";
section_book.style.display = "none";
section_dessert.style.display = "none";
section_footer.style.display = "none";

// 员工id
let eid = -1;

// 登录获取eid 展现界面
const login_btn = document.querySelector(".login-btn");
login_btn.addEventListener("click", function () {
  let username = $(".username-field").val();
  let password = $(".password-field").val();

  console.log("username:" + username);
  if (username == "") {
    alert("用户名不能为空");
    return;
  }

  if (password == "") {
    alert("密码不能为空");
    return;
  }

  $.ajax({
    url: "http://localhost:8080/admin/login",
    type: "get",
    data: {
      name: username,
      password: password,
    },
    dataType: "json",
    success: function (resp) {
      console.log(resp);
      admin = resp.data;

      const adminBox = document.querySelector(".header-person-info span");
      adminBox.innerHTML = admin.name;

      section_login.style.display = "none";
      section_header.style.display = "flex";
      section_footer.style.display = "flex";
      if (admin.job == "图书管理员") {
        section_book.style.display = "flex";

        // 图书信息
        $.ajax({
          url: "http://localhost:8080/admin/getAllBook",
          type: "get",
          dataType: "json",
          success: function (resp) {
            console.log(resp);
            allBook = resp.data;

            const catalogue = document.querySelector(".section-book catalogue");
            const book_search_box = document.querySelector(".book-manage-box");
            removeAllChild(".book-manage-box");

            const createBook = document.querySelector(".createBook");
            createBook.addEventListener("click", () => {
              let newChild = document.createElement("dd");
              newChild.innerHTML = "新建图书" + "<span>></span>";

              let dlClass = ".dl1";
              const dl = document.querySelector(dlClass);
              dl.insertBefore(newChild, dl.childNodes[2]);

              let newBook = document.createElement("div");
              newBook.classList.add("book-item");
              newBook.bookId = book.id;
              newBook.innerHTML = `<img src="img\\img\\book-cover.jpg" alt="" />`;

              let newBookInfo = document.createElement("div");
              newBookInfo.classList.add("book-info");
              newBookInfo.innerHTML = `
              <p>名称：<input type="text" value="书名" style="width: 12rem;" id="bookName"></input></p>
              <p>作者：<input type="text" value="作者名" style="width: 10rem;" id="bookAuthor"></input></p>
              <p>电子版价格：<input type="number" value="电子书价格" style="width: 9rem;" id="bookEprice"></input>元</p>
              <p>实体书价格：<input type="number" value="实体书价格" style="width: 9rem;" id="bookPrice">元</input></p>
              <p class="book-intro">
                简介：<input type="text" value="简介"
                style="width: 90%" id="bookIntro"></input
                >
              </p>
              <p>位置：<input type="text" value="位置" style="width: 12rem;" id="bookLocation"></input></p>
              <p>数量：<input type="number" value="库存量" style="width: 12rem;" id="bookStorage"></input>本</p>`;

              let bookChangeBtn = document.createElement("div");
              bookChangeBtn.classList.add("btn-box");
              bookChangeBtn.innerHTML = `<button type="submit" id="bookChangeBtn">保存修改</button>`;
              newBookInfo.appendChild(bookChangeBtn);

              let bookDeleteBtn = document.createElement("div");
              bookDeleteBtn.classList.add("btn-box");
              bookDeleteBtn.innerHTML = `<button type="submit" id="bookDeleteBtn">删除</button>`;
              newBookInfo.appendChild(bookDeleteBtn);

              newBook.appendChild(newBookInfo);
              book_search_box.insertBefore(newBook, book_search_box.firstChild);

              // 点击菜单 显示图书信息
              newChild.addEventListener("click", () => {
                newBook.scrollIntoView({ behavior: "smooth" });
              });

              // 点击保存修改
              bookChangeBtn.addEventListener("click", () => {
                alert("保存成功");
              });

              // 点击删除按钮
              bookDeleteBtn.addEventListener("click", () => {
                newChild.style.display = "none";
                newBook.style.display = "none";
              });
            });

            let num = 1;
            allBook.forEach((book) => {
              console.log("book:" + num);
              let newChild = document.createElement("dd");
              newChild.innerHTML = book.name + "<span>></span>";

              var random = Math.floor(Math.random() * 3) + 1;
              let dlClass = ".dl" + random;
              const dl = document.querySelector(dlClass);
              dl.appendChild(newChild);

              let newBook = document.createElement("div");
              newBook.classList.add("book-item");
              newBook.bookId = book.id;
              newBook.innerHTML = `<img src="img\\img\\book-cover.jpg" alt="" />`;

              let newBookInfo = document.createElement("div");
              newBookInfo.classList.add("book-info");
              newBookInfo.innerHTML = `
              <p>名称：<input type="text" value="${book.name}" style="width: 12rem;" id="bookName"></input></p>
              <p>作者：<input type="text" value="${book.author}" style="width: 10rem;" id="bookAuthor"></input></p>
              <p>电子版价格：<input type="number" value="${book.eprice}" style="width: 9rem;" id="bookEprice"></input>元</p>
              <p>实体书价格：<input type="number" value="${book.price}" style="width: 9rem;" id="bookPrice">元</input></p>
              <p class="book-intro">
                简介：<input type="text" value="${book.briefIntroduction}"
                style="width: 90%" id="bookIntro"></input
                >
              </p>
              <p>位置：<input type="text" value="${book.location}" style="width: 12rem;" id="bookLocation"></input></p>
              <p>数量：<input type="number" value="${book.storage}" style="width: 12rem;" id="bookStorage"></input>本</p>`;

              let bookChangeBtn = document.createElement("div");
              bookChangeBtn.classList.add("btn-box");
              bookChangeBtn.innerHTML = `<button type="submit" id="bookChangeBtn">保存修改</button>`;
              newBookInfo.appendChild(bookChangeBtn);

              let bookDeleteBtn = document.createElement("div");
              bookDeleteBtn.classList.add("btn-box");
              bookDeleteBtn.innerHTML = `<button type="submit" id="bookDeleteBtn">删除</button>`;
              newBookInfo.appendChild(bookDeleteBtn);

              newBook.appendChild(newBookInfo);
              book_search_box.appendChild(newBook);

              // 点击菜单 显示图书信息
              newChild.addEventListener("click", () => {
                newBook.scrollIntoView({ behavior: "smooth" });
              });

              // 点击保存修改
              bookChangeBtn.addEventListener("click", () => {
                alert("保存成功");
              });

              // 点击删除按钮
              bookDeleteBtn.addEventListener("click", () => {
                newChild.style.display = "none";
                newBook.style.display = "none";
              });
              num++;
            });
          },
          error: function () {
            // alert("请求错误");
          },
        });
      } else {
        section_dessert.style.display = "flex";

        // 甜点信息
        $.ajax({
          url: "http://localhost:8080/admin/getAllDessert",
          type: "get",
          dataType: "json",
          success: function (resp) {
            console.log(resp);
            allBook = resp.data;
            console.log(allBook);

            const catalogue = document.querySelector(
              ".section-dessert catalogue"
            );
            const book_search_box = document.querySelector(
              ".section-dessert .book-manage-box"
            );
            removeAllChild(".section-dessert .book-manage-box");

            let num = 1;
            allBook.forEach((book) => {
              console.log(book);
              let newChild = document.createElement("dd");
              newChild.innerHTML = book.name + "<span>></span>";

              var random = Math.floor(Math.random() * 3) + 1;
              let dlClass = ".section-dessert .dl" + random;
              const dl = document.querySelector(dlClass);
              dl.appendChild(newChild);

              let newBook = document.createElement("div");
              newBook.classList.add("book-item");
              newBook.bookId = book.id;
              newBook.innerHTML = `<img src="img\\img\\book-cover.jpg" alt="" />`;

              let newBookInfo = document.createElement("div");
              newBookInfo.classList.add("book-info");
              newBookInfo.innerHTML = `
              <p>名称：<input type="text" value="#${book.name}" style="width: 12rem;"></input></p>
                  <p>品牌：<input type="text" value="蜜雪冰城" style="width: 12rem;"></input></p>
                  <p>价格：<input type="number" value="${book.price}" style="width: 5rem;"></input>元</p>
                  <p>库存量：<input type="number" value="${book.storage}" style="width: 7rem;">份</input></p>
                  <p class="book-intro">
                    简介：<input type="text" value="${book.briefIntroduction}"
                    style="width: 90%"></input
                    >
                  </p>
                  <p>位置：<input type="text" value="saoduhasdja" style="width: 12rem;"></input></p>
                  <p>数量：<input type="number" value="5" style="width: 12rem;"></input>本</p>`;

              let bookChangeBtn = document.createElement("div");
              bookChangeBtn.classList.add("btn-box");
              bookChangeBtn.innerHTML = `<button type="submit" id="bookChangeBtn">保存修改</button>`;
              newBookInfo.appendChild(bookChangeBtn);

              let bookDeleteBtn = document.createElement("div");
              bookDeleteBtn.classList.add("btn-box");
              bookDeleteBtn.innerHTML = `<button type="submit" id="bookDeleteBtn">删除</button>`;
              newBookInfo.appendChild(bookDeleteBtn);

              newBook.appendChild(newBookInfo);
              book_search_box.appendChild(newBook);

              // 点击菜单 显示图书信息
              newChild.addEventListener("click", () => {
                newBook.scrollIntoView({ behavior: "smooth" });
              });

              // 点击保存修改
              bookChangeBtn.addEventListener("click", () => {});

              // 点击删除按钮
              bookDeleteBtn.addEventListener("click", () => {});
              num++;
            });
          },
          error: function () {
            // alert("请求错误");
          },
        });
      }
    },
    error: function () {
      alert("请求错误");
    },
  });
});
