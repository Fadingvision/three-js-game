import * as THREE from 'three';
import { Renderer } from './components/Renderer';
import { Camera } from './components/Camera';
import { DirectionalLight } from './components/DirectionalLight';
import { initializePlayer, player } from './components/Player';
import { map, initializeMap } from './components/Map';
import { animateVehicles } from './animateVehicles';
import { animatePlayer } from './animatePlayer';
import './collectUserInput';
import './style.css';
import { hitTest } from './utils/hitTest';

const scene = new THREE.Scene();
scene.add(player);

const ambientLight = new THREE.AmbientLight();
scene.add(ambientLight);

const dirLight = DirectionalLight();
dirLight.target = player;
// 保证视角和灯光跟着玩家走
player.add(dirLight);

const camera = Camera();
// 保证视角和灯光跟着玩家走
player.add(camera);

const scoreDOM = document.getElementById('score');
const resultDOM = document.getElementById('result-container');

document.querySelector('#retry')?.addEventListener('click', initializeGame);

function initializeGame() {
  initializeMap();
  initializePlayer();

  // Initialize UI
  if (scoreDOM) scoreDOM.innerText = '0';
  if (resultDOM) resultDOM.style.visibility = 'hidden';
}
initializeGame();
scene.add(map);

const renderer = Renderer();

function animate() {
  animateVehicles();
  animatePlayer();
  hitTest();
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
