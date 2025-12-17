import { Canvas, Circle, Path, Skia } from "@shopify/react-native-skia";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { GAME_HEIGHT, GAME_WIDTH, TILE_SIZE } from "../game/data/constants";
import { MAIN_PATH } from "../game/data/path";
import { pathToPixels } from "../game/utils/path";

export default function GameCanvas() {
  const pathPoints = pathToPixels(MAIN_PATH);

  // --- Enemy state ---
  const [enemyPos, setEnemyPos] = useState({
    x: pathPoints[0]?.x || 0,
    y: pathPoints[0]?.y || 0,
    pathIndex: 0,
  });

  const ENEMY_SPEED = 80;

  // --- Game loop ---
  useEffect(() => {
    let animationFrame;

    const tick = () => {
      const { x, y, pathIndex } = enemyPos;

      if (!pathPoints[pathIndex + 1]) return;

      const target = pathPoints[pathIndex + 1];
      const dx = target.x - x;
      const dy = target.y - y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      let newX = x;
      let newY = y;
      let newIndex = pathIndex;

      if (distance < 1) {
        newX = target.x;
        newY = target.y;
        newIndex = pathIndex + 1;
      } else {
        const step = ENEMY_SPEED * (16 / 1000);
        newX += (dx / distance) * step;
        newY += (dy / distance) * step;
      }

      setEnemyPos({ x: newX, y: newY, pathIndex: newIndex });

      animationFrame = requestAnimationFrame(tick);
    };

    animationFrame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrame);
  }, [enemyPos, pathPoints]);

  // --- Render ---
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Canvas style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}>
        {/* GRID */}
        {(() => {
          const gridPath = Skia.Path.Make();
          for (let x = 0; x <= GAME_WIDTH; x += TILE_SIZE) {
            gridPath.moveTo(x, 0);
            gridPath.lineTo(x, GAME_HEIGHT);
          }
          for (let y = 0; y <= GAME_HEIGHT; y += TILE_SIZE) {
            gridPath.moveTo(0, y);
            gridPath.lineTo(GAME_WIDTH, y);
          }
          return <Path path={gridPath} color="red" style="stroke" strokeWidth={1} />;
        })()}

        {/* PATH */}
        {pathPoints.length > 0 && (() => {
          const skiaPath = Skia.Path.Make();
          skiaPath.moveTo(pathPoints[0].x, pathPoints[0].y);
          pathPoints.slice(1).forEach(p => skiaPath.lineTo(p.x, p.y));
          return (
            <Path
              path={skiaPath}
              color="rgba(255,215,0,0.8)"
              style="stroke"
              strokeWidth={5}
              strokeCap="round"
              strokeJoin="round"
            />
          );
        })()}

        {/* ENEMY */}
        <Circle cx={enemyPos.x} cy={enemyPos.y} r={10} color="crimson" />
      </Canvas>
    </View>
  );
}
