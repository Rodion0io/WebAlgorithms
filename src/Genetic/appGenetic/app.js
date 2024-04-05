const canvas = document.getElementById('genetic-field');
const context = canvas.getContext('2d');
let pointsArray = [];

document.getElementById('addPoints').addEventListener('click', function(){
    canvas.addEventListener('click', function(event){
        context.beginPath();
        let firstPoint = event.offsetX;
        let secondPoint = event.offsetY;
        let radius = 4;
        context.arc(firstPoint, secondPoint, radius, 0, Math.PI * 2);
        context.closePath();
        context.fill();
        pointsArray.push({x: firstPoint, y: secondPoint});
    })
})

document.getElementById('delete').addEventListener('click', function(){
    
})