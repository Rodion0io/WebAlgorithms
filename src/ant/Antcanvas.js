const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")
const points = []; // массив для хранения поставленных точек
let size = 550;
var flag1 = 1;
var flag2 = 1;
var flag3 = 1;
var flag4 = 1; 
///тест для канваса 

function setCanvasSize( size )   // устанавливаю размер канвас и делаю обводку
{
    //if (check.length != 0)
    canvas.width = size
    canvas.height = size
    ctx.strokeRect(0, 0, canvas.width, canvas.height)
}

function drawPoints() 
{   
    if ( flag1 == 1 && flag2 == 1) 
    {
        flag3 = 1;
        flag4 = 1;
        setCanvasSize( size ) 
        for (let i = 0; i < points.length ; i++) 
        { 
            ctx.beginPath();
            ctx.fillRect(points[i].x - 3, points[i].y - 3, 10, 10);
            ctx.fill();
    }
    Bob()
}

}

function clearCanvas()
{
    if ( flag1 == 1 && flag2 == 1) 
     {
        flag3 = 1;
        flag4 = 1;
        canvas.width = canvas.width
        antBest.length = 0;
        points.length = 0;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        setCanvasSize(size)
    }
}

setCanvasSize(size)



canvas.addEventListener("click", function(event) 
{
    if (flag1 == 1 && flag2 == 1) 
    {
    const x = event.offsetX; // берем координаты поставленной точки
    const y = event.offsetY;
    flag3 = 1;
    flag4 = 1;
    
    for (let i = 0; i < points.length; i++) 
    {
        if (Math.abs(points[i].x - x) < 10 && Math.abs(points[i].y - y) < 10) { // если точка поставлена на другую точку, то удаляем их
            points.splice(i, 1);
            drawPoints();
            return;
        }
    }

    points.push
    (
        {x: x, y: y}
    ); // если точка поставлена на пустое место, добавляем
    drawPoints();
    Bob(); 
}
});
//export default points;


var currentPointIndex = 0;
var progress = 0;
var progress1 = 0;
var currentPointIndex1 = 0;
var NextIndex = 1;
let clearLine = false;

function emitDataFile()
{
    if (flag2 === 1 && flag3 === 1) 
    {  
    flag1 = 0;


    let currentPoint = points[ antBest[currentPointIndex] ] , nextPoint;

    if (currentPointIndex + 1 < points.length) 
    {
        nextPoint = points[ antBest[currentPointIndex + 1] ];
    }
    else 
    {
        nextPoint = points[ antBest[0] ];
    }
    
 
    drawLine1 (currentPoint, nextPoint, progress);

    progress += 0.1;

    if (progress >= 1) 
    {
        progress = 0;
        currentPointIndex = (currentPointIndex + 1) ;
    }
    

    if (currentPointIndex < points.length ) 
    {
        requestAnimationFrame(emitDataFile);
    }

    else 
    {

        Bob()
        flag1 = 1;
        flag4 = 1;
        flag3 = 0;
        currentPointIndex = 0;
        currentPoint = points[ antBest[0] ] ;
        progress = 0;

    }
}
 
}

function draw()
{
    if (flag1 === 1 && flag4 === 1 ) 
    {
        flag2 = 0;

   if (clearLine ) 
   {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        setCanvasSize(size)
        clearLine = false;
   }
    let currentPoint = points[  currentPointIndex1  ] 
    let nextPoint = points[ NextIndex ];



    ctx.fillRect(currentPoint.x - 3, currentPoint.y - 3, 10, 10);
    ctx.fill;
    drawLine(currentPoint, nextPoint, progress1 , currentPointIndex1 , NextIndex );

    progress1 += 0.11;

    if (progress1 >= 1 && (NextIndex + 1 >= points.length )  ) 
    {
        progress1 = 0;
        currentPointIndex1 = (currentPointIndex1 + 1 ) ;
        NextIndex = currentPointIndex1 + 1;
    }
    else if (progress1 >= 1 ) 
    {
        progress1 = 0;
        NextIndex = NextIndex + 1;
    }

    if (currentPointIndex < points.length - 1  && NextIndex  < points.length  ) 
    {
        requestAnimationFrame(draw);
    }

    else 
    {
        flag3 = 1;
        flag2 = 1;
        flag4 = 0;
        NextIndex = 1;
        currentPointIndex1 = 0;
        progress1 = 0;
        clearLine = true;
    }

    }
 
}

function drawLine(p1, p2, progress , from , to ) 
    {
        const turquoiseShade = Math.floor( 255 - phero1[from][to] * 80);
        ctx.strokeStyle = `rgb(0, ${turquoiseShade}, 255)`;
        ctx.beginPath();
        ctx.fillRect(p2.x - 3, p2.y - 3, 10, 10);
        ctx.fill();
        ctx.moveTo(p1.x, p1.y);
        let x = p1.x + (p2.x - p1.x) * progress;
        let y = p1.y + (p2.y - p1.y) * progress;
        ctx.lineTo(x, y);
        ctx.stroke();
  
    }

function drawLine1(p1, p2, progress ) 
    {
        ctx.strokeStyle = `black`;
        ctx.beginPath();

        ctx.moveTo(p1.x, p1.y);
        let x = p1.x + (p2.x - p1.x) * progress;
        let y = p1.y + (p2.y - p1.y) * progress;
        ctx.lineTo(x, y);
        ctx.stroke();

    }

