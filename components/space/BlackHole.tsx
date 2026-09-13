'use client';

import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { blackHoleFragment, blackHoleVertex } from '@/components/space/blackHoleShader';

interface BlackHoleProps {
  targetX: number;
  targetY?: number;
  reducedMotion: boolean;
  quality: number;
}

export default function BlackHole({
  targetX,
  targetY = 0.5,
  reducedMotion,
  quality,
}: BlackHoleProps) {
  const material = useRef<THREE.ShaderMaterial>(null);
  const center = useRef(new THREE.Vector2(targetX, targetY));
  const mouse = useRef(new THREE.Vector2(0, 0));
  const desired = useRef(new THREE.Vector2(targetX, targetY));
  const qualityRef = useRef(quality);
  const motionRef = useRef(reducedMotion);
  const timer = useMemo(() => new THREE.Timer(), []);
  const { size, gl, invalidate } = useThree();

  useEffect(() => {
    qualityRef.current = quality;
    motionRef.current = reducedMotion;
    invalidate();
  }, [quality, reducedMotion, invalidate]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uCenter: { value: new THREE.Vector2(targetX, targetY) },
      uQuality: { value: quality },
      uMotion: { value: reducedMotion ? 0 : 1 },
    }),
    // Persistent GPU uniforms; live values are written in useFrame.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useEffect(() => {
    gl.setClearColor('#020205', 1);
    timer.connect(document);
    return () => timer.disconnect();
  }, [gl, timer]);

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      if (motionRef.current) return;
      mouse.current.set((event.clientX / window.innerWidth - 0.5) * 0.04, (event.clientY / window.innerHeight - 0.5) * 0.03);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  useFrame(() => {
    const mat = material.current;
    if (!mat) return;

    timer.update();
    mat.uniforms.uTime.value = timer.getElapsed();
    mat.uniforms.uResolution.value.set(size.width, size.height);
    mat.uniforms.uQuality.value = qualityRef.current;
    mat.uniforms.uMotion.value = motionRef.current ? 0 : 1;

    desired.current.set(targetX + mouse.current.x, targetY - mouse.current.y);
    center.current.lerp(desired.current, motionRef.current ? 1 : 0.032);
    mat.uniforms.uCenter.value.copy(center.current);
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={material}
        uniforms={uniforms}
        vertexShader={blackHoleVertex}
        fragmentShader={blackHoleFragment}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}
