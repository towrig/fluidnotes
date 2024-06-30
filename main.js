import * as THREE from 'three';
import * as CANNON from 'cannon-es'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
document.body.appendChild(renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement);

renderer.setSize(window.innerWidth, window.innerHeight);

/*
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );
*/
camera.position.z = 20;

const world = new CANNON.World({
    gravity: new CANNON.Vec3(0, -9.82, 0), // m/s²
})

//Sphere
const radius = 1; // m
const sphereBody = new CANNON.Body({
    mass: 0.5, // kg
    shape: new CANNON.Sphere(radius),
})
sphereBody.position.set(0, 2, 0) // m
world.addBody(sphereBody)
const geometry = new THREE.SphereGeometry(radius)
const material = new THREE.MeshNormalMaterial()
const sphereMesh = new THREE.Mesh(geometry, material)
scene.add(sphereMesh)

//Ground
const groundBody = new CANNON.Body({
    type: CANNON.Body.STATIC,
    shape: new CANNON.Plane(),
    position: new CANNON.Vec3(0, -10, 0),
})
groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0) // make it face up
world.addBody(groundBody)

document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case "ArrowUp":
            sphereBody.applyLocalForce(new CANNON.Vec3(0, 100, 0));
            return;
        case "ArrowLeft":
            sphereBody.applyLocalForce(new CANNON.Vec3(-100, 0, 0));
            return;
        case "ArrowRight":
            sphereBody.applyLocalForce(new CANNON.Vec3(100, 0, 0));
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