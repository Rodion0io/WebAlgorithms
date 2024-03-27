document.getElementById('generateButton').addEventListener('click', function() {
    const height = width = document.getElementById('inputSize').value;
    var matrix = createMaze(width, height);
    const field = document.querySelector('.field');
    field.innerHTML = '';
    visualizationMaze(matrix, height, width, heightField, widthField);
});