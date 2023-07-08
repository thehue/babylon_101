'use client';

import { useEffect } from 'react';
import { StandardMaterials } from './StandardMaterials';
import styles from './styles.module.css';

export default function BabylonExamples() {
  useEffect(() => {
    const canvas = document.querySelector('canvas')!;
    const standardMaterials = new StandardMaterials(canvas);

    return () => standardMaterials.dispose();
  }, []);

  return (
    <section>
      <h3>Babylon Examples</h3>
      <canvas></canvas>
    </section>
  );
}
