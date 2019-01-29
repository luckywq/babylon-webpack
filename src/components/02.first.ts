import * as BABYLON from 'babylonjs';

export default class Learn{
    private scene: BABYLON.Scene;
    private engine: BABYLON.Engine;
    private camera: BABYLON.ArcRotateCamera;
    private canvas: HTMLCanvasElement;
    constructor(ele:string) {
        this.canvas = document.querySelector(ele) as HTMLCanvasElement;
        this.engine = new BABYLON.Engine(this.canvas, true);
        this.scene = new BABYLON.Scene(this.engine);
        this.camera = new BABYLON.ArcRotateCamera('Camera', Math.PI, Math.PI / 2, 2, BABYLON.Vector3.Zero(), this.scene);

        const light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), this.scene);
        const light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 1, -1), this.scene);
        // const sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter:1}, this.scene);
        const box = BABYLON.MeshBuilder.CreateBox('box',{height:3,width:2,depth:0.2}, this.scene);

    }
    public render():void {
        this.engine.runRenderLoop(() => {
            this.scene.render();
        })

        window.addEventListener('resize', () => {
            this.engine.resize();
        })
    }
}