import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame, useThree, extend, useLoader } from '@react-three/fiber';
import { Effects, useTexture } from '@react-three/drei'
import styled from 'styled-components';
import Model from './components/Model.jsx';
import * as THREE from "three";
import {
  EffectComposer,
  BrightnessContrast,
  Bloom,
  SMAA
} from "@react-three/postprocessing";
import { BlendFunction, Resizer, KernelSize  } from 'postprocessing'
import { LUTPass, LUTCubeLoader, BloomPass } from 'three-stdlib'

import './App.css'

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
};

console.log("screen size : " + sizes.width + " / " + sizes.height);
console.log(THREE.REVISION);

function App() {
  return (
    <Wrapper className="App">
      <Canvas className="canvas" camera={{ position : [ 0, 1, 3 ], rotation : [ -0.08, 0, 0 ], fov: 13.7 }}>    
      <Suspense fallback={null}>        
        <EffectComposer multisampling={0} disableNormalPass={false}>
          <BrightnessContrast
            brightness={0.05} // brightness. min: -1, max: 1
            contrast={0.1} // contrast: min -1, max: 1
          />
          <Bloom
            intensity={0.2} // The bloom intensity.
            blurPass={undefined} // A blur pass.
            width={Resizer.AUTO_SIZE} // render width
            height={Resizer.AUTO_SIZE} // render height
            kernelSize={KernelSize.LARGE} // blur kernel size
            luminanceThreshold={0.8} // luminance threshold. Raise this value to mask out darker elements in the scene.
            luminanceSmoothing={0.1} // smoothness of the luminance threshold. Range is [0, 1]
          />          
          <SMAA />
        </EffectComposer>        
        </Suspense>
        <ambientLight intensity={0.2} />
        <directionalLight position={[2, 2, 5]} intensity={1} />
        <Suspense fallback={null}>
          <Model></Model>
        </Suspense>        
      </Canvas>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  canvas {
    background: #000000;
  }
`;

export default App
