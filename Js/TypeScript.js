var txtArray = [];
let text1 = "Discover and collect unique NFT's";
let text2 = "Buy, sell and stock";
let text3 = "Your NFT's";
txtArray.push(text1, text2, text3);
var divText = document.getElementsByClassName("anim-txt");

function typeText(num) {
  let n = num;
  let y = 0;
  if (n == 0) {
    divText[n].className += " afterActive";
    const intervalId = setInterval(function () {
      divText[n].innerHTML += txtArray[n][y];
      y++;
      if (y === txtArray[n].length) {
        clearInterval(intervalId);
      }
    }, 50);

    setTimeout(typeText, 1500, n + 1);
  } else if (n > divText.length - 1) {
    divText[n - 1].className = divText[n - 1].className.replace(
      " afterActive",
      ""
    );
    clearTimeout;
  } else {
    divText[n - 1].className = divText[n - 1].className.replace(
      " afterActive",
      ""
    );
    divText[n].className = divText[n].className + " afterActive";
    const intervalId = setInterval(function () {
      divText[n].innerHTML += txtArray[n][y];
      y++;
      if (y === txtArray[n].length) {
        clearInterval(intervalId);
      }
    }, 50);

    setTimeout(typeText, 1500, n + 1);
  }
}

setTimeout(typeText, 1000, 0);
