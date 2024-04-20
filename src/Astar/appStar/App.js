import { createMaze } from "./creatMaze.js";
import { heightField, widthField } from "./constantVariable.js";
import { visualizationMaze } from "./visualization.js";
import { chooseStartPoint, chooseEndPoint } from "./choosePoints.js";
import { findStart, findEnd } from "./operationWithPoints.js";
import { astar } from "./AstarAlgorithm.js";
import { animateSearchAndPath, flag } from "./animate.js";
export let matrix;

// Событие на создание лабиринта
document.getElementById('generateButton').addEventListener('click', function() {
    if (flag == 0){
        const height = parseInt(document.getElementById('inputSize').value);
        const width = parseInt(document.getElementById('inputSize').value);
        if (height < 5 && width < 5){
            alert("Размер должен быть больше 5");
        }
        else{
            matrix = createMaze(width, height);
            const field = document.querySelector('.field');
            field.innerHTML = '';
            visualizationMaze(matrix, height, width, heightField, widthField);
        }
    }
    if (flag){
        alert('Дождитесь завершения алгоритма!');
    }
});

// Событие на добавление начальной координаты
document.getElementById('addStart').addEventListener('click', function() {
    if (flag == 0){
        chooseStartPoint(matrix);
    }
    if (flag){
        alert('Дождитесь завершения алгоритма!');
    }
});

// Событие на добавление конечной координаты
document.getElementById('addEnd').addEventListener('click', function(){
    if (flag == 0){
        chooseEndPoint(matrix)
    }
    if (flag){
        alert('Дождитесь завершения алгоритма!');
    }
});

// Событие на запуск алгоритма
document.getElementById('startButton').addEventListener('click', function() {
    const start = findStart(matrix);
    const end = findEnd(matrix);
    if (!flag){
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
    }
    else{
        alert('Дождитесь завершения алгоритма!');
    }
});