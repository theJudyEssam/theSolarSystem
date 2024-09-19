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

//this is the sun, no need for light as it is light
const Sungeometry = new THREE.SphereGeometry( 16, 30, 30 ); 
const Sunmaterial = new THREE.MeshBasicMaterial( {map: sunTexture,} ); 
const Sun = new THREE.Mesh( Sungeometry, Sunmaterial ); scene.add( Sun );
scene.add(Sun)

function new_planet(size,texture,position){
    const loader = new THREE.TextureLoader();
    const Texture= loader.load(texture);
    Texture.colorSpace = THREE.SRGBColorSpace;

    const geometry =  new THREE.SphereGeometry( size, 30, 30 );
    const material =  new THREE.MeshBasicMaterial({map:Texture})
    const planet = new THREE.Mesh(geometry,material);
    const planetObj = new THREE.Object3D();
    planet.position.x = position;
    
    planetObj.add(planet)
    scene.add(planetObj)

    return {planet, planetObj}

}

const mercLoader= new THREE.TextureLoader();
const mercTexture = mercLoader.load(mercurytext)
mercTexture.colorSpace = THREE.SRGBColorSpace; 

const Mercgeometry = new THREE.SphereGeometry( 4, 30, 30 );
const MercMat = new THREE.MeshBasicMaterial({map:mercTexture}) 
const Mercury = new THREE.Mesh(Mercgeometry, MercMat);
const MercObj = new THREE.Object3D();
Mercury.position.x = 28;


MercObj.add(Mercury);
scene.add(MercObj)

const venus= new_planet(4, venustext,40)
const earth = new_planet(4, earthtext,55)
const mars = new_planet(2, marstext, 60)
const jupiter = new_planet(6, jupitertext, 70);
const saturn = new_planet(5, saturntext, 80 )
const pointLight = new THREE.PointLight(0xFFFFFF, 2, 300);
scene.add(pointLight);

// const color = 0xFFFFFF;
// const intensity = 3;

// const light = new THREE.DirectionalLight(color, intensity);
// light.position.set(-4, 2, 4)

// const light2 = new THREE.DirectionalLight(color, intensity)
// light2.position.set(2, -2, -4)
// scene.add(light)
// scene.add(light2)

// this is for the animation
function render(time){
    time *= 0.001;
   
    const rot = time ;
    Sun.rotation.y = rot * 0.1
    Mercury.rotation.y = rot;
    MercObj.rotation.y=rot
    venus.planetObj.rotation.y = rot*0.5;
    earth.planetObj.rotation.y = rot* 0.6;
    mars.planetObj.rotation.y = rot * 0.7;
    jupiter.planetObj.rotation.y = rot * 0.9;
    saturn.planetObj.rotation.y = rot*1.1;
    


    renderer.render(scene, camera);
   
    requestAnimationFrame(render);
  }
requestAnimationFrame(render);

//for controlling the orbit
const controls = new OrbitControls(camera, renderer.domElement);



//rendering and camera position
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(100)
renderer.render(scene, camera)