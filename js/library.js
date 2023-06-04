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

$.ajax({
  url: "http://localhost:8080/admin/getAllBook",
  type: "get",
  data: ajaxData,
  dataType: "json",
  success: function (resp) {
    console.log(resp);
    allBook = resp.data;

    const catalogue = document.querySelector(".book-browsing-box catalogue");
    const book_search_box = document.querySelector(".book-search-box");

    let num = 1;
    allBook.array.forEach((book) => {
      let newChild = "<dd>" + book.name + "<span>></span></dd>";

      var random = Math.floor(Math.random() * 3) + 1;
      let dlClass = ".dl" + random;
      const dl = document.querySelector(dlClass);
      dl.appendChild(newChild);

      let newName = `<div class="book-item">
      <img src="img\\img\reading wuman.jpg" />
      <div class="author-box">
        <img src="img\\img\\default_profile.webp" />
        <p class="author-name">${book.name}</p>
        <span>-10.3</span>
        <p>万字</p>
      </div>
      </div>`;
      catalogue.appendChild(newName);

      let newBook = `<div class="book-slide" val="${book.id}">
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
    </div>`;
      book_search_box.appendChild(newBook);

      // 点击菜单 显示甜点信息
      newName.addEventListener("click", () => {
        newBook.scrollIntoView({ behavior: "smooth" });
      });

      // 点击图书，进入浏览界面

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
