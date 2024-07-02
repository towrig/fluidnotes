import * as THREE from 'three';
import * as CANNON from 'cannon-es'

export const spawnParticle = (scene: THREE.Scene, world: CANNON.World) => {
    //physical body
    const radius = 1; // m
    const sphereBody = new CANNON.Body({
        mass: 0.5, // kg
        shape: new CANNON.Sphere(radius),
    });
    sphereBody.position.set(0, 2, 0); // m
    world.addBody(sphereBody);

    //visual body
    const geometry = new THREE.SphereGeometry(radius);
    const material = new THREE.MeshNormalMaterial();
    const sphereMesh = new THREE.Mesh(geometry, material);
    scene.add(sphereMesh);

    return [sphereMesh, sphereBody];
}