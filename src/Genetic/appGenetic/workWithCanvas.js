import { context } from "./constants.js";
import { pointsArray } from "./app.js";

// Функция, которая соединяет точки линией
export function drawLine(individum){
    deleteBadWay();
    for (let i = 0; i < individum.length - 1; i++){
        context.beginPath();
        context.moveTo(individum[i].x, individum[i].y);
        context.lineTo(individum[i + 1].x, individum[i + 1].y);
        context.strokeStyle = 'black'
        context.stroke();
        context.closePath();
    }
    context.beginPath();
    context.moveTo(individum[individum.length - 1].x, individum[individum.length - 1].y);
    context.lineTo(individum[0].x, individum[0].y);
    context.strokeStyle = 'black'
    context.stroke();
    context.closePath();
}

// Функция, которая перекрашивает окончательный путь
export function drawFinallyLine(individum){
    deleteBadWay();
    for (let i = 0; i < individum.length - 1; i++){
        context.beginPath();
        context.moveTo(individum[i].x, individum[i].y);
        context.lineTo(individum[i + 1].x, individum[i + 1].y);
        context.strokeStyle = 'red'
        context.stroke();
        context.closePath();
    }
    context.beginPath();
    context.moveTo(individum[individum.length - 1].x, individum[individum.length - 1].y);
    context.lineTo(individum[0].x, individum[0].y);
    context.strokeStyle = 'red'
    context.stroke();
    context.closePath();
}

// Функция, которая удаляет линии
export function deleteBadWay(){
    context.clearRect(0, 0, 550, 550);
    for (let i = 0; i < pointsArray.length; i++){
        context.beginPath();
        let radius = 4;
        context.arc(pointsArray[i].x, pointsArray[i].y, radius, 0, Math.PI * 2);
        context.closePath();
        context.fill();
    }
}