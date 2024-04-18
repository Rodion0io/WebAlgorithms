import { heightField, widthField } from "./constantVariable.js";
import { createMaze } from "./creatMaze.js";
import { visualizationMaze } from "./visualization.js";
import { chooseStartPoint, chooseEndPoint } from "./choosePoints.js";
import { findStart, findEnd } from "./operationWithPoints.js";
import { astar } from "./AstarAlgorithm.js";
import { animateSearchAndPath, animatePath } from "./animate.js";

let flag = 0;
let matrix;

document.getElementById('generateButton').addEventListener('click', function() {
    if (flag == 0){
        const height = parseInt(document.getElementById('inputSize').value);
        const width = parseInt(document.getElementById('inputSize').value);
        matrix = createMaze(width, height);
        const field = document.querySelector('.field');
        field.innerHTML = '';
        visualizationMaze(matrix, height, width, heightField, widthField);
    }
    if (flag){
        alert('Дождитесь завершения алгоритма!');
    }
});

document.getElementById('addStart').addEventListener('click', function() {
    if (flag == 0){
        chooseStartPoint(matrix);
    }
    if (flag){
        alert('Дождитесь завершения алгоритма!');
    }
});

document.getElementById('addEnd').addEventListener('click', function(){
    if (flag == 0){
        chooseEndPoint(matrix)
    }
    if (flag){
        alert('Дождитесь завершения алгоритма!');
    }
});

document.getElementById('startButton').addEventListener('click', function() {
    const start = findStart(matrix);
    const end = findEnd(matrix);
    if (start == null){
        alert("Выберите начало лабиринта");
    }
    else if(end == null){
        alert("Выберите окончание лабиринта");
    }
    else if(start == null && end == null){
        alert("Выберите начало и окончание лабиринта");
    }
    else{
        const { path, exploredNodes } = astar(start, end, matrix);
        if (path) {
            animateSearchAndPath(exploredNodes, path, matrix);
        } else {
            const message = document.querySelector('text-faild');
            if(message){
                message.style.display = 'block';
            }
        }
    }
});