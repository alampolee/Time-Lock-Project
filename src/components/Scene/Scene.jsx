import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, PerformanceMonitor } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import Orb from './Orb';

const Scene = () => {
    const [dpr, setDpr] = useState(1.5);
    const [enabled, setEnabled] = useState(true); // For post-processing toggling on low-end

    return (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0, background: 'radial-gradient(circle at center, #0B0F29 0%, #02040F 100%)' }}>
            <Canvas
                camera={{ position: [0, 0, 4], fov: 45 }}
                dpr={dpr}
                gl={{ antialias: false, powerPreference: 'high-performance', alpha: false }}
            >
                <PerformanceMonitor
                    onDecline={() => { setDpr(1); setEnabled(false); }}
                    onIncline={() => { setDpr(1.5); setEnabled(true); }}
                />

                {/* Lighting */}
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#2F80ED" />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#BB6BD9" />

                <color attach="background" args={['#02040F']} />

                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

                <Orb />

                {/* Post Processing */}
                {enabled && (
                    <EffectComposer disableNormalPass>
                        <Bloom luminanceThreshold={0.5} mipmapBlur intensity={1.5} radius={0.6} />
                        <Noise opacity={0.02} />
                        <Vignette eskil={false} offset={0.1} darkness={1.1} />
                    </EffectComposer>
                )}
            </Canvas>
        </div>
    );
};

export default Scene;
