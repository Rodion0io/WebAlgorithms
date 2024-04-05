const canvas = document.getElementById('genetic-field');
const context = canvas.getContext('2d');
let pointsArray = [];


// Добавление точек в канвасе
canvas.addEventListener('click', function(event){
    context.beginPath();
    let firstPoint = event.offsetX;
    let secondPoint = event.offsetY;
    let radius = 4;
    // context.fillStyle = 'red';
    context.arc(firstPoint, secondPoint, radius, 0, Math.PI * 2);
    context.closePath();
    context.fill();
    pointsArray.push({x: firstPoint, y: secondPoint});
    console.log(pointsArray);
})


//Очищение канваса
document.getElementById('delete').addEventListener('click', function(){
    context.clearRect(0, 0, 550, 550);
    pointsArray = [];
})

// Удаление последенй точки
document.getElementById('deleteLastButton').addEventListener('click', 
    function deleteLastPoint(){
        const {x, y} = pointsArray.pop();
        let firstPoint = x;
        let secondPoint = y;
        let radius = 4;
        context.fillStyle = '#F9F9F9';
        context.strokeStyle = '#F9F9F9';
        context.arc(firstPoint, secondPoint, radius, 0, Math.PI * 2);
        context.closePath();
        context.fill();
        console.log(pointsArray);
        document.removeEventListener('click', deleteLastPoint);
    }
)

// let arr = [1,2,3];

// console.log(arr);

// let res = arr.pop() * 10;

// console.log(arr);
// console.log(res);