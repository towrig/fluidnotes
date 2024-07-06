import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import Stats from 'stats.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { renderContainer } from "./utils/renderContainer";
import { createForceField } from "./utils/createForceField";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
document.body.appendChild(renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement);

//Stats
var stats = new Stats();
stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild( stats.dom );

renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.z = 25;

const world = new CANNON.World({
    gravity: new CANNON.Vec3(0, -9.82, 0)//new CANNON.Vec3(0, -9.82, 0), // m/s²
})

//Container
renderContainer(scene, world);


//Forcefield
//const forceField = createForceField();

//Particles
const particle_radius = 0.2;
const physicalParticles: CANNON.Body[] = [];
for (let i = -9; i < 9; i+=0.5) {
    for (let j = -9; j < 9; j+=0.5) {
        if (Math.random() > 0.33) {
            const sphereBody = new CANNON.Body({
                mass: 0.5, // kg
                shape: new CANNON.Sphere(particle_radius),
            });
            sphereBody.position.set(i, j, (Math.random()-0.5) * 18); // m
            world.addBody(sphereBody);
            physicalParticles.push(sphereBody)
            //particles.push(spawnParticle(scene, world, new CANNON.Vec3(i, j, (Math.random()-0.5) * 18)));
        }
    }
}
const geometry = new THREE.SphereGeometry(particle_radius);
const material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
const particlesMesh = new THREE.InstancedMesh(geometry, material, physicalParticles.length); //create instanced meshes, using the length of physical ones
scene.add(particlesMesh);

const targetPoint = new CANNON.Vec3(0, 0, 0)

document.addEventListener('keydown', (e) => {
    console.log({key: e.key});
    switch (e.key) {
        case "g":
            physicalParticles.forEach((particle) => {
                const forceVector = new CANNON.Vec3().copy(targetPoint).vsub(particle.position);
                const distanceToTarget = Math.abs(forceVector.length());
                forceVector.normalize();
                particle.applyForce(forceVector.scale(distanceToTarget * 10));
            })
            return;
    }
})


console.log("Particle count:", physicalParticles.length);

const updateParticleLocation = (index: number) => {
    const particleBody = physicalParticles[index];
    const dummy = new THREE.Object3D();
    dummy.position.copy(particleBody.position);
    dummy.quaternion.copy(particleBody.quaternion);
    dummy.updateMatrix();

    particlesMesh.setMatrixAt(index, dummy.matrix);
}


// main loop
function animate() {
    stats.begin();

    //do physics
    world.fixedStep();
    for (let i = 0; i < physicalParticles.length; i++) {
        updateParticleLocation(i);
    }
    particlesMesh.instanceMatrix.needsUpdate = true;
    
    //render
    renderer.render(scene, camera);

    stats.end();
}
renderer.setAnimationLoop(animate);