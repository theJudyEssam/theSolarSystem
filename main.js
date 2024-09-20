import './style.css'
import * as THREE from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import mercurytext from "./textures/mercury.png"
import suntext from "./textures/sun.png"
import venustext from "./textures/venus.png"
import earthtext from "./textures/earth.png"
import marstext from "./textures/mars.png"
import jupitertext from "./textures/jupiter.png"
import saturntext from "./textures/saturn.png"
import uranustext from "./textures/uranus.png"
import neptunetext from "./textures/neptune.png"
import plutotext from "./textures/pluto.png"
import saturnringtext from "./textures/saturn_ring.png"

//the canvas and the renderer
const canvas = document.querySelector("#solar")
const renderer = new THREE.WebGLRenderer({antialias:true, canvas})

//this is the camera setup, i am using a Perspective Camera
const camera = new THREE.PerspectiveCamera(70,window.innerWidth/window.innerHeight, 0.2, 1000);
camera.position.z = 4

//the scene and the loader
const scene= new THREE.Scene();
const Sunloader = new THREE.TextureLoader();


//this is the sun texture
const sunTexture = Sunloader.load(suntext)
sunTexture.colorSpace = THREE.SRGBColorSpace;

const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);


//this is the sun, no need for light as it is light
const Sungeometry = new THREE.SphereGeometry( 16, 30, 30 ); 
const Sunmaterial = new THREE.MeshBasicMaterial( {map: sunTexture,} ); 
const Sun = new THREE.Mesh( Sungeometry, Sunmaterial ); scene.add( Sun );
scene.add(Sun)

function new_planet(size,texture,position, ring){
    const orbitgeo = new THREE.RingGeometry(
        position, position+0.1, 35
    )
    const orbitmat = new THREE.MeshBasicMaterial({color:0xffffff})
    const orbit = new THREE.Mesh(orbitgeo, orbitmat);
    orbit.rotation.x =  -0.5 * Math.PI;
    const loader = new THREE.TextureLoader();
    const Texture= loader.load(texture);
    Texture.colorSpace = THREE.SRGBColorSpace;

    const geometry =  new THREE.SphereGeometry( size, 30, 30 );
    const material =  new THREE.MeshStandardMaterial({map:Texture})
    const planet = new THREE.Mesh(geometry,material);
    const planetObj = new THREE.Object3D();
    planet.position.x = position;

    if(ring) {
        const ringGeo = new THREE.RingGeometry(
            ring.innerRadius,
            ring.outerRadius,
            32);
        const ringMat = new THREE.MeshBasicMaterial({
            map: loader.load(ring.texture),
            side: THREE.DoubleSide
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        planetObj.add(ringMesh);
        ringMesh.position.x = position;
        ringMesh.rotation.x = -0.5 * Math.PI;
    }
    
    planetObj.add(orbit)
    planetObj.add(planet)
    scene.add(planetObj)

    return {planet, planetObj}

}

// const mercLoader= new THREE.TextureLoader();
// const mercTexture = mercLoader.load(mercurytext)
// mercTexture.colorSpace = THREE.SRGBColorSpace; 

// const Mercgeometry = new THREE.SphereGeometry( 4, 30, 30 );
// const MercMat = new THREE.MeshBasicMaterial({map:mercTexture}) 
// const Mercury = new THREE.Mesh(Mercgeometry, MercMat);
// const MercObj = new THREE.Object3D();
// Mercury.position.x = 28;


// MercObj.add(Mercury);
// scene.add(MercObj)

const mercury = new_planet(4, mercurytext,28);
const venus= new_planet(4, venustext,40)
const earth = new_planet(4, earthtext,55)
const mars = new_planet(2, marstext, 60)
const jupiter = new_planet(6, jupitertext, 70);
const saturn = new_planet(5, saturntext, 80,{
    innerRadius: 6,
    outerRadius: 10,
    texture: saturnringtext
} );
const uranus = new_planet(5, uranustext, 85);
const neptune = new_planet(5, neptunetext, 90);
const pluto = new_planet(5, plutotext, 100);



// this is for the animation
function render(time){
    time *= 0.001;
   
    const rot = time ;
    Sun.rotation.y = rot * 0.1
    mercury.planet.rotation.y = rot;
    venus.planet.rotation.y = rot*0.5;
    earth.planet.rotation.y = rot*0.6;
    jupiter.planet.rotation.y = rot*0.7;
    saturn.planet.rotation.y = rot*0.8;
    uranus.planet.rotation.y = rot*0.9;
    neptune.planet.rotation.y = rot*1.1;
    pluto.planet.rotation.y = rot*1.5;


    mercury.planetObj.rotation.y=rot
    venus.planetObj.rotation.y = rot*0.5;
    earth.planetObj.rotation.y = rot* 0.6;
    mars.planetObj.rotation.y = rot * 0.7;
    jupiter.planetObj.rotation.y = rot * 0.9;
    saturn.planetObj.rotation.y = rot*1.1;
    uranus.planetObj.rotation.y = rot*1.3;
    neptune.planetObj.rotation.y = rot*1.4;
    pluto.planetObj.rotation.y = rot*1.6;




    renderer.render(scene, camera);
   
    requestAnimationFrame(render);
  }
requestAnimationFrame(render);


function addStar(){
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({color:0xffffff})
    const star = new THREE.Mesh(geometry, material);
  
    const [x,y,z] = Array(3).fill().map(()=>THREE.MathUtils.randFloatSpread(500));
    star.position.set(x,y,z);
    scene.add(star)
  }
  
  Array(200).fill().forEach(addStar)
//for controlling the orbit
const controls = new OrbitControls(camera, renderer.domElement);

const pointLight = new THREE.PointLight(0xFFFFFF, 20000, 3000);
scene.add(pointLight);

//rendering and camera position
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(100)
renderer.render(scene, camera)




//todo
/*
1. add the rest of the planets [done]
2. add point light
3. add stars
4. add the right sizes
5. add the orbit
6. add the near-earth objects
7. add the menu
8. add the info for each planet

*/