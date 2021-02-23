const API = {
    lightProbeIntensity: 1.0,
    directionalLightIntensity: 0.2,
    envMapIntensity: 1
};

/**
 * Kleiner Random Generator
 */
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var scene = new THREE.Scene();

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor("#323334");
renderer.setSize(window.innerWidth, window.innerHeight);


const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
camera.position.set(-29.243477598548466, -83.1500518189078, 47.232276045688856);
camera.rotation.set(1.0542109430544344, -0.29677192660355917, 0.4754306248087563);


document.body.insertBefore(renderer.domElement, document.body.firstChild);
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();
});


var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

var geometry = new THREE.CylinderGeometry(8, 8, 1, 6);
var material = new THREE.MeshStandardMaterial({

    color: 0xADD8E6,
    metalness: 0.6,
    roughness: 0.6,

    envMapIntensity: API.envMapIntensity,

});
var mesh = new THREE.Mesh(geometry, material);


var offset = 0;
for (var y = -70; y < 200; y += 12) {

    if (!offset) {
        offset = 7;
    } else {
        offset = 0;
    }

    for (var x = -100; x < 200; x += 14) {

        var mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = x + offset;
        mesh.position.y = y;
        mesh.position.z = 0;
        mesh.rotation.x = 90 * Math.PI / 180;


        var tl = new TimelineMax({
            delay: 0.1,
            onComplete: function() {
                this.restart()
            }
        });
        tl.to(mesh.scale, getRndInteger(2, 10), { y: getRndInteger(4, 7), ease: Expo.easeOut })
        tl.to(mesh.scale, getRndInteger(3, 10), { y: 1, ease: Expo.easeOut })

        scene.add(mesh);
    }

}

const dirLight2 = new THREE.DirectionalLight(0x2694d4, 1, 1000);
dirLight2.position.set(10, 10, 15);
dirLight2.rotation.set(1.0542109430544344, -0.29677192660355917, 0.4754306248087563);
scene.add(dirLight2);


function onMouseMove(event) {
    event.preventDefault();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    var intersects = raycaster.intersectObjects(scene.children, true);
    for (var i = 0; i < intersects.length; i++) {
        this.tl = new TimelineMax();

        this.tl.to(intersects[i].object.rotation, 1, { z: -0.1, ease: Expo.easeOut })
        this.tl.to(intersects[i].object.rotation, 1, { z: 0, ease: Expo.easeOut })
    }
}

var render = function() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

render();

window.addEventListener('mousemove', onMouseMove);