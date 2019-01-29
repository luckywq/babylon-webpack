import * as BABYLON from 'babylonjs';

export default class Learn{
    private canvas: HTMLCanvasElement;
    private scene: BABYLON.Scene;
    private engine: BABYLON.Engine;
    private box: any;
    constructor(ele: string) {
        this.canvas = document.querySelector(ele) as HTMLCanvasElement;
        this.engine = new BABYLON.Engine(this.canvas, true);
        this.scene = new BABYLON.Scene(this.engine);
        this.createLight();
        this.createThings();

        // const camera  = this.UniversalCamera();
        // const camera = this.arcRotateCamera();
        const camera = this.followCamera();
        camera.attachControl(this.canvas, true);
    }

    public createThings() {
        const box = BABYLON.MeshBuilder.CreateBox('box', {}, this.scene);
        // const material = new BABYLON.StandardMaterial('mat', this.scene);
        const grass = new BABYLON.StandardMaterial('SS', this.scene);
        grass.diffuseTexture = new BABYLON.Texture('../assets/textures/ground.jpg', this.scene);
        box.material = grass;
        this.box = box;
    }

    public createLight() {
        const light = new BABYLON.HemisphericLight('hem', new BABYLON.Vector3(-1,1,0),this.scene);
        // light.diffuse = new BABYLON.Color3(1, 1, 0);
        // light.specular = new BABYLON.Color3(0, 1, 0);
        // light.groundColor = new BABYLON.Color3(0, 1, 0);
    }
    render () :void{
        this.engine.runRenderLoop(()=> {
            this.scene.render();
        })
        window.addEventListener('resize', () => {
            this.engine.resize();
        })
    }

    // Constructing a Universal Camera
    public UniversalCamera(): BABYLON.UniversalCamera{
        const camera = new BABYLON.UniversalCamera('unviersalCamera', new BABYLON.Vector3(0,0,-10), this.scene);
        camera.setTarget(BABYLON.Vector3.Zero());
        return camera;
    }

    //Constructing an Arc Rotate Camera--指向给定目标
    /*
        parmas:
        纵向旋转角度α
        横向旋转角度β
        半径
        目标位置
        scene
    */
    public arcRotateCamera():BABYLON.ArcRotateCamera {
        const camera = new BABYLON.ArcRotateCamera(
            'arcRotateCamera', 0,Math.PI / 2, 10, new BABYLON.Vector3(0,0,0), this.scene);
        camera.setPosition(new BABYLON.Vector3(0,0,20));
        return camera;
    }

    public followCamera(): BABYLON.FollowCamera{
        const camera = new BABYLON.FollowCamera('follow', new BABYLON.Vector3(0,10,-10), this.scene);
        camera.radius = 30;
        camera.heightOffset = 10;
        camera.rotationOffset = 0;
        camera.cameraAcceleration = 0.005;
        camera.maxCameraSpeed = 10;
        camera.lockedTarget  = this.box;
        return camera;
    }
}