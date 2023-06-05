var swiper = new Swiper(".swiper-container", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 4,
    stretch: 0,
    depth: 100,
    modifier: 2,
    slideShadows: true,
  },
  loop: false,
});

function removeAllChild(nodeName) {
  let node = document.querySelector(nodeName);
  while (node.hasChildNodes()) {
    node.removeChild(node.firstChild);
  }
}

$.ajax({
  url: "http://localhost:8080/admin/getAllBook",
  type: "get",
  dataType: "json",
  success: function (resp) {
    console.log(resp);
    allBook = resp.data;

    const book_search_box = document.querySelector(".book-search-box");
    removeAllChild(".book-search-box");
    let newTitle = document.createElement("div");
    newTitle.classList.add("book-search-title");
    newTitle.innerHTML =
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit.";
    book_search_box.appendChild(newTitle);

    let num = 1;
    allBook.forEach((book) => {
      console.log(book);
      let newChild = document.createElement("dd");
      newChild.innerHTML = book.name + "<span>></span>";

      var random = Math.floor(Math.random() * 3) + 1;
      let dlClass = ".dl" + random;
      const dl = document.querySelector(dlClass);
      dl.appendChild(newChild);

      let newBook = document.createElement("div");
      newBook.val = book.id;
      newBook.innerHTML = `
      <div class="testimonialBox">
        <img
          src="${book.imagePath}"
          class="quote"
        />
        <div class="content">
          <h2>${book.name}</h2>
          <p>
            ${book.introduce}
          </p>
          <div class="details">
            <div class="imgBx">
              <img src="${book.authorImagePath}"/>
            </div>
            <h3>Call me Phoenix<br /><span>Creative Designer</span></h3>
          </div>
        </div>
      </div>
    `;
      book_search_box.appendChild(newBook);
      newBook.addEventListener("click", () => {
        localStorage.setItem("bookName", book.name);
        window.location.href = `book.html`;
      });

      // 点击菜单 显示甜点信息
      newChild.addEventListener("click", () => {
        newBook.scrollIntoView({ behavior: "smooth" });
      });

      // 点击图书，进入浏览界面

      num++;
    });
  },
  error: function () {
    // alert("请求错误");
  },
});
