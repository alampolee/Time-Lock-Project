import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { useGamificationStore } from '../../store/GamificationStore';

const Orb = () => {
    const mesh = useRef();
    const material = useRef();
    const { status, mode } = useGamificationStore();

    // Target values for animation
    const targetScale = useRef(1);
    const targetDistort = useRef(0.3);
    const targetSpeed = useRef(1.5);
    const targetColor = useRef(new THREE.Color('#2F80ED')); // Blue default

    useFrame((state, delta) => {
        if (!mesh.current || !material.current) return;

        // State Machine Logic for Visuals
        if (status === 'idle') {
            targetScale.current = 1;
            targetDistort.current = 0.3;
            targetSpeed.current = 1;
            targetColor.current.set('#2F80ED');
        } else if (status === 'work') {
            targetScale.current = 0.8; // Tighten
            targetDistort.current = 0.1; // More solid/focused
            targetSpeed.current = 4; // Faster rotation
            targetColor.current.set('#2F80ED'); // Electric Blue

            // Subtle pulse based on time?
            const time = state.clock.getElapsedTime();
            mesh.current.rotation.y += delta * 0.5;
        } else if (status === 'break') {
            targetScale.current = 1.3; // Expand
            targetDistort.current = 0.8; // Liquid/Wobbly
            targetSpeed.current = 0.5; // Slow, flowy
            targetColor.current.set('#BB6BD9'); // Liquid Purple
        }

        // Lerp values for smooth transitions
        mesh.current.scale.lerp(new THREE.Vector3(targetScale.current, targetScale.current, targetScale.current), 0.05);
        material.current.distort = THREE.MathUtils.lerp(material.current.distort, targetDistort.current, 0.05);
        material.current.speed = THREE.MathUtils.lerp(material.current.speed, targetSpeed.current, 0.05);
        material.current.color.lerp(targetColor.current, 0.05);

        // Idle rotation
        mesh.current.rotation.x = state.clock.getElapsedTime() * 0.2;
        mesh.current.rotation.z = state.clock.getElapsedTime() * 0.1;
    });

    return (
        <Sphere ref={mesh} args={[1, 64, 64]} position={[0, 0, 0]}>
            <MeshDistortMaterial
                ref={material}
                color="#2F80ED"
                envMapIntensity={1}
                clearcoat={1}
                clearcoatRoughness={0}
                metalness={0.1}
                roughness={0.1}
                distort={0.3}
                speed={1.5}
            />
        </Sphere>
    );
};

export default Orb;
