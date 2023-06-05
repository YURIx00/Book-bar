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

          addFavorite.value = "已加入书架";
          addFavorite.classList.add("alreadyAdd");
          addFavorite.classList.remove("xxbtn");
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
        bookId: bookInfo.id,
      },
      dataType: "json",
      success: function (resp) {
        console.log(resp);
        let allComment = resp.data;

        const commect_box = document.querySelector(".commect-box");
        removeAllChild(".commect-box");

        allComment.forEach((element) => {
          let newComment = document.createElement("div");
          newComment.classList.add("commect");
          newComment.innerHTML = `
          <div class="flex-column">
            <div class="flex align">
              <img class="head-pic" src="img\\img\\default_profile.webp" />
              <div class="flex-column name-email">
                <p class="name">${element.username}</p>
                <p class="email">${"@" + element.username}</p>
              </div>
            </div>
            <p class="content">
              ${element.comment}
            </p>
            <p class="time">${element.commentDate}</p>
          </div>`;

          commect_box.appendChild(newComment);
        });
      },
      error: function () {
        alert("请求错误");
      },
    });

    // 点击提交按钮 上传评论
    const submitBtn = document.querySelector(".submitBtn");
    submitBtn.addEventListener("click", () => {
      const commentContent = document.querySelector(".writing-content");
      console.log(commentContent.value);
      if (commentContent.value == "") {
        alert("评论不能为空");
        return;
      } else {
        $.ajax({
          url: "http://localhost:8080/comment/add",
          type: "post",
          data: {
            bookId: bookInfo.id,
            commentMes: commentContent.value,
            uid: localStorage.getItem("uid"),
          },
          dataType: "json",
          success: function (resp) {
            console.log(resp);
            let comment = resp.data;

            const commect_box = document.querySelector(".commect-box");

            let newComment = document.createElement("div");
            newComment.classList.add("commect");
            newComment.innerHTML = `
          <div class="flex-column">
            <div class="flex align">
              <img class="head-pic" src="img\\img\\default_profile.webp" />
              <div class="flex-column name-email">
                <p class="name">${comment.username}</p>
                <p class="email">${"@" + comment.username}</p>
              </div>
            </div>
            <p class="content">
              ${comment.comment}
            </p>
            <p class="time">${comment.commentDate}</p>
          </div>`;

            commect_box.appendChild(newComment);
          },
          error: function () {
            alert("请求错误");
          },
        });
      }
    });
  },
  error: function () {
    alert("请求错误");
  },
});
