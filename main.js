var canv = document.getElementById("canvas"),
  ctx = canv.getContext("2d"),
  isMouseDown = false,
  radius = 5,
  coords = []; // For save coordinats of mouse..

canv.width = window.innerWidth;
canv.height = window.innerHeight;

canv.addEventListener("mousedown", function() {
  isMouseDown = true;
});

canv.addEventListener("mouseup", function() {
  isMouseDown = false;
  ctx.beginPath();
  coords.push("mouseup");
});

ctx.lineWidth = radius * 2;

canv.addEventListener("mousemove", function(e) {
  if (isMouseDown) {
    coords.push([e.clientX, e.clientY]); //arraw for save coordinats of mouse...
    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(e.clientX, e.clientY, radius, 0, Math.PI * 2, false);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(e.clientX, e.clientY);
  }
});

function save() {
  localStorage.setItem("coords", JSON.stringify(coords));
}

function replay() {
  let timer = setInterval(function() {
    if (!coords.length) {
      clearInterval(timer);
      ctx.beginPath();
      return;
    }

    let crd = coords.shift(),
      e = {
        clientX: crd["0"],
        clientY: crd["1"]
      };

    coords.push([e.clientX, e.clientY]); //arraw for save coordinats of mouse...
    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(e.clientX, e.clientY, radius, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(e.clientX, e.clientY);
  }, 30);
}

function clear() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canv.width, canv.height);
  ctx.beginPath();
  ctx.fillStyle = "black";
}

document.addEventListener("keydown", function(e) {
  // console.log(e.keyCode);
  if (e.keyCode == 83) {
    // save
    save();
    console.log("Path has saved!!!");
  }
  if (e.keyCode == 82) {
    // replay
    console.log("Replayes..");

    coords = JSON.parse(localStorage.getItem("coords"));
    clear();
    replay();
  }
  if (e.keyCode == 67) {
    // clear

    console.log("Cleared");
    clear();
    coords = [];
  }
});

// Do cyrcle on click mouse
// canv.addEventListener("mousedown", function(e) {
//   ctx.beginPath();
//   ctx.arc(e.clientX, e.clientY, 30, 0, Math.PI * 2, false);
//   ctx.fill();
// });

// var x = 50,
// grad = ctx.createLinearGradient(0, 0, 500, 0);

// Color for Font..
// grad.addColorStop("0", "yellow");
// grad.addColorStop("0.50", "blue");
// grad.addColorStop("0.90", "red");
// ctx.fillStyle = grad;
// ctx.fillStyle = "green";
// ctx.strokeStyle = "blue";
// ctx.font = "64px Georgia";
// ctx.textAlign = "center";
// ctx.fillText("Hello World!", 100, 150);
// ctx.fillText("Hello World!", canv.width / 2, 50);

// ctx.scale(3, 3); // Make biger all firure wtat are down..
// ctx.rotate((30 * Math.PI) / 180); // Move around center on 30 gradusov..

// Triangle
// ctx.beginPath();
// ctx.moveTo(50, 50);
// ctx.lineTo(25, 100);
// ctx.lineTo(75, 100);
// ctx.lineTo(50, 50);
// ctx.closePath();
// ctx.stroke();

// Cyrcle;
// ctx.arc(500, 150, 100, 0, Math.PI * 2, false);
// ctx.fill();

// CUbe
// ctx.fillRect(x, 50, 300, 200);

// ctx.strokeStyle = "blue";
// ctx.lineWidth = 10;
// ctx.strokeRect(500, 50, 300, 200);

// Timer
// setInterval(function() {
//   ctx.fillStyle = "white";
//   ctx.fillRect(0, 0, canv.width, canv.height);
//   ctx.fillStyle = "magenta";
//   ctx.fillRect(x++, 50, 300, 200);
// }, 10);
