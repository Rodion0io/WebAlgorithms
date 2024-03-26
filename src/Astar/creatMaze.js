const heightField = 550;
const widthField = 550;
document.getElementById('generateButton').addEventListener('click', function() {
    const height = width = document.getElementById('inputSize').value;
    const field = document.querySelector('.field');
    field.innerHTML = '';
    visualizationMaze(height, width, heightField, widthField);
});

function createMaze(width, height) {
    let map = [];
    for (let h = 0; h < height; h++){
      let row = [];
      for (let w = 0; w < width; w++){
        row.push(1); 
      }
      map.push(row);
    }
  

    let x = Math.floor(Math.random() * (width / 2)) * 2;
    let y = Math.floor(Math.random() * (height / 2)) * 2;
    map[y][x] = 0;
  

    let toCheck = [];
    if (y - 2 >= 0) {
      toCheck.push({ x: x, y: y - 2 });
    }
    if (y + 2 < height) {
      toCheck.push({ x: x, y: y + 2 });
    }
    if (x - 2 >= 0) {
      toCheck.push({ x: x - 2, y: y });
    }
    if (x + 2 < width) {
      toCheck.push({ x: x + 2, y: y });
    }
  
    while (toCheck.length > 0) {
      let randomIndex = Math.floor(Math.random() * toCheck.length);
      let currentCell = toCheck[randomIndex];
      x = currentCell.x;
      y = currentCell.y;
      map[y][x] = 0; 
  

      let directions = ["N", "S", "E", "W"];
      while (directions.length > 0) {
        let dirIndex = Math.floor(Math.random() * directions.length);
        switch (directions[dirIndex]) {
          case "N":
            if (y - 2 >= 0 && map[y - 2][x] === 0) {
              map[y - 1][x] = 0;
              directions = [];
            }
            break;
          case "S":
            if (y + 2 < height && map[y + 2][x] === 0) {
              map[y + 1][x] = 0;
              directions = [];
            }
            break;
          case "E":
            if (x - 2 >= 0 && map[y][x - 2] === 0) {
              map[y][x - 1] = 0;
              directions = [];
            }
            break;
          case "W":
            if (x + 2 < width && map[y][x + 2] === 0) {
              map[y][x + 1] = 0;
              directions = [];
            }
            break;
        }
        directions.splice(dirIndex, 1);
      }
  

      if (y - 2 >= 0 && map[y - 2][x] === 1) {
        toCheck.push({ x: x, y: y - 2 });
      }
      if (y + 2 < height && map[y + 2][x] === 1) {
        toCheck.push({ x: x, y: y + 2 });
      }
      if (x - 2 >= 0 && map[y][x - 2] === 1) {
        toCheck.push({ x: x - 2, y: y });
      }
      if (x + 2 < width && map[y][x + 2] === 1) {
        toCheck.push({ x: x + 2, y: y });
      }
  
      toCheck.splice(randomIndex, 1);
    }
  
    return map;
}



function visualizationMaze(height, width, heightField, widthField) {
  const heightItem = heightField / height;
  const widthItem = widthField / width;
  const field = document.querySelector('.field');
  var matrix = createMaze(height, width);

  const canvas = document.createElement('canvas');
  canvas.width = widthField;
  canvas.height = heightField;
  field.appendChild(canvas);

  const ctx = canvas.getContext('2d');

  for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
          ctx.fillStyle = matrix[i][j] == 1 ? 'red' : 'blue';
          ctx.fillRect(j * widthItem, i * heightItem, widthItem, heightItem);
      }
  }

  function changeItemOfMatrix(height, width, firstCoordinate, secondCoordinate) {
      if (matrix[firstCoordinate][secondCoordinate] === 1) {
          matrix[firstCoordinate][secondCoordinate] = 0;
          return 0;
      } else {
          matrix[firstCoordinate][secondCoordinate] = 1;
          return 1;
      }
  }

  canvas.addEventListener('click', function(event) {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      
      const clickedBlockX = Math.floor(x / widthItem);
      const clickedBlockY = Math.floor(y / heightItem);

      if (changeItemOfMatrix(height, width, clickedBlockY, clickedBlockX)) {
          ctx.fillStyle = 'blue';
      } else {
          ctx.fillStyle = 'red';
      }
      
      ctx.fillRect(clickedBlockX * widthItem, clickedBlockY * heightItem, widthItem, heightItem);
  });
}