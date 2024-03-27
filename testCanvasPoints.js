const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")
const points = []; // массив для хранения поставленных точек
let size =500
let colours = [ "Purple", "Red", "Yellow", "Lime", "Teal", "Navy","SaddleBrown" ] 


function setCanvasSize( size)   // устанавливаю размер канвас и делаю обводку
{
    canvas.width = size
    canvas.height =size
    ctx.strokeRect(0, 0, canvas.width, canvas.height)
}

function clearCanvas()
{
    canvas.width = canvas.width
    points.length =0
    setCanvasSize(size)
}

function drawPoints() 
{
    setCanvasSize( size) // очищаем поле 
    for (let i = 0; i < points.length; i++) 
    { // устанавливаем точки из списка points
        ctx.beginPath();

        ctx.fillRect(points[i].x-3, points[i].y-3, 10, 10);
        ctx.fill();
    }
    //console.log(points) // тестовый вывод для проверки массива points
}


function clearClusterData(points)
{
    for (let i = 0; i < points.length; i++) 
    { 
        points[i].cluster = undefined
    }
}


setCanvasSize(size)

canvas.addEventListener("click", function(event) 
{
    const x = event.offsetX; // берем координаты поставленной точки
    const y = event.offsetY;

    for (let i = 0; i < points.length; i++) {
        
        if (Math.abs(points[i].x - x) < 10 && Math.abs(points[i].y - y) < 10) { // если точка поставлена на другую точку, то удаляем их
            points.splice(i, 1);
            drawPoints();
            return;
        }
    }

    points.push({x: x, y: y, cluster: undefined}); // если точка поставлена на пустое место, добавляем
    drawPoints();
});



function dbscan(points, epsilon, minPts) 
{
    clearClusterData(points)
    let visited = new Set()
    let clusterNum =0
    for (let point of points) 
    {
        if (visited.has(point)) {continue}
        let neighbors = getNeighbors(points, point, epsilon)
        if (neighbors.length >= minPts)
        {
            makeCluster(points, neighbors,visited, point, clusterNum++, epsilon, minPts)
        }

    }
    setCanvasSize( size) // очищаем поле 
    for (let i = 0; i < points.length; i++) { // красим кластеры
        if(points[i].cluster !== undefined)
        { 
            ctx.beginPath()
            ctx.fillStyle = colours[points[i].cluster]
            ctx.fillRect(points[i].x-3, points[i].y-3, 10, 10)
            ctx.fill()
        }
        else
        {
            ctx.beginPath()
            ctx.fillStyle = "black"
            ctx.fillRect(points[i].x-3, points[i].y-3, 10, 10)
            ctx.fill()
        }

    }

}

function getNeighbors(points, point, epsilon) // возвращает массив соседей точки(элементы массива являются обЪектами )
{
    return points.filter((p) => Math.sqrt((point.x - p.x) ** 2 + (point.y - p.y) ** 2) <= epsilon)
}

function makeCluster(points, neighbors,visited, point, clusterNum, epsilon, minPts) 
{
    point.cluster = clusterNum
    for (let neighbor of neighbors) 
    {
        if (!visited.has(neighbor)) // проходим по соседям точки
        {
            visited.add(neighbor)

            let newNeighbors = getNeighbors(points, neighbor, epsilon)
            if (newNeighbors.length >= minPts) // добавляем в массив соседей соседей первоначальныой точки
            {
                neighbors.push(...newNeighbors)
            }
        }
        neighbor.cluster = clusterNum // нумеруем кластер (элементы одного кластера имеют одинаковые номера) 
                                   //(так как в neighbor содержатся объекты то они ссылаются на объекты массива points)
    }
}


