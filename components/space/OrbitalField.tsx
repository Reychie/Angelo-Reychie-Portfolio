'use client';

import { useReducedMotion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  Color,
  Group,
  MathUtils,
  Mesh,
  PerspectiveCamera,
  PlaneGeometry,
  Points,
  PointsMaterial,
  Scene,
  ShaderMaterial,
  SRGBColorSpace,
  Vector2,
  WebGLRenderer,
} from 'three';

const WARM = new Color('#e8c09d');
const COOL = new Color('#b9d9e8');

function createStars(count: number) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let index = 0; index < count; index += 1) {
    const offset = index * 3;
    positions[offset] = MathUtils.randFloatSpread(11);
    positions[offset + 1] = MathUtils.randFloatSpread(6.4);
    positions[offset + 2] = MathUtils.randFloat(-2.4, 1.4);
    const color = Math.random() > 0.86 ? WARM : COOL;
    colors[offset] = color.r;
    colors[offset + 1] = color.g;
    colors[offset + 2] = color.b;
  }

  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new BufferAttribute(positions, 3));
  geometry.setAttribute('color', new BufferAttribute(colors, 3));
  return geometry;
}

function createAccretionParticles(count: number) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let index = 0; index < count; index += 1) {
    const offset = index * 3;
    const angle = Math.random() * Math.PI * 2;
    const radius = 0.62 + Math.pow(Math.random(), 0.58) * 1.72;
    const turbulence = MathUtils.randFloatSpread(0.1);
    positions[offset] = Math.cos(angle) * radius;
    positions[offset + 1] = Math.sin(angle) * radius * 0.24 + turbulence;
    positions[offset + 2] = MathUtils.randFloatSpread(0.16);
    const color = Math.random() > 0.25 ? WARM : COOL;
    colors[offset] = color.r;
    colors[offset + 1] = color.g;
    colors[offset + 2] = color.b;
  }

  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new BufferAttribute(positions, 3));
  geometry.setAttribute('color', new BufferAttribute(colors, 3));
  return geometry;
}

/**
 * Lightweight Three.js layer that gives the photographic black hole real-time
 * depth. The plate carries detail; WebGL supplies orbit, parallax, glow, and
 * gravitational drift without making the scene dependent on a heavy 3D asset.
 */
export default function OrbitalField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reducedMotion) return;

    let renderer: WebGLRenderer;
    try {
      renderer = new WebGLRenderer({
        canvas,
        alpha: true,
        antialias: false,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }

    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = SRGBColorSpace;

    const spriteCanvas = document.createElement('canvas');
    spriteCanvas.width = 64;
    spriteCanvas.height = 64;
    const spriteContext = spriteCanvas.getContext('2d');
    if (spriteContext) {
      const glow = spriteContext.createRadialGradient(32, 32, 0, 32, 32, 32);
      glow.addColorStop(0, 'rgba(255,255,255,1)');
      glow.addColorStop(0.28, 'rgba(255,255,255,.92)');
      glow.addColorStop(1, 'rgba(255,255,255,0)');
      spriteContext.fillStyle = glow;
      spriteContext.fillRect(0, 0, 64, 64);
    }
    const particleSprite = new CanvasTexture(spriteCanvas);
    particleSprite.colorSpace = SRGBColorSpace;

    const scene = new Scene();
    const camera = new PerspectiveCamera(42, 1, 0.1, 30);
    camera.position.set(0, 0, 6);

    const starGeometry = createStars(window.innerWidth < 720 ? 190 : 360);
    const starMaterial = new PointsMaterial({
      size: window.innerWidth < 720 ? 0.018 : 0.022,
      transparent: true,
      opacity: 0.58,
      vertexColors: true,
      map: particleSprite,
      alphaTest: 0.015,
      depthWrite: false,
      blending: AdditiveBlending,
      sizeAttenuation: true,
    });
    const stars = new Points(starGeometry, starMaterial);
    scene.add(stars);

    const orbitGroup = new Group();
    orbitGroup.position.set(1.23, 0.08, 0.25);
    orbitGroup.rotation.z = 0.29;
    scene.add(orbitGroup);

    const particleGeometry = createAccretionParticles(window.innerWidth < 720 ? 260 : 560);
    const particleMaterial = new PointsMaterial({
      size: window.innerWidth < 720 ? 0.018 : 0.024,
      transparent: true,
      opacity: 0.7,
      vertexColors: true,
      map: particleSprite,
      alphaTest: 0.015,
      depthWrite: false,
      blending: AdditiveBlending,
      sizeAttenuation: true,
    });
    const accretion = new Points(particleGeometry, particleMaterial);
    orbitGroup.add(accretion);

    const photonMaterial = new ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: WARM.clone() },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform float uTime;
        uniform vec3 uColor;
        void main() {
          vec2 centered = vUv - 0.5;
          float radius = length(centered);
          float distanceToRing = abs(radius - 0.39);
          float ring = 1.0 - smoothstep(0.018, 0.08, distanceToRing);
          float shimmer = 0.72 + 0.28 * sin(atan(centered.y, centered.x) * 5.0 - uTime * 0.48);
          float alpha = ring * shimmer * 0.24;
          gl_FragColor = vec4(uColor, alpha);
        }
      `,
    });
    const photonPlane = new Mesh(new PlaneGeometry(2.45, 2.45), photonMaterial);
    photonPlane.scale.y = 0.7;
    photonPlane.position.z = -0.04;
    orbitGroup.add(photonPlane);

    const pointer = new Vector2();
    const pointerTarget = new Vector2();
    let bounds = canvas.getBoundingClientRect();
    const startedAt = performance.now();
    let animationFrame = 0;
    let visible = true;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const { width, height } = parent.getBoundingClientRect();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.65));
      renderer.setSize(width, height, false);
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
      bounds = canvas.getBoundingClientRect();
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;
      pointerTarget.set(
        ((event.clientX - bounds.left) / Math.max(bounds.width, 1) - 0.5) * 2,
        -((event.clientY - bounds.top) / Math.max(bounds.height, 1) - 0.5) * 2,
      );
    };

    const onPointerLeave = () => pointerTarget.set(0, 0);

    const render = () => {
      if (!visible || document.hidden) return;
      const elapsed = (performance.now() - startedAt) / 1000;
      pointer.lerp(pointerTarget, 0.035);

      stars.rotation.y = elapsed * 0.004;
      stars.rotation.x = pointer.y * 0.015;
      accretion.rotation.z = elapsed * 0.035;
      orbitGroup.rotation.x = pointer.y * 0.035;
      orbitGroup.rotation.y = pointer.x * 0.055;
      orbitGroup.position.x = 1.23 + pointer.x * 0.07;
      orbitGroup.position.y = 0.08 + pointer.y * 0.05;
      photonMaterial.uniforms.uTime.value = elapsed;
      particleMaterial.opacity = 0.58 + Math.sin(elapsed * 0.42) * 0.08;
      renderer.render(scene, camera);
      animationFrame = requestAnimationFrame(render);
    };

    const resume = () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(render);
    };

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) resume();
      else cancelAnimationFrame(animationFrame);
    }, { threshold: 0.02 });

    const resizeObserver = new ResizeObserver(resize);
    const interactionTarget = canvas.closest('section') ?? canvas.parentElement;
    resizeObserver.observe(canvas.parentElement ?? canvas);
    intersectionObserver.observe(canvas);
    interactionTarget?.addEventListener('pointermove', onPointerMove, { passive: true });
    interactionTarget?.addEventListener('pointerleave', onPointerLeave);
    document.addEventListener('visibilitychange', resume);
    resize();
    resume();

    return () => {
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      interactionTarget?.removeEventListener('pointermove', onPointerMove);
      interactionTarget?.removeEventListener('pointerleave', onPointerLeave);
      document.removeEventListener('visibilitychange', resume);
      starGeometry.dispose();
      starMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      photonPlane.geometry.dispose();
      photonMaterial.dispose();
      particleSprite.dispose();
      renderer.dispose();
    };
  }, [reducedMotion]);

  return <canvas ref={canvasRef} className="orbital-field orbital-field--webgl" aria-hidden="true" />;
}
