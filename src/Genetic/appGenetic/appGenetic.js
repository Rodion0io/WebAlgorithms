const canvas = document.getElementById('genetic-field');
const context = canvas.getContext('2d');
let pointsArray = [];
const population = 100;
const mutationRatio = 0.5;


// Добавление точек в канвасе
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


//Очищение канваса
document.getElementById('delete').addEventListener('click', function(){
    if (pointsArray.length == 0){
        alert("Точек нет!");
    }
    else{
        context.clearRect(0, 0, 550, 550);
        pointsArray = [];
    }
})

// Удаление последенй точки
document.getElementById('deleteLastButton').addEventListener('click', 
    function deleteLastPoint(){
        if (pointsArray.length == 0){
            alert("Точек нет!");
        }
        else{
            const {x, y} = pointsArray.pop();
            let firstPoint = x;
            let secondPoint = y;
            let radius = 4;
            context.clearRect(x - radius, y - radius, radius * 2, radius * 2);
        }
    }
);


// let arr = [1,2,3];

// console.log(arr);

// let res = arr.pop() * 10;

// console.log(arr);
// console.log(res);

// функция генерации особи
function generateIndividum(pointsArray){
    let individum = pointsArray.slice();
    individum.sort(() => Math.random() * 2 - 1);
    return individum;
}

// Функция создания популяции 
function creatPopulation(sizePopulation, pointsArray){
    let population = [];
}

// Функция, которая будет рандомно выбирать двух родителей для дальнейшего размножения
function chooseParent(sizePopulation){

}

// Функция скрещивания родителей, будет возвращать пару потомков
function crossing(firstParent, secondParent){
  
}

// Функция, которая будет проводить мутацию
function mutation(mutationRatio, firstIndividum, secondIndividum){

}

function geneticAlgorithm(pointsArray){

}

document.getElementById('startGenetic').addEventListener('click', function(){
    let array = generateIndividum(pointsArray);
    console.log(array);
})