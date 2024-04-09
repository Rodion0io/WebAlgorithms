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
function crossing(firstParent, secondParent, sizePopulation) {
    const breakPoint = Math.floor(Math.random() * firstParent.length - 1) + 1; 
    let firstPartOfFirstChild = firstParent.slice(0, breakPoint);
    let firstPartOfSecondChild = secondParent.slice(0, breakPoint);
    let usedPointFirst = firstParent.slice(0, breakPoint);
    let usedPointSecond = secondParent.slice(0, breakPoint);;
    let secondPartOfFirstChild = [];
    let secondPartOfSecondChild = [];
    
    for (let i = breakPoint; i < secondParent.length; i++) {
        if (!usedPointFirst.includes(secondParent[i])) {
            secondPartOfFirstChild.push(secondParent[i]);
            usedPointFirst.push(secondParent[i]);
        }
    }

    for (let i = breakPoint; i < firstParent.length; i++) {
        if (!usedPointSecond.includes(firstParent[i])) {
            secondPartOfSecondChild.push(firstParent[i]);
            usedPointSecond.push(firstParent[i]);
        }
    }

    for (let i = breakPoint; i < firstParent.length; i++) {
        if (!usedPointFirst.includes(firstParent[i]) && secondPartOfFirstChild.length + firstPartOfFirstChild.length + 1 <= firstParent.length) {
            secondPartOfFirstChild.push(firstParent[i]);
            usedPointFirst.push(firstParent[i]);
        }
    }

    for (let i = breakPoint; i < secondParent.length; i++) {
        if (!usedPointSecond.includes(secondParent[i]) && secondPartOfSecondChild.length + firstPartOfSecondChild.length + 1 <= secondParent.length) {
            secondPartOfSecondChild.push(secondParent[i]);
            usedPointSecond.push(secondParent[i]);
        }
    }

    let firstChild = firstPartOfFirstChild.concat(secondPartOfFirstChild);
    let secondChild = firstPartOfSecondChild.concat(secondPartOfSecondChild);

    return [firstChild, secondChild];
}

// Функция, которая будет проводить мутацию
function mutate(individual, mutationRatio) {
    if (Math.random() < mutationRatio) {
      const index1 = Math.floor(Math.random() * individual.length);
      let index2 = Math.floor(Math.random() * individual.length);
      while (index1 === index2) {
        index2 = Math.floor(Math.random() * individual.length);
      }
      [individual[index1], individual[index2]] = [individual[index2], individual[index1]];
    }
  }

function geneticAlgorithm(pointsArray){

}

document.getElementById('startGenetic').addEventListener('click', function(){
    let a = [0,3,1,4,2];
    let b = [0,2,4,3,1];
    let res = crossing(a,b ,5);
    console.log(res);
})