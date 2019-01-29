import * as BABYLON from 'babylonjs';

export default class Game {

    private canvas: HTMLCanvasElement;
    private engine: BABYLON.Engine;
    private scene: BABYLON.Scene;
    private light: BABYLON.Light;
    private camera: BABYLON.Camera;

    constructor(canvasElement: string) {
        this.canvas = document.querySelector(canvasElement) as HTMLCanvasElement;
        this.engine = new BABYLON.Engine(this.canvas, true, {}, true);
        this.scene = new BABYLON.Scene(this.engine);
        this.light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(-1, -1, 0), this.scene);
        this.camera = new BABYLON.ArcRotateCamera('cam', - Math.PI / 2, Math.PI / 2, 30, BABYLON.Vector3.Zero(), this.scene);

        this.camera.attachControl(this.canvas);

        this.createMesh();
    }

    private createMesh(): void {

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