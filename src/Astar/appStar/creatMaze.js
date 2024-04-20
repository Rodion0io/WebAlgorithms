export function createMaze(width, height){
    let maze = [];
    for (let h = 0; h < height; h++){
        let row = [];
        for (let w = 0; w < width; w++){
            row.push(1);
        }
        maze.push(row);
    }

    let x = Math.floor(Math.random() * (width / 2)) * 2;
    let y = Math.floor(Math.random() * (height / 2)) * 2;
    maze[y][x] = 0;

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
                    if (y - 2 >= 0 && maze[y - 2][x] === 1) {
                        maze[y - 1][x] = 0;
                        maze[y - 2][x] = 0;
                        toCheck.push({ x: x, y: y - 2 });
                    }
                    break;
                case "S":
                    if (y + 2 < height && maze[y + 2][x] === 1) {
                        maze[y + 1][x] = 0;
                        maze[y + 2][x] = 0;
                        toCheck.push({ x: x, y: y + 2 });
                    }
                    break;
                case "E":
                    if (x - 2 >= 0 && maze[y][x - 2] === 1) {
                        maze[y][x - 1] = 0;
                        maze[y][x - 2] = 0;
                        toCheck.push({ x: x - 2, y: y });
                    }
                    break;
                case "W":
                    if (x + 2 < width && maze[y][x + 2] === 1) {
                        maze[y][x + 1] = 0;
                        maze[y][x + 2] = 0;
                        toCheck.push({ x: x + 2, y: y });
                    }
                    break;
            }
            directions.splice(dirIndex, 1);
        }
    }

    return maze;
}