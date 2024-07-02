import * as THREE from 'three';
import * as CANNON from 'cannon-es'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { spawnParticle } from "./utils/spawnParticle";
import { renderContainer } from "./utils/renderContainer";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
document.body.appendChild(renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement);

renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.z = 25;

const world = new CANNON.World({
    gravity: new CANNON.Vec3(0, -9.82, 0), // m/s²
})

//Sphere
const [sphereMesh, sphereBody] = spawnParticle(scene, world);

//Container
renderContainer(scene, world);

document.addEventListener('keydown', (e) => {
    console.log(sphereBody.velocity)
    switch (e.key) {
        case "ArrowUp":
            sphereBody.applyForce(new CANNON.Vec3(0, 100, 0));
            return;
        case "ArrowLeft":
            sphereBody.applyForce(new CANNON.Vec3(-100, 0, 0));
            return;
        case "ArrowRight":
            sphereBody.applyForce(new CANNON.Vec3(100, 0, 0));
            return;
        case "Shift":
            sphereBody.applyForce(new CANNON.Vec3(0, 0, 100));
            return;
        case "Control":
            sphereBody.applyForce(new CANNON.Vec3(0, 0, -100));
            return;
    }
})


// main loop
function animate() {
    //do physics
    world.fixedStep();
    sphereMesh.position.copy(sphereBody.position)
    sphereMesh.quaternion.copy(sphereBody.quaternion)
    
    //render
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);