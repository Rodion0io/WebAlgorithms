import { sizePopulation } from "./constants.js";
import { pointsArray } from "./app.js";
import { drawLine, drawFinallyLine } from "./workWithCanvas.js";
export let flag = 0;

// Функция, которая высчитывает расстояние между точками
function distBetwwenTwoPoints(firstPoint, secondPoint){
    let distance = Math.sqrt(Math.pow((secondPoint.x - firstPoint.x), 2) + Math.pow((secondPoint.y - firstPoint.y), 2));
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

// Функция для проведения турнирного отбора
function tournamentSelection(population, tournamentSize) {
    let tournament = [];
    for (let i = 0; i < tournamentSize; i++) {
        let randomIndex = Math.floor(Math.random() * population.length);
        tournament.push(population[randomIndex]);
    }
    
    let bestIndividual = tournament.reduce((best, individual) => {
        return calculationWay(individual) < calculationWay(best) ? individual : best;
    });

    return bestIndividual;
}

// Функция, которая выбирает двух родителей с помощью турнирного отбора
function chooseParents(population, tournamentSize){
    let firstParent = tournamentSelection(population, tournamentSize);
    let secondParent = tournamentSelection(population, tournamentSize);
    
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
    const mutationRatio = 70;
    if (Math.random() < mutationRatio){
        let firstIndex = Math.floor(Math.random() * individum.length);
        let secondIndex = Math.floor(Math.random() * individum.length);
        if (firstIndex == secondIndex){
            secondIndex = Math.floor(Math.random() * individum.length);
        }
        let temp = individum[firstIndex];
        individum[firstIndex] = individum[secondIndex];
        individum[secondIndex] = temp;
    }
}

// Сам генетический алгоритм
export function geneticAlgorithm(){
    let population = creatPopulation(sizePopulation, pointsArray);
    let bestRoute = population[0];
    let generationGenetic = pointsArray.length * 5;

    function gen(iteration){
        let newPopulation = [];

        for (let i = 0; i < sizePopulation; i++){
            const [firstParent, secondParent] = chooseParents(population, 15);
            const [firstChild, secondChild] = crossing(firstParent, secondParent);
            mutate(firstChild);
            mutate(secondChild);
            newPopulation.push(firstChild);
            newPopulation.push(secondChild);
        }

        population = newPopulation;

        population.sort((a, b) => calculationWay(a) - calculationWay(b));

        let currentBest = population[0];

        if (calculationWay(currentBest) < calculationWay(bestRoute)){
            bestRoute = currentBest;
        }

        drawLine(currentBest);

        if (iteration < generationGenetic){
            flag = 1;
            setTimeout(() => {
                gen(iteration + 1);
            }, 5);
        } 
        else{
            drawFinallyLine(bestRoute);
            flag = 0
        }
    }

    gen(1); 
}