import * as BABYLON from 'babylonjs';

export default class Game {

    private canvas: HTMLCanvasElement;
    private engine: BABYLON.Engine;
    private scene: BABYLON.Scene;
    private light: BABYLON.Light;
    private camera: BABYLON.Camera;
    private clicked: boolean = true;
    constructor(canvasElement: string) {
        this.canvas = document.querySelector(canvasElement) as HTMLCanvasElement;
        this.engine = new BABYLON.Engine(this.canvas, true, {}, true);
        this.scene = new BABYLON.Scene(this.engine);
        this.light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(-2, -2, 0), this.scene);
        this.light.diffuse = new BABYLON.Color3(1, 1, 0);
        this.light.specular = new BABYLON.Color3(0, 1, 0);

        this.camera = new BABYLON.ArcRotateCamera('cam', - Math.PI / 2, Math.PI / 2, 30, BABYLON.Vector3.Zero(), this.scene);

        this.camera.attachControl(this.canvas);

        this.createMesh();
        this.handleClick();
    }

    private createMesh(): void {
        const mat = new BABYLON.StandardMaterial('mat', this.scene);

        // const sphere = BABYLON.MeshBuilder.CreateSphere('sphere', {diameter: 5}, this.scene);
        const parent = new BABYLON.TransformNode('boxParent', this.scene);
        const box0 = BABYLON.MeshBuilder.CreateBox('BOX0', {width: 10,height: 3,depth: 3}, this.scene);
        const box1 = BABYLON.MeshBuilder.CreateBox('BOX1', {width: 10,height: 3,depth: 3}, this.scene);
        const box2 = BABYLON.MeshBuilder.CreateBox('BOX2', {width: 10,height: 3,depth: 3}, this.scene);
        mat.alpha = 0.6;
        box0.material = mat;
        box1.material = mat;
        box2.material = mat;
        box0.parent = parent;
        box1.parent = parent;
        box2.parent = parent;

        box0.position.y = -3.1
        box2.position.y = 3.1
    }

    private handleClick() {
        const {scene} = this;
        const animationBox = new BABYLON.Animation(
            'box',
            'material.alpha',
            30,
            BABYLON.Animation.ANIMATIONTYPE_FLOAT, //变化类型
            BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE, //循环类型
        )
        const keys = [
            {
                frame: 0,
                value: 0.6
            },
            {
                frame: 20,
                value: 0.4
            },
            {
                frame: 100,
                value: 0.2
            }
        ]
        const keys2 = [
            {
                frame: 0,
                value: 0.2
            },
            {
                frame: 20,
                value: 0.4
            },
            {
                frame: 100,
                value: 0.6
            }
        ]
        window.addEventListener('click', async () => {
            const res:any = scene.pick(scene.pointerX, scene.pointerY);
            if(res.hit) {
                console.log(res.pickedMesh.parent._children);
            }
        })


        // this.scene.onBeforeRenderObservable.add(() => {

        // });
    }

    public render(): void {
        let n = 0;
        this.engine.runRenderLoop(() => {
            this.scene.render();
            const parent = this.scene.getNodeByName('boxParent');
            n += 0.01;
            (<BABYLON.Mesh>parent).position.x = Math.cos(n);
            (<BABYLON.Mesh>parent).position.z = Math.sin(n);
        });
        window.addEventListener('resize', () => {
            this.engine.resize();
        });
    }

}