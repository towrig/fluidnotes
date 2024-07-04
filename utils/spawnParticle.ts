import * as THREE from 'three';
import * as CANNON from 'cannon-es'
import { color } from 'three/examples/jsm/nodes/Nodes.js';

export const spawnParticles = (scene: THREE.Scene, world: CANNON.World, pos: CANNON.Vec3) => {
    //physical body
    const radius = 0.1; // m
    const sphereBody = new CANNON.Body({
        mass: 0.5, // kg
        shape: new CANNON.Sphere(radius),
    });
    sphereBody.position.set(pos.x, pos.y, pos.z); // m
    world.addBody(sphereBody);

    //visual body
    const geometry = new THREE.SphereGeometry(radius);
    const material = new THREE.MeshBasicMaterial({ color: "0xFFFF00"});
    const sphereMesh = new THREE.InstancedMesh(geometry, material, 1000);
    scene.add(sphereMesh);

    return [sphereMesh, sphereBody];
}