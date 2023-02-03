import './style.css';

const showButton = window.location.href.includes('#show-button');
const container = document.getElementById('demo')!;
if (/android/i.test(navigator.userAgent)) {
  container.innerHTML = `
    <a ${
      showButton ? '' : 'style="visibility: hidden;"'
    } id="ar-link" href="intent://arvr.google.com/scene-viewer/1.0?file=https://rmhowe.github.io/ar-demo/MutantWaving.glb&mode=ar_preferred#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;S.browser_fallback_url=https://developers.google.com/ar;end;">
      <img src="./thumbnail.png" />
    </a>
  `;
  if (!showButton) {
    document.getElementById('ar-link')?.click();
  }
} else if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
  container.innerHTML = `
    <a ${
      showButton ? '' : 'style="visibility: hidden;"'
    } id="ar-link" rel="ar" href="./MutantWaving.usdz">
      <img src="./thumbnail.png" />
    </a>`;
  if (!showButton) {
    document.getElementById('ar-link')?.click();
  }
} else {
  showModel();
}

async function showModel() {
  const THREE = await import('three');
  const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js');
  const { OrbitControls } = await import('three/examples/jsm/controls/OrbitControls.js');

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
  });
  renderer.outputEncoding = THREE.LinearEncoding;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.physicallyCorrectLights = true;
  renderer.toneMapping = THREE.ReinhardToneMapping;
  renderer.toneMappingExposure = 5;
  renderer.setSize(window.innerWidth, window.innerHeight);
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x242424);
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const controls = new OrbitControls(camera, renderer.domElement);
  document.body.appendChild(renderer.domElement);
  const clock = new THREE.Clock();
  let mixer: THREE.AnimationMixer;

  const ambientLight = new THREE.AmbientLight(0x404040, 8);
  scene.add(ambientLight);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
  directionalLight.position.set(-1, 1, 0);
  scene.add(directionalLight);

  camera.position.set(0, 1, 3);
  controls.target = new THREE.Vector3(0, 1, 0);
  controls.update();

  const loader = new GLTFLoader();
  loader.load(
    `${import.meta.env.BASE_URL}MutantWaving.glb`,
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
