import * as BABYLON from 'babylonjs';

export default class Game {

    private canvas: HTMLCanvasElement;
    private engine: BABYLON.Engine;
    private scene: BABYLON.Scene;
    private camera: BABYLON.ArcRotateCamera;

    constructor(ele: string) {
        this.canvas = document.querySelector(ele) as HTMLCanvasElement;

        this.basicScene();
        this.createShape();
    }

    private basicScene(): void {
        this.engine = new BABYLON.Engine(this.canvas, true);
        this.scene = new BABYLON.Scene(this.engine);
        this.camera = new BABYLON.ArcRotateCamera('arcam', -Math.PI / 2, Math.PI / 3, 5, BABYLON.Vector3.Zero(), this.scene);
        this.camera.attachControl(this.canvas, true);
        const light = new BABYLON.HemisphericLight('hem', new BABYLON.Vector3(-1,1,0),this.scene);
        // light.diffuse = new BABYLON.Color3(1, 1, 0);
        // light.specular = new BABYLON.Color3(0, 1, 0);
        // light.groundColor = new BABYLON.Color3(0, 1, 0);
    }

    createShape() {
        const sphere = BABYLON.MeshBuilder.CreateSphere('sphere', {
            diameterX: 1,
            diameterY: 1,
            diameterZ: 1
        },this.scene)
        const redMaterial = new BABYLON.StandardMaterial("myMaterial", this.scene);

        redMaterial.diffuseColor = new BABYLON.Color3(1, 1, 1);
        redMaterial.wireframe = true;
        sphere.material = redMaterial;
        

        const sphere1 = BABYLON.MeshBuilder.CreateSphere('sphere', {
            diameterX: 1,
            diameterY: 1,
            diameterZ: 1
        },this.scene)

        sphere1.position.x = -1.5;
        const grass = new BABYLON.StandardMaterial('SS', this.scene);
        grass.diffuseTexture = new BABYLON.Texture('../assets/textures/ground.jpg', this.scene);
        sphere1.material = grass;

    }

    public render(): void {
        this.engine.runRenderLoop(() => {
            this.scene.render();
        });
        window.addEventListener('resize', () => {
            this.engine.resize();
        });
    }

}