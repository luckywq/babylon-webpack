import * as BABYLON from 'babylonjs';



export default class Learn{
    private canvas: HTMLCanvasElement;
    private engine: BABYLON.Engine;
    private scene: BABYLON.Scene;
    private camera: BABYLON.ArcRotateCamera;
    constructor(ele: string) {
        this.canvas = document.querySelector(ele) as HTMLCanvasElement;
        this.engine = new BABYLON.Engine(this.canvas, true);
        this.scene = new BABYLON.Scene(this.engine);

        this.camera = new BABYLON.ArcRotateCamera('arc-cam', 0, Math.PI / 2, 10, new BABYLON.Vector3(0,0,0),this.scene);
        this.camera.attachControl(this.canvas, true);

        this.createDiecionalLight();
        this.addThings();
    }

    addThings():void {
        const box = BABYLON.MeshBuilder.CreateSphere('box', {diameter: 3}, this.scene);
        // const material = new BABYLON.StandardMaterial('mat', this.scene);
        const grass = new BABYLON.StandardMaterial('SS', this.scene);
        grass.diffuseTexture = new BABYLON.Texture('../assets/textures/ground.jpg', this.scene);
        grass.wireframe = true;
        box.material = grass;
    }

    createPointLight() {
        const light1 = new BABYLON.PointLight("pointLight1", new BABYLON.Vector3(0, 10, 0), this.scene);
        // const light2 = new BABYLON.PointLight("pointLight2", new BABYLON.Vector3(0, -10, 0), this.scene);
        // const light3 = new BABYLON.PointLight("pointLight3", new BABYLON.Vector3(10, 0, 0), this.scene);
        // const light4 = new BABYLON.PointLight("pointLight4", new BABYLON.Vector3(-10, 0, 0), this.scene);
        // const light5 = new BABYLON.PointLight("pointLight5", new BABYLON.Vector3(0, 0, 10), this.scene);
        // const light6 = new BABYLON.PointLight("pointLight6", new BABYLON.Vector3(0, 0, -10), this.scene);
    }

    createSpotLight() {
        const light = new BABYLON.SpotLight('spotlight', new BABYLON.Vector3(0,30,-10), new BABYLON.Vector3(0,-1,0),Math.PI / 3, 2, this.scene);
    }

    createDiecionalLight() {
        const light = new BABYLON.DirectionalLight('directionalLight',new BABYLON.Vector3(0,-1,0),this.scene);
        light.diffuse = new BABYLON.Color3(1, 0, 0);
        light.setEnabled(true);

    }

    render() {
        this.engine.runRenderLoop(() => {
            this.scene.render();
        })
        window.addEventListener('resize',() => {
            this.engine.resize();
        })
    }
}