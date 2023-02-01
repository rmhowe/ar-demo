import './style.css';

const container = document.getElementById('demo')!;
if (/android/i.test(navigator.userAgent)) {
  container.innerHTML = `
    <a href="intent://arvr.google.com/scene-viewer/1.0?file=https://dl2.boxcloud.com/d/1/b1!LMXaEqiWr3cjiJa6QSw3c9Bi-Ra9sbjPTVZMf9QT4SKtmkE05zSqQuUubXRlmknvFjb1sqwKJdNMYxeG5VGLVwAkFZNOj7tQYmAkk7erfheIJmJBITo3o0YE65Ug8HI6y2IrwN4oBtbhuUTYaxOHBWAJfV-8_uD4M9iA61An6wdDOFiMpfnth0YLYuhsZZHOV1x4Yp75jZnqSRRNJ1tULiGULOCuBGFPrjF43Cte5J7TLbSjyMTIvV0VAlMExCWiZsCjlLJTOfufTIAmmmG0TTCJyT9qqYPUwfxc825p17lJsBh49sJLqpMGwhmyaikTV8FeDUPpJxRqJ1csZmcfnp7PMTwiSyxfxQf9JGaHPMSCYFsBJdUQSyKAjCDt6Tm9AL0QE7-FrCqISB1MUMwRHFlzWj3GLiIN0bmS_b8h1kHO-jqNtKNjVkEQU9NNifLlFDxjnN4CBJ-0Wy3n8uSxu11GEjbwMHKjWPQaJApXQpSz5yCBmIvF0TgMDNNxsyPtfThAh1XHZrK6ZvuNEyc9GEBP7hGVQfzoFSe1b8cqh2xaxT413oQNGaVHm0iMfxZuEt8emWkIThNKEdhA1QlBP-jwVz1cgJCS49HldcTvcArVVx_Z1rLOA9JNm7Rc1qeSZaDckQSJ__zPR3AEnp8-BeTiL9ef5zDrNCEI-Hll-crVBIO4MPzEqTt3-1Ex4u5y1aDRAV-Jqc1I0rP58TlI9MnPoNbwA-jmdnHla_exSLEYr5lL-DxdB3yMH5rge84lSEqswPWYr8uv8vz4VF8UdW6RqdB605IRuWfFwQmMeT0vno3oJTFuOcVGNPPi4sp34z5A7LaI--ezQ_p8nUlZlK4srcGZULUdpLAKfDWz4VrltSld9E4ZhleeI8vL9s3J9wZO7srfWIUXR6ySVJayfbA29x2RxI_k_2CzYtbFm0MFSr90cRdQLO816gjNZtKKH1CjlwVKpYaRMHIcnlT5qzYm8vgji84kVQzjU1vF2GNRw8Ma5ZMl4bBozt5VbBc4GccfEx77pUeQVzQ8r934q2s8hfZj6OHh1SiT8W75-Fc8nJX_7Z6Jcxjdc2VsEWpfBq6CIzpoiHTxkzJK-UXhIc1VfM0585MENtr6r0QjYr5JTVWNEBWrJkj6a0WEZcE_-ZX_eRWm45KnLjkwPdJe19_FHpbXd6sIKGBwZlYsa407xDfnziEmjS0CU6PSuF8YeujElYY8EAUjNxgXXNvBE_43I-FmFo4i8qGetxuZjMWzEdxwUcVRJEPk8XCrXnLfrBq9t2NzP8Lh/download&mode=ar_preferred#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;S.browser_fallback_url=https://developers.google.com/ar;end;">
      <img src="./thumbnail.png" />
    </a>
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
