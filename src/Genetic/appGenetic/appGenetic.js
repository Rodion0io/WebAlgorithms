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
    let individum = pointsArray.slice(); // Создаем копию массива pointsArray
    for (let i = individum.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [individum[i], individum[j]] = [individum[j], individum[i]]; // Обмен элементов массива для перемешивания
    }
    return individum;
}


// Функция создания популяции 
function creatPopulation(sizePopulation, pointsArray){
    let population = [];
    for (let i = 0; i < sizePopulation; i++){
        population.push(generateIndividum(pointsArray));
    }
    return population;
}

// Функция, которая будет рандомно выбирать двух родителей для дальнейшего размножения
function chooseParent(sizePopulation){
    let firstParent = Math.floor(Math.random() * sizePopulation) + 1;
    let secondParent = Math.floor(Math.random() * sizePopulation) + 1;
    if (secondParent == firstParent){
        secondParent = Math.floor(Math.random() * sizePopulation) + 1;
    }
    return [firstParent, secondParent];
}

// Функция скрещивания родителей, будет возвращать пару потомков
function crossing(firstParent, secondParent, sizePopulation){
    // const breakPoint = Math.floor(Math.random() * firstParent.length - 1) + 1; 
    const breakPoint = 2;
    let firstPartOfFirstChild = firstParent.slice(0, breakPoint);
    let firstPartOfSecondChild = secondParent.slice(0, breakPoint);
    let usedPointsFirst = [firstParent.slice(0, breakPoint)];
    let usedPointsSecond = [secondParent.slice(0, breakPoint)];
    let secondPartOfFirstChild = [];
    let secondPartOfSecondChild = [];
    for (let i = breakPoint; i < secondParent.length; i++){
        if (!usedPointsSecond.includes(secondParent[i])){
            secondPartOfFirstChild.push(secondParent[i]);
            usedPointsSecond.push(secondParent[i]);
        }
    }
    for (let i = breakPoint; i < firstParent.length; i++){
        if (!usedPointsFirst.includes(firstParent[i])){
            secondPartOfSecondChild.push(firstParent[i]);
            usedPointsFirst.push(firstParent[i]);
        }
    }

    usedPointsFirst = [];
    usedPointsSecond = [];

    // Добавляем недостающие элементы первой части первого ребенка во вторую часть
    for (let i = 0; i < firstPartOfFirstChild.length; i++) {
        if (!secondPartOfFirstChild.includes(firstPartOfFirstChild[i])) {
            secondPartOfFirstChild.push(firstPartOfFirstChild[i]);
        }
    }

    let firstChild = firstPartOfFirstChild.concat(secondPartOfFirstChild);
    let secondChild = firstPartOfSecondChild.concat(secondPartOfSecondChild);

    return [firstChild, secondChild];
}


// Функция, которая будет проводить мутацию
function mutation(mutationRatio, firstIndividum, secondIndividum){
    let number = Math.floor(Math.random() * 100) + 1;

}

function geneticAlgorithm(pointsArray){

}

document.getElementById('startGenetic').addEventListener('click', function(){
    let a = [0,3,1,4,2];
    let b = [0,2,4,3,1];
    let res = crossing(a, b, 5);
    console.log(res);
})