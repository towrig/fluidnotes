import * as THREE from 'three';
import * as CANNON from 'cannon-es'

export const renderContainer = (scene: THREE.Scene, world: CANNON.World) => {
    const geometry = new THREE.BoxGeometry(20, 20, 20);
    const material = new THREE.MeshNormalMaterial({ color: "0xffffff", wireframe: true });
    scene.add(new THREE.Mesh(geometry, material));

    //Constraint directions based on default camera orientation
    world.addBody(createConstraintBody(new CANNON.Vec3(-Math.PI / 2, 0, 0), new CANNON.Vec3(0, -11, 0))) //Ground
    world.addBody(createConstraintBody(new CANNON.Vec3(0, -Math.PI / 2, 0), new CANNON.Vec3(-11, 0, 0))) //Left
    world.addBody(createConstraintBody(new CANNON.Vec3(0, Math.PI / 2, 0), new CANNON.Vec3(11, 0, 0))) //Right
    world.addBody(createConstraintBody(new CANNON.Vec3(Math.PI / 2, 0, 0), new CANNON.Vec3(0, 11, 0))) //Top
    world.addBody(createConstraintBody(new CANNON.Vec3(0, 0, 0), new CANNON.Vec3(0, 0, 11))) //Front
    world.addBody(createConstraintBody(new CANNON.Vec3(0, 0, 0), new CANNON.Vec3(0, 0, -11))) //Back
}

const createConstraintBody = (angle: CANNON.Vec3, position: CANNON.Vec3) => {
    const halfExtents = new CANNON.Vec3(10, 10, 1)
    const boxShape = new CANNON.Box(halfExtents)
    const body = new CANNON.Body({
        type: CANNON.Body.STATIC,
        shape: boxShape,
        position: position,
    })
    body.quaternion.setFromEuler(angle.x, angle.y, angle.z)
    return body;
}