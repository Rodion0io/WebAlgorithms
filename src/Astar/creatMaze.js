const heightField = 550;
const widthField = 550;

document.getElementById('generateButton').addEventListener('click', function() {
    const height = width = document.getElementById('inputSize').value;
    var matrix = createMaze(width, height);
    const field = document.querySelector('.field');
    field.innerHTML = '';
    visualizationMaze(matrix, height, width, heightField, widthField);
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

function visualizationMaze(matrix, height, width, heightField, widthField) {
  const heightItem = heightField / height;
  const widthItem = widthField / width;
  const field = document.querySelector('.field');

  for (let i = 0; i < height; i++) {
    const element = document.createElement('div');
    element.classList.add('block');
    element.style.display = 'flex';
    element.style.border = '1px solid black';
    element.style.height = `${heightItem}px`;
    element.style.width = `${widthField}px`;
    field.appendChild(element);
    for (let j = 0; j < width; j++) {
      const childElement = document.createElement('div');
      childElement.classList.add('block__item');
      childElement.id = `${i}-${j}`;
      childElement.style.backgroundColor = matrix[i][j] == 1 ? 'red' : 'blue';
      childElement.style.width = `${widthItem}px`;
      childElement.style.height = `${heightItem}px`;
      element.appendChild(childElement);
    }
  }

  field.addEventListener('click', function(event) {
    const clickedBlock = event.target;
    if (clickedBlock.classList.contains('block__item')) {
      const clickedBlockId = clickedBlock.id.split('-');
      const row = parseInt(clickedBlockId[0]);
      const col = parseInt(clickedBlockId[1]);
      if (matrix[row][col] == 1) {
        clickedBlock.style.backgroundColor = 'blue';
        matrix[row][col] = 0;
      } else {
        clickedBlock.style.backgroundColor = 'red';
        matrix[row][col] = 1;
      }
    }
  });
}

function chooseStartPoint(matrix){
  let flag = 1
  const field = document.querySelector('.field');
  if (flag){
    field.addEventListener('click', function(event){
      event.stopPropagation();
      const clickedBlock = event.target;
      if (clickedBlock.classList == 'block__item'){
        const clickedBlockId = clickedBlock.id.split('-');
        const row = parseInt(clickedBlockId[0]);
        const column = parseInt(clickedBlockId[1]);
        clickedBlock.style.backgroundColor = 'yellow';
        matrix[row][column] = 2;
      }
    })
    flag = 0;
  }
}

function chooseEndPoint(matrix,event){
  let flag = 1
  const field = document.querySelector('.field');
  if (flag){
    field.addEventListener('click', function(event){
      event.stopPropagation();
      const clickedBlock = event.target;
      if (clickedBlock.classList == 'block__item'){
        const clickedBlockId = clickedBlock.id.split('-');
        const row = parseInt(clickedBlockId[0]);
        const column = parseInt(clickedBlockId[1]);
        clickedBlock.style.backgroundColor = 'green';
        matrix[row][column] = 3;
      }
    })
    flag = 0;
  }
}

document.getElementById('addStart').addEventListener('click', chooseStartPoint);

document.getElementById('addEnd').addEventListener('click', chooseEndPoint);