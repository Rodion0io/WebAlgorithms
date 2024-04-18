class Node {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.g = 0;
        this.h = 0;
        this.f = 0;
        this.parent = null;
    }
  
    toString() {
        return `${this.x},${this.y}`;
    }
  }
  
export function astar(start, end, matrix){
      const numRows = matrix.length;
      const numCols = matrix[0].length;
    
      const startNode = new Node(start[0], start[1]);
      const endNode = new Node(end[0], end[1]);
    
      const openList = [];
      openList.push(startNode);
    
      const closedSet = new Set();
      const exploredNodes = [];
    
      const dx = [0, 1, 0, -1]; 
      const dy = [-1, 0, 1, 0]; 
    
      while (openList.length > 0) {
          const current = openList.shift();
          exploredNodes.push(current);
    
          if (current.x === endNode.x && current.y === endNode.y) {
              const path = [];
              let currentPathNode = current;
              while (currentPathNode !== null) {
                  path.push([currentPathNode.x, currentPathNode.y]);
                  currentPathNode = currentPathNode.parent;
              }
              return { path: path.reverse(), exploredNodes: exploredNodes };
          }
    
          closedSet.add(current.toString());
    
          for (let i = 0; i < 4; i++) { 
              const nx = current.x + dx[i];
              const ny = current.y + dy[i];
              if (nx >= 0 && nx < numRows && ny >= 0 && ny < numCols && matrix[nx][ny] !== 1) {
                  const neighbor = new Node(nx, ny);
                  if (!closedSet.has(neighbor.toString())) {
                      const newG = current.g + matrix[nx][ny];
                      const existingNeighbor = openList.find(n => n.x === neighbor.x && n.y === neighbor.y);
                      if (existingNeighbor) {
                          if (newG < existingNeighbor.g) {
                              existingNeighbor.g = newG;
                              existingNeighbor.f = existingNeighbor.g + existingNeighbor.h;
                              existingNeighbor.parent = current;
                          }
                      } else {
                          neighbor.g = newG;
                          neighbor.h = Math.abs(endNode.x - neighbor.x) + Math.abs(endNode.y - neighbor.y);
                          neighbor.f = neighbor.g + neighbor.h;
                          neighbor.parent = current;
                          openList.push(neighbor);
                      }
                  }
              }
          }
    
          openList.sort((a, b) => a.f - b.f);
      }
    
      return {path: null, exploredNodes: exploredNodes};
    }