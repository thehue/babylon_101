import {
  Scene,
  Engine,
  FreeCamera,
  Vector3,
  HemisphericLight,
  MeshBuilder,
  StandardMaterial,
  Texture,
} from '@babylonjs/core';

export class StandardMaterials {
  scene: Scene;
  engine: Engine;

  constructor(private canvas: HTMLCanvasElement) {
    this.engine = new Engine(this.canvas, true);
    this.scene = this.createScene();

    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }

  dispose(): void {
    this.engine.dispose();
  }

  createScene(): Scene {
    const scene = new Scene(this.engine);
    const camera = new FreeCamera('camera', new Vector3(0, 1, -5), scene);
    camera.attachControl();
    camera.speed = 0.25;

    const hemiLight = new HemisphericLight(
      'hemiLight',
      new Vector3(0, 1, 0),
      this.scene,
    );
    hemiLight.intensity = 1;

    const ground = MeshBuilder.CreateGround(
      'ground',
      {
        width: 10,
        height: 10,
      },
      this.scene,
    );
    const ball = MeshBuilder.CreateSphere(
      'ball',
      {
        diameter: 1,
      },
      this.scene,
    );
    ball.position = new Vector3(0, 1, 0);

    ground.material = this.createGroundMaterial();
    ball.material = this.createBallMaterial();

    return scene;
  }

  createGroundMaterial(): StandardMaterial {
    const uvScale = 4;
    const commonPath = '/textures/stone/';

    const diffuseTexture = new Texture(
      `${commonPath}/stone_diffuse.jpeg`,
      this.scene,
    );
    const normalTexture = new Texture(
      `${commonPath}/stone_normal.jpeg`,
      this.scene,
    );
    const ambientTexture = new Texture(
      `${commonPath}/stone_ao.jpeg`,
      this.scene,
    );
    const specularTextrue = new Texture(
      `${commonPath}/stone_spec.jpeg`,
      this.scene,
    );
    const textures = [
      diffuseTexture,
      normalTexture,
      ambientTexture,
      specularTextrue,
    ];
    textures.forEach((texture) => {
      texture.uScale = uvScale;
      texture.vScale = uvScale;
    });

    const groundMaterial = new StandardMaterial('groundMaterial', this.scene);
    groundMaterial.diffuseTexture = diffuseTexture;
    groundMaterial.bumpTexture = normalTexture;
    groundMaterial.ambientTexture = ambientTexture;
    groundMaterial.specularTexture = specularTextrue;

    return groundMaterial;
  }

  createBallMaterial(): StandardMaterial {
    const uvScale = 1;
    const commonPath = '/textures/metal/';

    const diffuseTexture = new Texture(
      `${commonPath}/metal_diffuse.jpeg`,
      this.scene,
    );
    const normalTexture = new Texture(
      `${commonPath}/metal_normal.jpeg`,
      this.scene,
    );
    const ambientTexture = new Texture(
      `${commonPath}/metal_ao.jpg`,
      this.scene,
    );
    const specularTextrue = new Texture(
      `${commonPath}/metal_spec.jpeg`,
      this.scene,
    );
    const textures = [
      diffuseTexture,
      normalTexture,
      ambientTexture,
      specularTextrue,
    ];
    textures.forEach((texture) => {
      texture.uScale = uvScale;
      texture.vScale = uvScale;
    });

    const ballMaterial = new StandardMaterial('ballMaterial', this.scene);
    ballMaterial.diffuseTexture = diffuseTexture;

    ballMaterial.bumpTexture = normalTexture;
    ballMaterial.invertNormalMapX = true;
    ballMaterial.invertNormalMapY = true;

    ballMaterial.ambientTexture = ambientTexture;

    ballMaterial.specularTexture = specularTextrue;
    ballMaterial.specularPower = 1;

    return ballMaterial;
  }
}
