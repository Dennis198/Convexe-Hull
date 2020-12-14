/**
 * This File contains all Methods which are needed for drawing on the Canvas
 */

 //Resets the Canvas to the inital state
export function reset(){
    var canvas = document.getElementById("2d-plane");
    var context = canvas.getContext("2d");
    context.beginPath();
    context.fillStyle = "#ADD8E6";
    context.fillRect(0,0,canvas.width,canvas.height);
    context.stroke(); 
}

//Draws a Point at location x,y with the size size and color color
export function drawPoint(x, y, size=4, color="black"){
    var canvas = document.getElementById("2d-plane");
    var context = canvas.getContext("2d");
    context.fillStyle = color;//`#DC143C`;//Red
    context.beginPath();
    context.arc(x, y, size, 0, 2*Math.PI);
    context.fill();
}

//Draws a Line from start to end with color
export function drawLine(start, end, color="black"){
    var canvas = document.getElementById("2d-plane");
    var context = canvas.getContext("2d");
    context.strokeStyle=color;
    context.lineWidth=1;
    context.beginPath();
    context.moveTo(start.x, start.y);
    context.lineTo(end.x, end.y);
    context.stroke();
}

//Draws all Lines of the hull
export function  drawPolygonLines(hull, color="black"){
    var canvas = document.getElementById("2d-plane");
    var context = canvas.getContext("2d");
    context.strokeStyle=color;
    context.lineWidth=1;
    context.beginPath();
    context.moveTo(hull[0].x,hull[0].y);
    for(let i=1;i<hull.length;i++){
        context.lineTo(hull[i].x,hull[i].y);
        context.stroke();
    }
    context.lineTo(hull[0].x,hull[0].y);
    context.stroke();
}


//Draws the and fills the hull
export function drawPolygon(hull){
    if(hull.length<2) return;
    var canvas = document.getElementById("2d-plane");
    var context = canvas.getContext("2d");
    context.beginPath();
    context.moveTo(hull[0].x,hull[0].y);
    for(let i=1;i<hull.length;i++){
        context.lineTo(hull[i].x,hull[i].y);
    }
    context.fillStyle="rgba(220, 20, 60,0.3)";
    context.fill();
}