import * as THREE from 'three';
import {
  player,
  position,
  movesQueue,
  stepCompleted,
} from './components/Player';
import { tileSize } from './constants';

const moveClock = new THREE.Clock(false);

export function animatePlayer() {
  if (!movesQueue.length) return;

  if (!moveClock.running) moveClock.start();

  // 跳转一步需要的总时间
  const stepTime = 0.2;
  // 用已经流逝的时间除以总时间，得到当前的百分百进度
  const progress = Math.min(1, moveClock.getElapsedTime() / stepTime);

  // 根据百分比设置位置
  setPosition(progress);
  setRotation(progress);

  // 上一步完成之后再进行下一步的命令读取
  if (progress >= 1) {
    stepCompleted();
    moveClock.stop();
  }
}

function setPosition(progress) {
  const startX = position.currentTile * tileSize;
  const startY = position.currentRow * tileSize;
  let endX = startX;
  let endY = startY;

  if (movesQueue[0] === 'left') endX -= tileSize;
  if (movesQueue[0] === 'right') endX += tileSize;
  if (movesQueue[0] === 'forward') endY += tileSize;
  if (movesQueue[0] === 'backward') endY -= tileSize;

  // 计算当前位置
  player.position.x = THREE.MathUtils.lerp(startX, endX, progress);
  player.position.y = THREE.MathUtils.lerp(startY, endY, progress);
  // 跳动效果
  player.children[0].position.z = Math.sin(progress * Math.PI) * 8;
}

function setRotation(progress) {
  let endRotation = 0;
  if (movesQueue[0] == 'forward') endRotation = 0;
  if (movesQueue[0] == 'left') endRotation = Math.PI / 2;
  if (movesQueue[0] == 'right') endRotation = -Math.PI / 2;
  if (movesQueue[0] == 'backward') endRotation = Math.PI;

  player.children[0].rotation.z = THREE.MathUtils.lerp(
    player.children[0].rotation.z,
    endRotation,
    progress
  );
}
