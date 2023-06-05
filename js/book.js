console.log(localStorage.getItem("bookName"));

function removeAllChild(nodeName) {
  let node = document.querySelector(nodeName);
  while (node.hasChildNodes()) {
    node.removeChild(node.firstChild);
  }
}

$.ajax({
  url: "http://localhost:8080/admin/getBooksByName",
  type: "get",
  data: {
    bookName: localStorage.getItem("bookName"),
  },
  dataType: "json",
  success: function (resp) {
    console.log(resp);
    let bookInfo = resp.data[0];
    console.log(bookInfo);

    const bookImg = document.querySelector(".book-img");
    bookImg.src = bookInfo.imagePath;

    const bookName = document.querySelector(".book-info h2");
    bookName.innerHTML = `<strong>${bookInfo.name}</strong> · ${bookInfo.classification}`;

    const bookAuthor = document.querySelector(".author-box h1");
    bookAuthor.innerHTML = bookInfo.author;

    const bookStorage = document.querySelector(".book-storage");
    bookStorage.innerHTML = `实体书库存：${bookInfo.storage}本`;

    const bookLocation = document.querySelector(".book-location");
    bookLocation.innerHTML = `图书位置：${bookInfo.location}本`;

    const bookCost = document.querySelector(".book-cost");
    bookCost.innerHTML = `销售价：${bookInfo.price}元`;

    const bookEprice = document.querySelector(".book-eprice");
    bookEprice.innerHTML = `电子书价格：${bookInfo.eprice}元`;

    const bookIntrodation = document.querySelector(".book-intro-content");
    bookIntrodation.innerHTML = `${bookInfo.briefIntroduction}`;

    const addFavorite = document.querySelector(".addFavorite");
    addFavorite.addEventListener("click", () => {
      $.ajax({
        url: "http://localhost:8080/home/addFavoriteBook",
        type: "post",
        data: {
          bookId: bookInfo.id,
          uid: localStorage.getItem("uid"),
        },
        dataType: "json",
        success: function (resp) {
          console.log(resp);
        },
        error: function () {
          alert("请求错误");
        },
      });
    });

    $.ajax({
      url: "http://localhost:8080/comment/getByBookid",
      type: "get",
      data: {
        id: bookInfo.id,
      },
      dataType: "json",
      success: function (resp) {
        console.log(resp);
        let allComment = resp.data;

        allComment.array.forEach((element) => {
          let commentUid = element.uid;
          let ajaxData = {
            uid: commentUid,
          };
          let user;
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

          const commect_box = document.querySelector(".commect-box");

          removeAllChild(".commect-box");

          let newComment = document.createElement("div");
          newComment.addEventListener("commect");
          newComment.innerHTML = `
          <div class="flex-column">
            <div class="flex align">
              <img class="head-pic" src="${user.imagePath}" />
              <div class="flex-column name-email">
                <p class="name">${user.name}</p>
                <p class="email">${"@" + user.name}</p>
              </div>
            </div>
            <p class="content">
              ${element.comment}
            </p>
            <p class="time">${element.commentData}</p>
          </div>`;
        });
        commect_box.appendChild(newComment);
      },
      error: function () {
        alert("请求错误");
      },
    });
  },
  error: function () {
    alert("请求错误");
  },
});
