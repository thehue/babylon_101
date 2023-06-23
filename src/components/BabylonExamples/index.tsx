'use client';

import { useEffect } from 'react';
import { BasicScene } from './BasicScene';
import styles from './styles.module.css';

export default function BabylonExamples() {
  useEffect(() => {
    const canvas = document.querySelector('canvas')!;
    new BasicScene(canvas);
  }, []);

  return (
    <section>
      <h3>Babylon Examples</h3>
      <canvas></canvas>
    </section>
  );
}
