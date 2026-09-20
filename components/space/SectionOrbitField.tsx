'use client';

import { useReducedMotion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

function seeded(index: number, salt: number) {
  const value = Math.sin(index * 91.17 + salt * 47.31) * 43758.5453;
  return value - Math.floor(value);
}

function createField(count: number) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const cool = new THREE.Color('#87cbe4');
  const white = new THREE.Color('#dfe9ee');

  for (let index = 0; index < count; index += 1) {
    const offset = index * 3;
    positions[offset] = (seeded(index, 1) - 0.5) * 12;
    positions[offset + 1] = (seeded(index, 2) - 0.5) * 6.6;
    positions[offset + 2] = -1.8 + seeded(index, 3) * 2.7;
    const color = seeded(index, 4) > 0.76 ? cool : white;
    colors[offset] = color.r;
    colors[offset + 1] = color.g;
    colors[offset + 2] = color.b;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  return geometry;
}

export default function SectionOrbitField({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reducedMotion) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: 'high-performance' });
    } catch {
      return;
    }

    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(43, 1, 0.1, 24);
    camera.position.z = 6;

    const starGeometry = createField(window.innerWidth < 720 ? 100 : 210);
    const starMaterial = new THREE.PointsMaterial({
      size: window.innerWidth < 720 ? 0.015 : 0.02,
      transparent: true,
      opacity: 0.42,
      vertexColors: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    const rings = new THREE.Group();
    rings.position.set(2.65, -0.25, -0.2);
    rings.rotation.set(1.1, 0.12, -0.22);
    scene.add(rings);

    const ringMaterials: THREE.LineBasicMaterial[] = [];
    const ringGeometries: THREE.BufferGeometry[] = [];
    [1.05, 1.42, 1.86].forEach((radius, index) => {
      const points = Array.from({ length: 96 }, (_, pointIndex) => {
        const angle = (pointIndex / 96) * Math.PI * 2;
        return new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, index * -0.08);
      });
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({
        color: index === 1 ? '#72d5ee' : '#b7c7cf',
        transparent: true,
        opacity: index === 1 ? 0.17 : 0.08,
        blending: THREE.AdditiveBlending,
      });
      const ring = new THREE.LineLoop(geometry, material);
      ringGeometries.push(geometry);
      ringMaterials.push(material);
      rings.add(ring);
    });

    const pointer = new THREE.Vector2();
    const pointerTarget = new THREE.Vector2();
    let visible = true;
    let animationFrame = 0;
    const startedAt = performance.now();

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const { width, height } = parent.getBoundingClientRect();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.35));
      renderer.setSize(width, height, false);
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;
      const rect = canvas.getBoundingClientRect();
      pointerTarget.set(
        ((event.clientX - rect.left) / Math.max(rect.width, 1) - 0.5) * 2,
        -((event.clientY - rect.top) / Math.max(rect.height, 1) - 0.5) * 2,
      );
    };
    const onPointerLeave = () => pointerTarget.set(0, 0);

    const render = () => {
      if (!visible || document.hidden) return;
      const elapsed = (performance.now() - startedAt) / 1000;
      pointer.lerp(pointerTarget, 0.028);
      stars.rotation.y = elapsed * 0.003 + pointer.x * 0.012;
      stars.rotation.x = pointer.y * 0.01;
      rings.rotation.z = -0.22 + elapsed * 0.018;
      rings.position.x = 2.65 + pointer.x * 0.09;
      rings.position.y = -0.25 + pointer.y * 0.07;
      ringMaterials[1].opacity = 0.14 + Math.sin(elapsed * 0.52) * 0.035;
      renderer.render(scene, camera);
      animationFrame = requestAnimationFrame(render);
    };

    const resume = () => {
      cancelAnimationFrame(animationFrame);
      if (visible && !document.hidden) animationFrame = requestAnimationFrame(render);
    };
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      resume();
    }, { threshold: 0.02 });
    const resizeObserver = new ResizeObserver(resize);

    resizeObserver.observe(canvas.parentElement ?? canvas);
    intersectionObserver.observe(canvas);
    canvas.parentElement?.addEventListener('pointermove', onPointerMove, { passive: true });
    canvas.parentElement?.addEventListener('pointerleave', onPointerLeave);
    document.addEventListener('visibilitychange', resume);
    resize();
    resume();

    return () => {
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      canvas.parentElement?.removeEventListener('pointermove', onPointerMove);
      canvas.parentElement?.removeEventListener('pointerleave', onPointerLeave);
      document.removeEventListener('visibilitychange', resume);
      starGeometry.dispose();
      starMaterial.dispose();
      ringGeometries.forEach((geometry) => geometry.dispose());
      ringMaterials.forEach((material) => material.dispose());
      renderer.dispose();
    };
  }, [reducedMotion]);

  return <canvas ref={canvasRef} className={`section-orbit-field ${className}`} aria-hidden="true" />;
}
