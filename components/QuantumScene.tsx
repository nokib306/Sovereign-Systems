/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, Line, Stars } from '@react-three/drei';
import * as THREE from 'three';

// Represents a Node in the email network (Server/User)
const NetworkNode = ({ position, color, size = 0.1 }: { position: [number, number, number]; color: string; size?: number }) => {
  return (
    <Sphere args={[size, 16, 16]} position={position}>
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={2}
        toneMapped={false}
      />
    </Sphere>
  );
};

// Represents data flowing between nodes
const DataPacket = ({ start, end, color }: { start: [number, number, number]; end: [number, number, number]; color: string }) => {
    const ref = useRef<THREE.Mesh>(null);
    const speed = Math.random() * 0.5 + 0.5;
    
    useFrame(({ clock }) => {
        if (ref.current) {
            const t = (clock.getElapsedTime() * speed) % 1;
            ref.current.position.x = start[0] + (end[0] - start[0]) * t;
            ref.current.position.y = start[1] + (end[1] - start[1]) * t;
            ref.current.position.z = start[2] + (end[2] - start[2]) * t;
        }
    });

    return (
        <Sphere ref={ref} args={[0.05, 8, 8]}>
            <meshBasicMaterial color={color} />
        </Sphere>
    )
}

const NetworkGroup = () => {
    // Generate random nodes
    const nodes = useMemo(() => {
        return new Array(15).fill(0).map(() => ({
            position: [
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 6,
                (Math.random() - 0.5) * 5
            ] as [number, number, number]
        }))
    }, []);

    // Create connections
    const connections = useMemo(() => {
        const lines: any[] = [];
        nodes.forEach((node, i) => {
            nodes.slice(i + 1).forEach(other => {
                if (Math.random() > 0.8) { // Sparse connections
                    lines.push({ start: node.position, end: other.position });
                }
            })
        });
        return lines;
    }, [nodes]);

    return (
        <group>
            {nodes.map((node, i) => (
                <Float key={i} speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                    <NetworkNode position={node.position} color={i % 3 === 0 ? "#10B981" : "#3B82F6"} size={i === 0 ? 0.3 : 0.1} />
                </Float>
            ))}
            {connections.map((conn, i) => (
                <group key={i}>
                    <Line points={[conn.start, conn.end]} color="#1E293B" lineWidth={1} transparent opacity={0.3} />
                    <DataPacket start={conn.start} end={conn.end} color="#ffffff" />
                </group>
            ))}
        </group>
    )
}

export const NetworkBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <fog attach="fog" args={['#0B1120', 5, 20]} />
        <ambientLight intensity={0.5} />
        <NetworkGroup />
        <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
      </Canvas>
    </div>
  );
};