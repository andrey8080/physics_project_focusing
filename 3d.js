import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Создаем сцену
let scene = new THREE.Scene();
scene.backgroung = new THREE.Color(0x123123);

let renderer = new THREE.WebGLRenderer();
renderer.setSize(1200, 1200);
document.body.appendChild(renderer.domElement);

let renderer1 = new THREE.WebGLRenderer();
renderer1.setSize(1200, 1200);
document.body.appendChild(renderer1.domElement);

let camera = new THREE.PerspectiveCamera(90, 1, 0.1, 2000);
camera.position.set(250, 500, 1000);
camera.lookAt(-0,-0,500);

let camera1 = new THREE.PerspectiveCamera(90, 1, 0.1, 2000);
let orbit = new OrbitControls(camera1, renderer1.domElement);
camera1.position.set(0, 0, 1500);
orbit.update()
camera1.lookAt(0,0,0);


function drawPlot(angle, color, percent) {
    for (let phi = 0.0; phi <= 2 * Math.PI; phi += 0.2) {
        let points = [];
        for (let t = 0; t <= 48.5 * percent; t += 0.5) {
            let x = getXt(particle_m, particle_u, angle, phi, particle_q, magnetic_field, t);
            let z = getZt(particle_u, angle, t);
            let y = getYt(particle_m, particle_u, angle, phi, particle_q, magnetic_field, t);
            points.push(new THREE.Vector3(x, y, z))
        }
        let geometry = new THREE.BufferGeometry().setFromPoints( points );
        let material = new THREE.LineBasicMaterial( { color: color } );
        let line = new THREE.Line( geometry, material )
        scene.add(line);
    }
}
 
function redraw() {
    let delay = 0;
    for (let percent = 0; percent <= 1; percent += 0.005) {
        setTimeout(() => {
            while(scene.children.length > 0){ 
                scene.remove(scene.children[0]); 
            }
        
            let axes =new THREE.AxesHelper(1000);
            scene.add(axes);
        
            let grid = new THREE.GridHelper(30);
            scene.add(grid);
        
            const boxGeometry = new THREE.BoxGeometry();
            const boxMaterial = new THREE.MeshBasicMaterial({color: 0xaaaaaa});
            const box = new THREE.Mesh(boxGeometry, boxMaterial);
            scene.add(box);
        
            particle_m = parseFloat(document.getElementById('particle_m').value) ?? 0.5;
            particle_u = parseFloat(document.getElementById('particle_u').value) ?? 20;
            particle_q = parseFloat(document.getElementById('partical_q').value) ?? 0.08;
            magnetic_field = parseFloat(document.getElementById('magnetic_field').value) ?? 0.3;
        
            drawPlot(parseFloat(document.getElementById('angle1').value), 0xAA557F, percent);
            drawPlot(parseFloat(document.getElementById('angle2').value), 0x55AA00, percent);
            drawPlot(parseFloat(document.getElementById('angle3').value), 0x00007F, percent);
        }, delay);
        delay += 20;
    }
}

redraw();
document.getElementById("angle1").addEventListener("change", function () {
    redraw();
})
document.getElementById("angle2").addEventListener("change", function () {
    redraw();
})
document.getElementById("angle3").addEventListener("change", function () {
    redraw();
})

function animate(time) {
    renderer.render(scene, camera);
    renderer1.render(scene, camera1)
}
renderer.setAnimationLoop(animate)