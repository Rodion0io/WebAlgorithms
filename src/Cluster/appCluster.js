const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const points = []; // массив для хранения поставленных точек
const points1 =[];
let height = 550;
let width = 550;
let colours = [ "Red" , "Blue" , "Green" , "Yellow" , "Pink" , "Purple" , "Orange" , "Brown" , "Navy" , "Teal" , "Lavender" , "Maroon" , "Aqua" , "Silver" , "Gold" , "Indigo" , "Turquoise" , "Magenta" , "Peach" , "Mint" , "Coral" , "Beige" , "Charcoal" , "Ruby" , "Slate" , "Ivory" , "Lilac" , "Cyan" , "Orchid" , "Olive" , "Salmon" , "Tan" , "Sky" , "blue" , "Periwinkle" , "Burgundy" , "Mauve" , "Taupe" , "Steel" , "blue" , "Mustard" , "Plum" , "Crimson" , "Khaki" , "Sand" , "Jade" , "Emerald" , "Rust" , "Saffron" , "Sepia" , "Garnet" , "Tangerine" , "Turquoise" , "Umber" , "Vermilion" , "Violet" , "Lilac" , "Apricot" , "Cerulean" , "Hazelnut" , "Cobalt" , "Champagne" , "Copper" , "Topaz" , "Ebony" , "Flax" , "Granite" , "Ivory" , "Lapis" , "Mink" , "Moss" , "Pearl" , "Sable" , "Sapphire" , "Sienna" , "Silver" , "Smoke" , "Sunflower" , "Rose" , "Lavender" , "Vermilion" , "Cornflower" , "Amethyst" , "Aquamarine" , "Azure" , "Lavender" , "Celadon" , "Chartreuse" , "Cinnamon" , "Cobalt" , "Coral" , "Cyan" , "Lemon" , "Flamingo" , "Marigold" , "Cinnamon" , "Mint" , "Raspberry" , "Lilac" , "Sandalwood" ];
let ammountOfClusters = 0;

function setCanvasSize(width, height)   // устанавливаю размер канвас и делаю обводку
{
    canvas.width = width
    canvas.height = height
    ctx.strokeRect(0, 0, canvas.width, canvas.height)
}

function clearCanvas()
{
    canvas.width = canvas.width
    points.length =0
    setCanvasSize(width, height)
}

function drawPoints() 
{
    setCanvasSize( width, height) // очищаем поле 
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

function dbscan(points, epsilon, minPts) 
{
    clearClusterData(points)
    let visited = new Set()
    let clusterNum = 0
    for (let point of points) 
    {
        if (visited.has(point)) {continue}
        let neighbors = getNeighbors(points, point, epsilon)
        if (neighbors.length >= minPts)
        {
            makeCluster(points, neighbors,visited, point, clusterNum++, epsilon, minPts)
        }

    }
    setCanvasSize( width, height) // очищаем поле 
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
}
function kMeans(points, k) 
{
    clearClusterData(points)
    let centroids = [];
    let clusters = [];
    for(let i=0; i < k;i++) // пусть центроидами будут первые k точек массива points
    {
        centroids.push(points[i])
    }
    for(let i=0; i < k;i++) // делаем матрицу кластеров
    {
        clusters.push([])
    }
    let changed = true;
    while (changed) {
        changed = false;
        for(let i=0; i < k;i++) // удаляем всел кластеры
        {
            clusters[i].length = 0
        }

        
        for (let point of points) //ищем точки для каждого кластера
        {
            let minDistance = 10000000;
            let closestCentroid = null;
            centroids.forEach((centroid, index) => {
                let distance = Math.sqrt(Math.pow(centroid.x - point.x, 2) + Math.pow(centroid.y - point.y, 2));
                if (distance < minDistance) {
                    minDistance = distance;
                    closestCentroid = index;
                }
            });
            
            clusters[closestCentroid].push(point);
        }
        
        let newCentroids = [];
        for (let i=0; i < k; i++) //создаем новые центроиды
        {
            let newX = 0
            let newY =0
            for(let el of clusters[i])
            {
                newX+=el.x
                newY+=el.y
            }
            newX = newX / clusters[i].length
            newY = newY / clusters[i].length
            newCentroids.push({x: newX, y: newY})
        }
        for (let i = 0; i < k; i++) // Проверяем изменились ли центроиды
        {
            if (newCentroids[i].x !== centroids[i].x || newCentroids[i].y !== centroids[i].y) {
                centroids = newCentroids;
                changed = true; 
                break;
            }
        }
    }
    
    for(let i=0; i < k;i++) //присваиваем точкам номера кластеров к которым они принадлежат
    {
        for (el of clusters[i])
        {
            el.cluster = i;
        }
    }

    for (let i = 0; i < points.length; i++) // отрисовываем кластеры
    { 
        ctx.beginPath();
        ctx.moveTo(points[i].x-5,points[i].y-5);
        ctx.lineTo(points[i].x+9,points[i].y+9);
        ctx.strokeStyle = colours[points[i].cluster]; 
        ctx.lineWidth = "3"; 
        ctx.stroke()
    }
}


function hierarchicalClustering(points, threshold) 
{
    clearClusterData(points)
    const clusters = [];
    for (let i = 0; i < points.length; i++) // изначально каждая точка - сама себе кластер
    {
        clusters.push([points[i]]);
        points[i].cluster = i;
    }

    let closestClusters = findClosestClusters(); // находим ближайшие кластеры
    
    while (closestClusters[2] < threshold) // ищем кластеры пока расстояние между ближайшими не станет больше допустимого
    {
        mergeClusters(closestClusters[0], closestClusters[1]);
        closestClusters = findClosestClusters();
    }   

    for (let i = 0; i < points.length; i++) // отрисовываем кластеры
    { 

        ctx.beginPath();// начало нового пути
        ctx.lineWidth = 3; // толщина обводки
        ctx.strokeStyle = colours[points[i].cluster +13] // цвет обводки
        // Координаты центра круга, радиус, начальный угол, конечный угол, направление по часовой стрелке
        ctx.arc(points[i].x+2, points[i].y+2, 10, 0, 2*3.14, false );
        ctx.stroke();
    }
    
    function findClosestClusters() 
    {
        let minDistance = 10000000;
        let closestClusters = [];

        for (let i = 0; i < clusters.length-1; i++) 
        {
            for (let j = i + 1; j < clusters.length; j++) 
            {
                for (let point1 of clusters[i]) 
                {
                    for (let point2 of clusters[j]) 
                    {
                        let dist = Math.sqrt(Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2))
                        if (dist < minDistance) {
                            minDistance = dist;
                            closestClusters = [i, j, minDistance];
                        }
                    }
                }
            }
        }
        return closestClusters
    }

    function mergeClusters(index1, index2) 
    {
        clusters[index1].push(...clusters[index2])
        clusters.splice(index2, 1);
        for (let point of clusters[index1]) 
        {
            point.cluster = index1
        }
        ammountOfClusters  = clusters.length
    }

}

setCanvasSize(width, height)
canvas.addEventListener("click", function(event) 
{
    const x = event.offsetX; // берем координаты поставленной точки
    const y = event.offsetY;

    for (let i = 0; i < points.length; i++) {
        
        if (Math.abs(points[i].x - x) < 10 && Math.abs(points[i].y - y) < 10){ // если точка поставлена на другую точку, то удаляем их
            points.splice(i, 1);
            drawPoints();
            return;
        }
    }

    points.push({x: x, y: y, cluster: undefined}); // если точка поставлена на пустое место, добавляем
    drawPoints();
});

function findClusters()
{
    dbscan(points,78,4)
    hierarchicalClustering(points,78)
    kMeans(points,ammountOfClusters)
       
}