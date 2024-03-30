const heightField = 550;
const widthField = 550;
let matrix;
let flag = true;

document.getElementById('generateButton').addEventListener('click', function() {
    const height = width = document.getElementById('inputSize').value;
    matrix = createMaze(width, height);
    const field = document.querySelector('.field');
    field.innerHTML = '';
    visualizationMaze(matrix, height, width, heightField, widthField);
});

function createMaze(width, height) {
  let map = [];
  for (let h = 0; h < height; h++) {
      let row = [];
      for (let w = 0; w < width; w++) {
          row.push(1);
      }
      map.push(row);
  }

  let x = Math.floor(Math.random() * (width / 2)) * 2;
  let y = Math.floor(Math.random() * (height / 2)) * 2;
  map[y][x] = 0;

  let toCheck = [{ x: x, y: y }];
  
  while (toCheck.length > 0) {
      let currentCell = toCheck.pop();
      x = currentCell.x;
      y = currentCell.y;

      let directions = ["N", "S", "E", "W"];
      while (directions.length > 0) {
          let dirIndex = Math.floor(Math.random() * directions.length);
          switch (directions[dirIndex]) {
              case "N":
                  if (y - 2 >= 0 && map[y - 2][x] === 1) {
                      map[y - 1][x] = 0;
                      map[y - 2][x] = 0;
                      toCheck.push({ x: x, y: y - 2 });
                  }
                  break;
              case "S":
                  if (y + 2 < height && map[y + 2][x] === 1) {
                      map[y + 1][x] = 0;
                      map[y + 2][x] = 0;
                      toCheck.push({ x: x, y: y + 2 });
                  }
                  break;
              case "E":
                  if (x - 2 >= 0 && map[y][x - 2] === 1) {
                      map[y][x - 1] = 0;
                      map[y][x - 2] = 0;
                      toCheck.push({ x: x - 2, y: y });
                  }
                  break;
              case "W":
                  if (x + 2 < width && map[y][x + 2] === 1) {
                      map[y][x + 1] = 0;
                      map[y][x + 2] = 0;
                      toCheck.push({ x: x + 2, y: y });
                  }
                  break;
          }
          directions.splice(dirIndex, 1);
      }
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

function checkStartPoint(matrix, height, width){
  let randomValue = Math.floor(Math.random() * 2) + 1;
  for (let i = 0; i < height; i++){
    for (let j = 0; j < width; j++){
      if (matrix[i][j] == 2){
        matrix[i][j] = randomValue;
        block = document.getElementById(`${i}-${j}`);
        block.style.backgroundColor = matrix[i][j] == 1 ? 'red' : 'blue';
      }
    }
  }
}

function checkEndPoint(matrix, height, width){
  let randomValue = Math.floor(Math.random() * 2) + 1;
  for (let i = 0; i < height; i++){
    for (let j = 0; j < width; j++){
      if (matrix[i][j] == 3){
        matrix[i][j] = randomValue;
        block = document.getElementById(`${i}-${j}`);
        block.style.backgroundColor = matrix[i][j] == 1 ? 'red' : 'blue';
      }
    }
  }
}

function chooseStartPoint(matrix){
  const field = document.querySelector('.field');
  const height = matrix.length;
  const width = matrix[0].length;
  checkStartPoint(matrix, height, width);
  field.addEventListener('click', eventChoosePoint);
  function eventChoosePoint(event){
    const clickedBlock = event.target;
    if (clickedBlock.classList.contains('block__item')){
      const clickedBlockId = clickedBlock.id.split('-');
      const row = parseInt(clickedBlockId[0]);
      const column = parseInt(clickedBlockId[1]);
      clickedBlock.style.backgroundColor = 'yellow';
      matrix[row][column] = 2;
      field.removeEventListener('click', eventChoosePoint);
    }
  }
  // field.addEventListener('click', eventChoosePoint(matrix));
}

function chooseEndPoint(matrix){
  const field = document.querySelector('.field');
  const height = matrix.length;
  const width = matrix[0].length;
  checkEndPoint(matrix, height, width);
  field.addEventListener('click', eventChoosePoint);
  function eventChoosePoint(event){
    const clickedBlock = event.target;
    if (clickedBlock.classList.contains('block__item')){
      const clickedBlockId = clickedBlock.id.split('-');
      const row = parseInt(clickedBlockId[0]);
      const column = parseInt(clickedBlockId[1]);
      clickedBlock.style.backgroundColor = 'green';
      matrix[row][column] = 3;
      field.removeEventListener('click', eventChoosePoint);
    }
  }
  // field.addEventListener('click', eventChoosePoint(matrix));
} 

document.getElementById('addStart').addEventListener('click', function() {

  chooseStartPoint(matrix)
});

document.getElementById('addEnd').addEventListener('click', function() {
  chooseEndPoint(matrix)
});

