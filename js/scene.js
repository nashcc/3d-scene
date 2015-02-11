(function(){
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(
    75,                                     //Field of View
    window.innerWidth / window.innerHeight, //aspect ratio
    0.1,                                    //near clipping plane
    1000                                    //far clipping plane
  );

  camera.position.set( 25, 20, 25 );
  camera.lookAt(new THREE.Vector3( 0, 7, 0 ));
  scene.add( camera );

  var renderer = new THREE.WebGLRenderer({
    antialias: true //smooth
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  renderer.shadowMapEnabled = true;
  renderer.shadowMapSoft = true;

  var cubeGeometry = new THREE.BoxGeometry(6, 6, 6);
  var cubeMaterial = new THREE.MeshLambertMaterial();
  var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.position.y = 3;

  scene.add(cube);

  //ground plane
  var planeGeometry = new THREE.PlaneBufferGeometry( 100, 100, 100 );
  var planeTexture = THREE.ImageUtils.loadTexture('images/wood.jpg');
  planeTexture.wrapS = planeTexture.wrapT = THREE.RepeatWrapping;
  planeTexture.repeat.set(5, 5);
  var planeMaterial = new THREE.MeshLambertMaterial({map: planeTexture});
  var plane = new THREE.Mesh( planeGeometry, planeMaterial );
  plane.rotation.x = -Math.PI/2;
  scene.add(plane);


  //light
  var ambientLight = new THREE.AmbientLight( 0x444444 );
  scene.add( ambientLight );

  directionalLight = new THREE.DirectionalLight( 0xFFFFFF );
  directionalLight.position.set( 20, 30, -5 );
  directionalLight.target.position.copy( scene.position );
  directionalLight.castShadow = true;
  directionalLight.shadowCameraLeft = -30;
  directionalLight.shadowCameraTop = -30;
  directionalLight.shadowCameraRight = 30;
  directionalLight.shadowCameraBottom = 30;
  directionalLight.shadowCameraNear = 20;
  directionalLight.shadowCameraFar = 200;
  directionalLight.shadowBias = -0.001;
  directionalLight.shadowMapWidth = directionalLight.shadowMapHeight = 2048;
  directionalLight.shadowDarkness = 0.5;
  scene.add( directionalLight );

  //shadow
  cube.receiveShadow = true;
  cube.castShadow = true;
  ambientLight.castShadow = true;
  plane.receiveShadow = true;

  var render = function() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  };

  render();

})();
