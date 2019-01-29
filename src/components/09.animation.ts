import * as BABYLON from 'babylonjs';

export default class Learn{
    private canvas: HTMLCanvasElement;
    private camera: BABYLON.ArcRotateCamera;
    private engine: BABYLON.Engine;
    private scene: BABYLON.Scene;
    private light: BABYLON.Light;
    animating: boolean = true;
    constructor(ele:string) {
        this.canvas = document.querySelector(ele) as HTMLCanvasElement;
        this.engine = new BABYLON.Engine(this.canvas, true);
        this.scene = new BABYLON.Scene(this.engine);
        this.camera = new BABYLON.ArcRotateCamera('camera', 0, Math.PI / 2, 10, new BABYLON.Vector3(0,0,0), this.scene);
        this.camera.attachControl(this.canvas, true);
        this.light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(10, 10, 10), this.scene);
        this.camera.attachControl(this.canvas, true);

        this.createBox();

    }

    createBox() {
        const box = BABYLON.MeshBuilder.CreateBox('BOX', {size: 2}, this.scene);
        const grass = new BABYLON.StandardMaterial('SS', this.scene);
        grass.diffuseTexture = new BABYLON.Texture('../assets/textures/ground.jpg', this.scene);
        box.material = grass;

        box.position.y = -2;

        const animationBox = new BABYLON.Animation(
            'animation',  //--name
            'position.y', // --需要进行运动的物体的属性。缩放、位置等
            30, // 每秒的帧数
            BABYLON.Animation.ANIMATIONTYPE_FLOAT, //变化类型
            BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE, //循环类型
        );
        const keys = []; // 类似于css3 @keyframe动画参数
        keys.push({
            frame: 0,
            value: -2
        })
        keys.push({
            frame: 20,
            value: 2
        })
        keys.push({
            frame: 100,
            value: -2
        })
        animationBox.setKeys(keys);
        box.animations = [];
        console.log(box);
        box.animations.push(animationBox);

        document.addEventListener('click', async () => {
            // this.animating = !this.animating;
            // if(this.animating) {
            //     newAnimation.restart()
            // }else{
            //     newAnimation.pause();
            // }
            const newAnimation = this.scene.beginAnimation(box, 0, 100, false);
            console.log('start');
            await newAnimation.waitAsync(); //阻止线程等待动画执行完毕
            alert('end');
        })
    }


    render() {
        this.engine.runRenderLoop(() => {
            this.scene.render()
        })
        window.addEventListener('resize', () => {
            this.engine.resize();
        })
    }
}
