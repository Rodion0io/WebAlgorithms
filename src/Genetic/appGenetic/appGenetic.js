const canvas = document.getElementById('genetic-field');
const context = canvas.getContext('2d');
let pointsArray = []; // {x:x, y:y}
const sizePopulation = 100;
let generationGenetic = 1000;


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

// Функция, которая высчитывает расстояние между точками
function distBetwwenTwoPoints(firstPoint, secondPoint){
    let distance = Math.sqrt(Math.pow((secondPoint.x - firstPoint.x), 2) + Math.pow((secondPoint.y - secondPoint.x), 2));
    return distance;
}

// Функция, которая считает длину пути(особи)
function calculationWay(pointsArray){
    let summWay = 0;
    for (let i = 0; i < pointsArray.length - 1; i++){
        summWay += distBetwwenTwoPoints(pointsArray[i], pointsArray[i + 1]);
    }
    return summWay;
}

// функция генерации особи
function generateIndividum(pointsArray){
    let individum = pointsArray.slice();
    for (let i = individum.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [individum[i], individum[j]] = [individum[j], individum[i]];
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

// Функция, которая выбирает двух родителей
function chooseParents(population){
    let firstParent = population[Math.floor(Math.random() * population.length)];
    let secondParent = population[Math.floor(Math.random() * population.length)];
    if (firstParent == secondParent){
        secondParent = population[Math.floor(Math.random() * population.length)];
    }
    
    return [firstParent, secondParent];
}

// Функция, которая будет рандомно выбирать двух родителей для дальнейшего размножения
function crossing(firstParent, secondParent){
    const breakPoint = Math.floor(Math.random() * firstParent.length - 1) + 1; 
    let firstPartOfFirstChild = firstParent.slice(0, breakPoint);
    let firstPartOfSecondChild = secondParent.slice(0, breakPoint);
    let usedPointFirst = firstParent.slice(0, breakPoint);
    let usedPointSecond = secondParent.slice(0, breakPoint);;
    let secondPartOfFirstChild = [];
    let secondPartOfSecondChild = [];
    
    for (let i = breakPoint; i < secondParent.length; i++) {
        if (!usedPointFirst.includes(secondParent[i])){
            secondPartOfFirstChild.push(secondParent[i]);
            usedPointFirst.push(secondParent[i]);
        }
    }

    for (let i = breakPoint; i < firstParent.length; i++){
        if (!usedPointSecond.includes(firstParent[i])){
            secondPartOfSecondChild.push(firstParent[i]);
            usedPointSecond.push(firstParent[i]);
        }
    }

    for (let i = breakPoint; i < firstParent.length; i++){
        if (!usedPointFirst.includes(firstParent[i]) && secondPartOfFirstChild.length + firstPartOfFirstChild.length + 1 <= firstParent.length) {
            secondPartOfFirstChild.push(firstParent[i]);
            usedPointFirst.push(firstParent[i]);
        }
    }

    for (let i = breakPoint; i < secondParent.length; i++){
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
function mutate(individum){
    const mutationRatio = Math.floor(Math.random() * 101);
    if (Math.random() < mutationRatio){
        let firstIndex = Math.floor(Math.random() * individum.length);
        let secondIndex = Math.floor(Math.random() * individum.length);
        if (firstIndex == secondIndex){
            secondIndex = Math.floor(Math.random() * individum.length);
        }
        let temp = firstIndex;
        firstIndex = secondIndex;
        secondIndex = temp;
    }
}

// Сам генетический алгоритм
function geneticAlgorithm(pointsArray, sizePopulation, generations) {
    let population = creatPopulation(sizePopulation, pointsArray);
    let bestRoute = population[0];

    for (let generation = 0; generation < generations; generation++) {
        let newPopulation = [];

        for (let i = 0; i < sizePopulation; i++) {
            const [firstParent, secondParent] = chooseParents(population);
            const [firstchild, secondChild] = crossing(firstParent, secondParent);
            mutate(firstchild);
            mutate(secondChild);
            newPopulation.push(firstchild);
            newPopulation.push(secondChild);
        }

        population = newPopulation;

        population.sort((a, b) => calculationWay(a) - calculationWay(b));

        let best = population[0];

        if (best < bestRoute){
            bestRoute = best;
        }
    }

    return { route: bestRoute, population: population};
}

document.getElementById('startGenetic').addEventListener('click', function(){
    let {route, population} = geneticAlgorithm(pointsArray, sizePopulation, generationGenetic);
    if (pointsArray.length < 2){
        alert('Добавьте точки');
    }
    else{
        console.log(route);
        console.log(population);
    }
})