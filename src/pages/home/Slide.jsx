
import { useEffect, useRef } from "react";
import * as THREE from "three";

import one from "../../assets/managedoffices.jpg";
import two from "../../assets/meeting.jpg";
import three from "../../assets/privatecabin.jpg";

// Simple easing function to replace GSAP
const easeInOutExpo = (t) => {
  return t === 0
    ? 0
    : t === 1
    ? 1
    : t < 0.5
    ? Math.pow(2, 20 * t - 10) / 2
    : (2 - Math.pow(2, -20 * t + 10)) / 2;
};

export default function Slide() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const el = containerRef.current;
    const inner = document.createElement("div");
    inner.className = "slider__inner js-slider__inner";
    el.appendChild(inner);

    const images = [
      one,
      two,
      three
    ];

    let renderer;
    let scene;
    let camera;
    let textures = [];
    let disp;
    let mat;
    let intervalId;
    let animationId;
    let isTransitioning = false;

    const data = {
      current: 0,
      next: 1,
      total: images.length,
    };

    const vert = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const frag = `
      varying vec2 vUv;
      uniform sampler2D texture1;
      uniform sampler2D texture2;
      uniform sampler2D disp;
      uniform float dispPower;
      uniform float intensity;

      void main() {
        vec2 uv = vUv;
        vec4 disp = texture2D(disp, uv);
        vec2 dispVec = vec2(disp.x, disp.y);
        vec2 distPos1 = uv + (dispVec * intensity * dispPower);
        vec2 distPos2 = uv + (dispVec * -(intensity * (1.0 - dispPower)));
        vec4 _texture1 = texture2D(texture1, distPos1);
        vec4 _texture2 = texture2D(texture2, distPos2);
        gl_FragColor = mix(_texture1, _texture2, dispPower);
      }
    `;

    function setup() {
      scene = new THREE.Scene();

      const width = el.offsetWidth;
      const height = el.offsetHeight;

      camera = new THREE.OrthographicCamera(
        width / -2,
        width / 2,
        height / 2,
        height / -2,
        1,
        1000
      );
      camera.lookAt(scene.position);
      camera.position.z = 1;

      renderer = new THREE.WebGLRenderer({ alpha: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(width, height);
      inner.appendChild(renderer.domElement);
    }

    function loadTextures(callback) {
      const loader = new THREE.TextureLoader();
      loader.crossOrigin = "";
      let loadedCount = 0;
      const totalToLoad = images.length + 1; // images + displacement map

      const onLoad = () => {
        loadedCount++;
        if (loadedCount === totalToLoad) {
          callback();
        }
      };

      images.forEach((img) => {
        const texture = loader.load(img + "?v=" + Date.now(), onLoad);
        texture.minFilter = THREE.LinearFilter;
        texture.generateMipmaps = false;
        textures.push(texture);
      });

      disp = loader.load(
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/58281/rock-_disp.png",
        onLoad
      );
      disp.magFilter = disp.minFilter = THREE.LinearFilter;
      disp.wrapS = disp.wrapT = THREE.RepeatWrapping;
    }

    function createMesh() {
      mat = new THREE.ShaderMaterial({
        uniforms: {
          dispPower: { value: 0.0 },
          intensity: { value: 0.5 },
          texture1: { value: textures[data.current] },
          texture2: { value: textures[data.next] },
          disp: { value: disp },
        },
        transparent: true,
        vertexShader: vert,
        fragmentShader: frag,
      });

      const geometry = new THREE.PlaneGeometry(
        el.offsetWidth,
        el.offsetHeight,
        1
      );

      const mesh = new THREE.Mesh(geometry, mat);
      scene.add(mesh);
    }

    function render() {
      renderer.render(scene, camera);
    }

    function animate(startTime, duration) {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easedProgress = easeInOutExpo(progress);
      mat.uniforms.dispPower.value = easedProgress;

      render();

      if (progress < 1) {
        animationId = requestAnimationFrame(() => animate(startTime, duration));
      } else {
        mat.uniforms.dispPower.value = 0.0;
        data.current = data.next;
        data.next = (data.current + 1) % data.total;

        mat.uniforms.texture1.value = textures[data.current];
        mat.uniforms.texture2.value = textures[data.next];

        render();
        isTransitioning = false;
      }
    }

    function transitionNext() {
      if (isTransitioning) return;

      isTransitioning = true;
      const startTime = Date.now();
      const duration = 2500;

      animate(startTime, duration);
    }

    function nextSlide() {
      transitionNext();
    }

    setup();
    loadTextures(() => {
      createMesh();
      render();

      intervalId = setInterval(nextSlide, 4000);
    });

    return () => {
      clearInterval(intervalId);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      if (renderer) {
        renderer.dispose();
      }
    };
  }, []);

  return (
    <div
      className="slider js-slider"
      ref={containerRef}
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
      }}
    />
  );
}
