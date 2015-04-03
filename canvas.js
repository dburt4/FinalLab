var thecanvas = document.querySelector("#main-canvas");
var context = thecanvas.getContext("2d");
var width = thecanvas.width;
var height = thecanvas.height;
var x = 100;
var y = 200;
var xReverse = false;
var yReverse = false;

var x2 = 300;
var y2 = 300;
var x2Reverse = false;
var y2Reverse = false;

var requestAnimationFrame = window.requestAnimationFrame ||
                            window.mozRequestAnimationFrame ||
                            window.webkitRequestAnimationFrame ||
                            window.msRequestAnimationFrame;

function makeCircle() {
    context.clearRect(0, 0, width, height);
    context.fillStyle = "#EEEEEE";
    context.fillRect(0, 0, width, height);



    context.beginPath();
    var radius = 50;
    context.arc(x, y, radius, 0, Math.PI * 2, false);
    context.closePath();
    context.fillStyle = "blue";
    context.fill();
    context.fillStyle = "black";
    context.font = "20px Arial";
    context.fillText("Landen", x - 30, y);

    context.beginPath();
    var radius = 50;
    context.arc(x2, y2, radius, 0, Math.PI * 2, false);
    context.closePath();
    context.fillStyle = "red";
    context.fill();
    context.fillStyle = "black";
    context.font = "20px Arial";
    context.fillText("Daniel", x2 - 25, y2);



    if (x > 750) xReverse = true;
    if (y > 750) yReverse = true;
    if (x < 50) xReverse = false;
    if (y < 50) yReverse = false;
    if (yReverse) y = y - 3;
    else y = y + 3;
    if (xReverse) x = x - 5;
    else x = x + 5;

    if (x2 > 750) x2Reverse = true;
    if (y2 > 750) y2Reverse = true;
    if (x2 < 50) x2Reverse = false;
    if (y2 < 50) y2Reverse = false;
    if (y2Reverse) y2 = y2 - 5;
    else y2 = y2 + 5;
    if (x2Reverse) x2 = x2 - 3;
    else x2 = x2 + 3;
    requestAnimationFrame(makeCircle);
}
makeCircle();