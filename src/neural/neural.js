const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")
let width;
let height;
function updateDimensions() {
    if (window.innerWidth < 576){
        height = 410;
        width = 410;
    } 
    else {
        height = 552;
        width = 552;
    }
}


updateDimensions();

window.addEventListener('resize', () => {
    updateDimensions();
});

import {weightsOfFirstLayer, weightsOfSecondLayer, biasOfFirstLayer, biasOfSecondLayer} from './biasAndWeights.js';
const picture = [];
window.picture = picture
window.recognizeNumber = recognizeNumber
window.clearCanvas = clearCanvas
for (let i = 0; i < 50; i++) // создание пустой картинки
{
    picture[i] = new Array(50).fill(0);
}

function setCanvasSize(width, height)   // устанавливаю размер канвас и делаю обводку
{
    canvas.width = width
    canvas.height =height
    ctx.strokeRect(0, 0, canvas.width, canvas.height)
}

function clearCanvas() //очищаю канвас
{
    canvas.width = canvas.width
    setCanvasSize(width, height)
    picture.length =0
    for (let i = 0; i < 50; i++) // очищаю изображение 
    {
        picture[i] = new Array(50).fill(0);
    }
    document.getElementById("demo").innerHTML = ""
}

canvas.addEventListener('mousemove', function(event) {
    if (event.buttons === 1) {
        const x = Math.floor(event.offsetX);
        const y = Math.floor(event.offsetY);
        picture[Math.floor(y/11)][Math.floor(x/11)] = 1;
        ctx.fillStyle = 'black';
        ctx.fillRect(x , y , 11, 11);
    }
});


setCanvasSize(width, height)


function matrixToList(picture) // перевод матрицы в линейный список
{
    const linearPic =[];
    for(let i=0; i <50; i++)
    {
        for(let j=0; j <50; j++)
        {
            linearPic.push(picture[i][j])
        }
    }
    return(linearPic)
}


function scaleMatrix(matrix, newWidth, newHeight) //увеличение(уменьшение) картинки до нужного размера
{
    let originalWidth = matrix[0].length
    let originalHeight = matrix.length
    let scaleX = newWidth / originalWidth
    let scaleY = newHeight / originalHeight
    let newMatrix = []

    for (let i = 0; i < newHeight; i++) 
    {
        let row = []
        for (let j = 0; j < newWidth; j++) 
        {
            let originalRow = Math.floor(i / scaleY)
            let originalCol = Math.floor(j / scaleX)
            row.push(matrix[originalRow][originalCol])
        }
        newMatrix.push(row)
    }
    
    return(newMatrix)
}

function recognizeNumber(picture)
{
    let newPic = matrixToList(centerAndScaleImage(picture))
    const secondLayer =[]
    for(let i=0; i < 512; i++) //просчет нейронов второго слоя
    {
        let sum =0;
        for(let j=0; j < 2500; j++)
        {
            sum+= weightsOfFirstLayer[i +j*512 ]*newPic[j] 
        }
        secondLayer.push(Math.max(sum + biasOfFirstLayer[i],0))
    }

    const thirdLayer =[];
    for(let i=0; i < 10; i++) //просчет нейронов третьего слоя
    {
        let sum =0;
        for(let j=0; j < 512; j++)
        {
            sum+= weightsOfSecondLayer[i +j*10]*secondLayer[j]
        }
        thirdLayer.push(Math.max(sum + biasOfSecondLayer[i],0))
    }
    const index = thirdLayer.indexOf(Math.max(thirdLayer))
    let indexOfMaxElement =0
    let maxElement =thirdLayer[0]
    
    for(let i=1; i < 10; i++) // нахождение самого активного нейрона в третьем слойе
    {
        if (thirdLayer[i] > maxElement)
        {
            maxElement = thirdLayer[i]
            indexOfMaxElement =i
        }
    }

    document.getElementById("demo").innerHTML ="Это цифра " + indexOfMaxElement
}

function centerAndScaleImage(matrix) 
{
    let edges = findEdges(matrix) // нахождение краев изображения
    let number = []
    //край        левый  правый  верхний  нижний
    //индекс        0       1       2       3
    for (let i= edges[2]; i <= edges[3]; i++)//перенос выделенного изображения в новую матрицу
    {
        let row =[]
        for(let j = edges[0]; j <=edges[1]; j++)
        {
            row.push(picture[i][j])  // это оригниальная картинка
        }
        number.push(row)
    }

    number = scaleMatrix(number,20,30)
    let x=0
    let y=0
    let counter =0
    for(let i=0; i < number.length; i++)
    {
        for(let j=0; j < number[0].length; j++)
        {
            if(number[i][j] === 1)
            {
                x+= j
                y+= i
                counter++
            }
        }
    }
    x = Math.floor(x/counter)
    y = Math.floor((Math.abs(number.length -y))/counter) // нахождения центра масс картинки
    
    
    let horizontalLength = number[0].length
    let verticalLength = number.length
    for(let i =0;i < Math.floor((50 - verticalLength)/2); i++) // дополнение картинки до размера 50 на 50
    {
        number.unshift(new Array(50).fill(0))
        number.push(new Array(50).fill(0))
    }
    if(number.length < 50)
    {
        number.push(new Array(50).fill(0))
    }
    for(let j=0; j < number.length; j++)
    {
        if(number[j].length < number.length)
        {
            for(let i =0;i < Math.floor((50 - horizontalLength)/2); i++)
            {
                number[j].push(0)
                number[j].unshift(0)
            }
        }
        if(number[j].length < number.length)
        {
            number[j].push(0)
        }
    }
    //console.log(number)
    return(number)
}

function findEdges(picture) // нахождение краев картинки
{
    let left = picture[0].length;
    let right = 0;
    let top = picture.length;
    let bottom = 0;
    for (let i = 0; i < picture.length; i++) {
        for (let j = 0; j < picture[i].length; j++) {
            if (picture[i][j] === 1) 
            {
                left = Math.min(left, j);
                right = Math.max(right, j);
                top = Math.min(top, i);
                bottom = Math.max(bottom, i);
            }
        }
    }
    return([left, right, top, bottom])
}


