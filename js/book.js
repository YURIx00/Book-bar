let bookId = -1;
let send = {
  bookName: bookName,
};
$.ajax({
  url: "http://localhost:8080/admin/getBooksByName",
  type: "get",
  data: send,
  dataType: "json",
  success: function (resp) {
    console.log(resp);
    let bookInfo = resp.data;
    bookId = bookInfo.bookId;

    let newBookInfo = `<div class="browsing-box">
    <img
      src="${bookInfo.imagePath}"
      alt=""
      class="book-img"
    />
    <div class="book-info">
      <h2><strong>${bookInfo.name}</strong> · ${bookInfo.classification}</h2>
      <div class="author-box">
        <img src=${bookInfo.authorImagePath} />
        <h1>${bookInfo.author}</h1>
      </div>
      <p class="book-top">实体书库存：${bookInfo.storage}本</p>
      <p>图书位置：${bookInfo.location}</p>
      <p>销售价：${bookInfo.price}元</p>
      <p>电子书：<strong>有</strong></p>
      <p>电子书价格：${bookInfo.eprice}元</p>
      <div class="btns">
        <input type="button" value="购买实体书" />
        <input type="button" value="购买电子书" />
      </div>
    </div>
    <div class="book-intro">
      <div class="book-intro-title">图书简介</div>
      <div class="book-intro-content">
        ${bookInfo.briefIntroduction}
      </div>
    </div>
  </div>`;

    const browsing_section = document.querySelector(".browsing-section");
    browsing_section.appendChild(newBookInfo);
  },
  error: function () {
    alert("请求错误");
  },
});

let sendComment = {
  bookId: bookId,
};

$.ajax({
  url: "http://localhost:8080/comment/getByBookid",
  type: "get",
  data: sendComment,
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
      let newComment = `<div class="commect">
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
      </div>
    </div>`;
    });
    commect_box.appendChild(newComment);
  },
  error: function () {
    alert("请求错误");
  },
});
