import * as BABYLON from 'babylonjs';


export default class Basic{
    private scene: BABYLON.Scene;
    private canvas: HTMLCanvasElement;
    private camera: BABYLON.ArcRotateCamera;
    private engine: BABYLON.Engine;
    constructor(ele: string){
        this.canvas = document.querySelector(ele) as HTMLCanvasElement;
        this.engine = new BABYLON.Engine(this.canvas, true);
        this.scene = new BABYLON.Scene(this.engine);
        this.camera = new BABYLON.ArcRotateCamera('Camera', Math.PI / 2, Math.PI / 2, 10, BABYLON.Vector3.Zero(), this.scene);

        const light1 = new BABYLON.HemisphericLight(
            'hLight',
            new BABYLON.Vector3(0, 0, 0),
            this.scene
        );
        const light2 = new BABYLON.PointLight(
            'pLight',
            new BABYLON.Vector3(-5, 5, 0),
            this.scene
        );

        //立方体

        // BABYLON.MeshBuilder.CreateBox('mybox', {
        //     width: 2,
        //     height: 1,
        //     depth: 0.1,
        //     faceColors: [
        //         new BABYLON.Color4(0,0,0,1),
        //         new BABYLON.Color4(100,100,100,1),
        //         new BABYLON.Color4(0,0,0,1),
        //         new BABYLON.Color4(255,0,255,1),
        //         new BABYLON.Color4(255,255,0,1),
        //         new BABYLON.Color4(0,255,255,1)
        //     ],
        //     sideOrientation:BABYLON.Mesh.DOUBLESIDE,
        //     updatable: true
        // },this.scene)

        // plane
        // BABYLON.MeshBuilder.CreatePlane('plane', {
        //     width: 5,
        //     height: 2,
        //     sideOrientation:BABYLON.Mesh.DOUBLESIDE,
        // }, this.scene)

        // ground
        BABYLON.MeshBuilder.CreateGround('ground', {
            width: 2,
            height: 2,
            subdivisions: 4,
        }, this.scene)
    }

    render():void {
        this.engine.runRenderLoop(() => {
            this.scene.render();
        })
        window.addEventListener('resize', () => {
            this.engine.resize();
        })
    }
}