import * as React from 'react'
import { Canvas } from '@react-three/fiber'
import { Card } from './components/Card'


export default function App() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Card position={[-1.2, 0, 0]} />
      <Card position={[1.2, 0, 0]} />
    </Canvas>
  )
}
