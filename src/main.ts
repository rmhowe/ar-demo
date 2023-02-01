import './style.css';

const container = document.getElementById('demo')!;
if (/android/i.test(navigator.userAgent)) {
  container.innerHTML = `
    <a href="intent://arvr.google.com/scene-viewer/1.0?file=https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Avocado/glTF/Avocado.gltf#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;S.browser_fallback_url=https://developers.google.com/ar;end;">
      <img src="/thumbnail.png" />
    </a>
  `;
} else if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
  container.innerHTML = `
    <a rel="ar" href="/MutantWaving.usdz">
      <img src="/thumbnail.png" />
    </a>`;
} else {
  showModel();
}

async function showModel() {
  const THREE = await import('three');
  const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js');
  const { OrbitControls } = await import('three/examples/jsm/controls/OrbitControls.js');

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x242424);
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const controls = new OrbitControls(camera, renderer.domElement);
  document.body.appendChild(renderer.domElement);
  const clock = new THREE.Clock();
  let mixer: THREE.AnimationMixer;

  const ambientLight = new THREE.AmbientLight(0x404040, 2);
  scene.add(ambientLight);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
  scene.add(directionalLight);

  camera.position.z = 5;
  controls.update();

  const loader = new GLTFLoader();
  loader.load(
    '/MutantWaving.glb',
    function (gltf) {
      scene.add(gltf.scene);

      mixer = new THREE.AnimationMixer(gltf.scene);
      gltf.animations.forEach((clip) => {
        mixer.clipAction(clip).play();
      });
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );

  function animate() {
    requestAnimationFrame(animate);

    controls.update();
    const delta = clock.getDelta();
    if (mixer) {
      mixer.update(delta);
    }

    renderer.render(scene, camera);
  }

  animate();
}
