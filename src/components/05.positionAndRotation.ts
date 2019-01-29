import * as BABYLON from 'babylonjs';

export default class Learn {
    private scene: BABYLON.Scene;
    private engine: BABYLON.Engine;
    private camera: BABYLON.ArcRotateCamera;
    private canvas: HTMLCanvasElement;
    constructor(ele: string) {
        this.canvas = document.querySelector(ele) as HTMLCanvasElement;
        this.basicScene();
        this.basicBox();
        this.createSpiralLines();
    }

    basicScene() {
        this.engine = new BABYLON.Engine(this.canvas, true);
        this.scene = new BABYLON.Scene(this.engine);
        this.camera = new BABYLON.ArcRotateCamera('arc-cam', 0, Math.PI / 2, 10, BABYLON.Vector3.Zero(), this.scene);
        this.camera.attachControl(this.canvas, true);
        new BABYLON.HemisphericLight('hem-light', new BABYLON.Vector3(0,0,0), this.scene);
        new BABYLON.PointLight('po-light', new BABYLON.Vector3(1,1,1), this.scene);
    }

    basicBox() {
        const box = BABYLON.MeshBuilder.CreateBox('box', {
            width:2,
            height:1,
            depth: 1,
            faceColors: [
                new BABYLON.Color4(0,255,255,1),
                new BABYLON.Color4(255,255,0,1),
                new BABYLON.Color4(0,255,0,1),
                new BABYLON.Color4(255,255,255,1),
                new BABYLON.Color4(255,255,0,1),
                new BABYLON.Color4(255,255,0,1),
            ]
        },this.scene);
        box.position = new BABYLON.Vector3(1,1,1);
        // setInterval(() => {
        //     box.rotation.y += 0.01;
        //     box.rotation.z += 0.01;
        //     box.rotation.x += 0.01;
        // },13.7);
    }

    createSpiralLines(): void {
        const spiralPoints = [];
        let theta = 0; // 角度
        const deltaTheta = 0.1; // 角度增量
        let Y = 0; // 高度
        const deltaY = 0.005; // 高度增量
        const radius = 1; // 半径
        const precision = 256; // 精度
        const colors = [];
        // 创建螺旋线路径
        for (let i = 0; i < precision; i ++) {
            spiralPoints.push(
                new BABYLON.Vector3(
                    radius * Math.cos(theta),
                    Y,
                    radius * Math.sin(theta)
                )

            );
            colors.push(
                new BABYLON.Color4(255,0,255,0.9),
            );
            theta += deltaTheta;
            Y += deltaY;
        }
        const line = BABYLON.MeshBuilder.CreateLines(
            'spiralLines',
            {
                points: spiralPoints,
                colors: colors
            },
            this.scene
        );
        line.position = new BABYLON.Vector3(-1,-1,-1);
        setInterval(() => {
            line.rotation.y += 0.01;
        }, 13.7)
    }

    render() {
        this.engine.runRenderLoop(() => {
            this.scene.render();
        })
        window.addEventListener('resize', () => {
            this.engine.resize();
        })
    }

}