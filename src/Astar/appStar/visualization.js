import { flag } from "./animate.js";

export function visualizationMaze(matrix, height, width, heightField, widthField) {
    const heightItem = heightField / height;
    const widthItem = widthField / width;
    const field = document.querySelector('.field');

    for (let i = 0; i < height; i++) {
        const element = document.createElement('div');
        element.classList.add('block');
        element.style.display = 'flex';
        // element.style.border = '1px solid black';
        element.style.height = `${heightItem}px`;
        element.style.width = `${widthField}px`;
        element.style.boxSizing = 'border-box';
        field.appendChild(element);
        for (let j = 0; j < width; j++) {
            const childElement = document.createElement('div');
            childElement.classList.add('block__item');
            childElement.id = `${i}-${j}`;
            childElement.style.backgroundColor = matrix[i][j] == 1 ? 'red' : 'blue';
            // childElement.style.border = '1px solid black';
            childElement.style.width = `${widthItem}px`;
            childElement.style.height = `${heightItem}px`;
            element.appendChild(childElement);
        }
    }

    field.addEventListener('click', function(event) {
        const clickedBlock = event.target;
        if (clickedBlock.classList.contains('block__item') && flag == 0){
            const clickedBlockId = clickedBlock.id.split('-');
            const row = parseInt(clickedBlockId[0]);
            const col = parseInt(clickedBlockId[1]);
            if (matrix[row][col] === 1) {
                clickedBlock.style.backgroundColor = 'blue';
                matrix[row][col] = 0;
            } else {
                clickedBlock.style.backgroundColor = 'red';
                matrix[row][col] = 1;
            }
        }
        else{
            alert('Дождитесь завершения алгоритма!');
        }
    });
}