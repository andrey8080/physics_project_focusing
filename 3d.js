// Создаем сцену
let scene = new THREE.Scene();
scene.backgroung = new THREE.Color(0x123123)

// Создаем камеру
let camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight,  1 , 1000);
camera.position.z = 5;

// Создаем рендерер
let renderer = new THREE.WebGLRenderer();
renderer.setSize(600, 600);
document.body.appendChild(renderer.domElement);

let axes =new THREE.AxesHelper(5);
scene.add(axes);

const points = [
    
]


function animate(t) {
            let time = t / 1000;
            camera.position.set(
                Math.sin(time) * 70,
                70,
                Math.cos(time) * 70);
            camera.lookAt(0,0,0);
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate(0);
