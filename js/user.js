let navbarItem = document.querySelectorAll(".item");
for (let i = 0; i < navbarItem.length; i++) {
  navbarItem[i].addEventListener("click", function () {
    for (let i = 0; i < navbarItem.length; i++) {
      navbarItem[i].classList.remove("active");
    }
    this.classList.add("active");
  });
}

var typed = new Typed(".multiple-text", {
  strings: ["尊贵白金会员", "年度最佳读者", "茶室小点吞噬者"],
  typeSpeed: 100,
  backSpeed: 100,
  backDelay: 1000,
  loop: true,
});

let Personal_info = localStorage.getItem("Personal_info");

var blob = new Blob([Personal_info.imageResourse], {
  type: Personal_info.imageType,
});
var imageUrl = (window.URL || window.webkitURL).createObjectURL(blob);
$(".home-info img").attr("src", imageUrl);
