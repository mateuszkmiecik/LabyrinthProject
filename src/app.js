import 'babel-polyfill';
import { bootstrap } from './bootstrap.js';
import domready from 'domready';
import THREE from 'three';


domready(() => {

    var stats = initStats();

    // create a scene, that will hold all our elements such as objects, cameras and lights.
    var scene = new THREE.Scene();

    // create a camera, which defines where we're looking at.
    var camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);

    // create a render and set the size
    var renderer = new THREE.WebGLRenderer();

    renderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0));  //background color and opacity
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled = true;   // false is default
    renderer.autoClear = true;          // default
    renderer.autoClearColor = true;     // default

    // create the ground plane
    var planeGeometry = new THREE.PlaneGeometry(50, 20, 1, 1);
    var planeMaterial = new THREE.MeshPhongMaterial({color: 0xffffff, side:THREE.DoubleSide});
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;

    // rotate and position the plane
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 15
    plane.position.y = 0
    plane.position.z = 0

    // add the plane to the scene
    scene.add(plane);

    // create a cube
    var cubeGeometry = new THREE.CubeGeometry(4, 4, 4);
    var cubeMaterial = new THREE.MeshLambertMaterial({color: 0xff0000});
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.castShadow = true;

    // position the cube
    cube.position.x = -4;
    cube.position.y = 3;
    cube.position.z = 0;

    // add the cube to the scene
    scene.add(cube);

    var sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
    var sphereMaterial = new THREE.MeshPhongMaterial({color: 0x7777ff});
    var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

    // position the sphere
    sphere.position.x = 50;
    sphere.position.y = 0;
    sphere.position.z = 2;
    sphere.castShadow = true;

    // add the sphere to the scene
    scene.add(sphere);

    // position and point the camera to the center of the scene
    camera.position.x = -5*2;
    camera.position.y = 20*2;
    camera.position.z = 55*2;
    camera.lookAt(new THREE.Vector3(10, 0, 0));

    // add subtle ambient lighting
    var ambiColor = "#0c0c0c";
    var ambientLight = new THREE.AmbientLight(ambiColor);
    scene.add(ambientLight);

    // add spotlight for the shadows
    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-20, 40, -40);
    spotLight.castShadow = true;
    spotLight.shadowCameraVisible = true;
    spotLight.shadowCameraFov = 20;
    spotLight.angle = 0.2;

    // add second spotlight for the shadows
    var spotLight2 = new THREE.SpotLight(0xffffff);
    spotLight2.position.set(50, 30, 0);
    spotLight2.castShadow = true;
    spotLight2.shadowCameraVisible = true;
    spotLight2.shadowCameraNear = 30;
//        spotLight2.shadowCameraFar = 100;
    spotLight2.shadowCameraFov = 20;
    spotLight2.angle = 0.4;


    var coneGeometry = new THREE.CylinderGeometry(0, 8, 80, 50, 50, false);
    var coneMaterial = new THREE.MeshLambertMaterial( { opacity:0.6, color: 0x44ff44,
        transparent:true } );
    var cone = new THREE.Mesh(coneGeometry, coneMaterial);

    cone.position.set(50-20*Math.sqrt(3), 30-20, 0);
    cone.rotation.z = 5*Math.PI/3;
    scene.add(cone);




    scene.add(spotLight);
    scene.add(spotLight2);

    // add the output of the renderer to the html element
    document.body.appendChild(renderer.domElement);

    // call the render function
    var step = 0;

    var controls = new function () {
        this.rotationSpeed = 0.02;
        this.bouncingSpeed = 0.03;
        this.ambientColor = ambiColor;
    };

    render();

    function render() {
        // rotate the cube around its axes
        cube.rotation.x += controls.rotationSpeed;
        cube.rotation.y += controls.rotationSpeed;
        cube.rotation.z += controls.rotationSpeed;

        // bounce the sphere up and down
        step += controls.bouncingSpeed;
        sphere.position.x = 20 + ( 10 * (Math.cos(step)));
        sphere.position.y = 2 + ( 10 * Math.abs(Math.sin(step)));

        // render using requestAnimationFrame
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }

    function initStats() {


    }


});

