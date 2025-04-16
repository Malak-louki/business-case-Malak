
this.carouselOptions = ["previous", "play", "next"];

this.carouselData = [
  {
    id: "1",
    src: "img/img_caroussel/gojo_car.png",
  },
  {
    id: "2",
    src: "img/img_caroussel/ichigo_car.png",
  },
  {
    id: "3",
    src: "img/img_caroussel/luffy_car.png",
  },
  {
    id: "4",
    src: "img/img_caroussel/zenitsu_car.png",
  },
  {
    id: "5",
    src: "img/img_caroussel/naruto_car.png",
  },
];
// items in view
this.carouselInView = [1, 2];

document.querySelectorAll(".main-btn").forEach((btn) => {
  btn.onmouseover = function () {
    btn.style.animation = "btnOver 0.3s";
    btn.style.animationFillMode = "forwards";
  };

  btn.onmouseout = function () {
    btn.style.animation = "btnOut 0.3s";
    btn.style.animationFillMode = "forwards";
  };
});
