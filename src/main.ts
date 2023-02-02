import './style.css';

const container = document.getElementById('demo')!;
if (/android/i.test(navigator.userAgent)) {
  container.innerHTML = `
    <a href="intent://arvr.google.com/scene-viewer/1.0?file=https://dl2.boxcloud.com/d/1/b1!V8IdHRAMy_xUh6MnQRaj4r4-DnwOV81B3vH71II_Ixt6qtvXd0NRPidjaKZWTMUkbGvAdtqydFQ2IDvxD391B3J6guwb174iY6mSOlOUwPljWOnxcQTTdue6Bi8bEsU0vfngcRr4h4lFhlMjvumIrSgEIrGCeWrqwjJ4yVp82pYgFdlTu4agaEh0X2hDrETZkZ01Q7eHSH0HqW7pHJISBSkKkrZZYWwSFD7GgWxdEfz44RRM3YSWbvDtUoFDpc5F3Zl8PcRQ6FtJa5e5lr7rFOU2XpEuQo-5WLx-KhQ6R3JzLkxlfXKMY00_5B4efkvycIEljLDWcW2JN2Ub_0Bf4shZVkUae2h7OLAcwHxqcu06jFH64P8eYQtlhY0UKmpHolXN8PUSesSYJz3VRBW-NoS2l38XjIQP0z3DGGjYIL38YTm9MdWjGdQq1KZQz8IIM9o3pAupqn5aa7PffU3si5At0AcnBM3EXP507HVoI56pdLmafFC4QrbK2o-DjrA5fT62dfC4VkanbtWOGG0mxZrUxh7TTIRwceiFduCmjOLBniPpHEJzxFcHPhWXbdqgvWsIMbqaUQRy3b1abz1CgVBIZbxk2fP_5hZpQuaQ58IVv-UceB8fot0NdXhrQqLAIy8l7wR_rNMqYe0xc-jIeIuKvj-IYFW6CklXd708ED22b1xWHlXV305JHAjhZnOrVM-sRxjAxEgvtM3IoXQ8yYb6JQ6MsFmddua_oxnZDtkFwNyDY3lHDkqKG9vNAgUVSX4AvM03st8obiS8VAUeCWuNoBgebGlJ2JhYuu3FzPGpF5tNLQ4y4j0MtiL9VaCMXMBG1Tb9FyWdKkGqOtvaQ2QP-blQ8VHSNdDsZRfCYvltoT1mS4gIXwpMSGgm9Ag1tsdCPJJN2j7SCJYgU3lRMoly_lYzAr9IT1-cz8iqg_CGnWTqmfC737X-AwWYKU1OiPpQELZtzqOsIhLTmWP8RpTNc-mUnY3-JSlKflKJTyrM5-iT9CjXD5hw2IOpIeA4VcE9xyKiWzIpoHi1DXhRTRwHewPRxAksgJrvtoUBZlUoghw_XNVMy5DlV1Uh15FVrfez6OcyIY4fZCkSwJEVfvT0CiqQCtOH20UvufWBykpXcoKsDr6v5jd5F8hC2cngQdJr9mCehuAqFVfLlpgd1bJCIyJ3yalroT6-3WskuMIkSFpSsWj0rAxk1IC1c7RQkDPwQMRUOtB0fdWVMDCsOyGhGvCOVMiKAQYq7TBLeGmw15zFlfZlSi1cCPQjgZsWjRjmi95Bid5ih2TGbegk7o2imt7e/download&mode=ar_preferred#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;S.browser_fallback_url=https://developers.google.com/ar;end;">
      <img src="./thumbnail.png" />
    </a>
    <p>Tap the model to see it in AR</p>
  `;
} else if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
  container.innerHTML = `
    <a rel="ar" href="./MutantWaving.usdz">
      <img src="./thumbnail.png" />
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
