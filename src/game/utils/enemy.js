export function createEnemy(startPos) {
    return {
        x: startPos.x,
        y: startPos.y,
        radius: 10,
        speed: 60,
        pathIndex: 0,
    };
};