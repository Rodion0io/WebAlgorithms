import { flag } from "./geneticAlgorithm.js";
import { deleteBadWay } from "./workWithCanvas.js";
import { canvas, context } from "./constants.js";
import { geneticAlgorithm } from "./geneticAlgorithm.js";
export let pointsArray = []; // {x:x, y:y}

// Запуск алгоритма
document.getElementById('startGenetic').addEventListener('click', function(){
    if (!flag){
        geneticAlgorithm();
    }
    else{
        alert("Дождитесь завершения алгоритма");
    }
    
});

// Добавление точек в канвасе
canvas.addEventListener('click', function(event){
    if (!flag){
        deleteBadWay();
        context.beginPath();
        let firstPoint = event.offsetX;
        let secondPoint = event.offsetY;
        let radius = 4;
        context.arc(firstPoint, secondPoint, radius, 0, Math.PI * 2);
        context.closePath();
        context.fill();
        pointsArray.push({x: firstPoint, y: secondPoint});
    }
    else{
        alert("Дождитесь завершения алгоритма");
    }
});

//Очищение канваса
document.getElementById('delete').addEventListener('click', function(){
    if (!flag){
        if (pointsArray.length == 0){
            alert("Точек нет!");
        }
        else{
            context.clearRect(0, 0, 550, 550);
            pointsArray = [];
        }
    }
    else{
        alert("Дождитесь завершения алгоритма");
    }
});

// Удаление последенй точки
document.getElementById('deleteLastButton').addEventListener('click', 
    function deleteLastPoint(){
        if (!flag){
            if (pointsArray.length == 0){
                alert("Точек нет!");
            }
            else{
                deleteBadWay()
                const {x, y} = pointsArray.pop();
                let radius = 4;
                context.clearRect(x - radius, y - radius, radius * 2, radius * 2);
            }
        }
        else{
            alert("Дождитесь завершения алгоритма");
        }
    }
);