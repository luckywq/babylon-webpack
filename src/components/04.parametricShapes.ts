import * as BABYLON from 'babylonjs';

export default class Learn{
    private scene: BABYLON.Scene;
    private canvas: HTMLCanvasElement;
    private camera: BABYLON.ArcRotateCamera;
    private engine: BABYLON.Engine;
    constructor(ele:string) {
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

        // this.sanjiao();
        this.createSpiralLines();
    }
    render() {
        this.engine.runRenderLoop(() => {
            this.scene.render()
        })
        window.addEventListener('resize', () => {
            this.engine.resize();
        })
    }

    sanjiao() {
        const points = [
            new BABYLON.Vector3(0, 0, 0),
            new BABYLON.Vector3(0, 1, 0),

        ]
        BABYLON.MeshBuilder.CreateLines(
            'lines',
            {
                points,
                colors: [
                    new BABYLON.Color4(255,0,0),
                    new BABYLON.Color4(255,255,0),
                ]
            },
            this.scene
        );

        const points2 = [
            new BABYLON.Vector3(0, 1, 0),
            new BABYLON.Vector3(-1, 2, 0),

        ]
        BABYLON.MeshBuilder.CreateLines(
            'lines2',
            {
                points: points2,
                colors: [
                    new BABYLON.Color4(255,0,0),
                    new BABYLON.Color4(255,255,0),
                ]
            },
            this.scene
        );

        const points3 = [
            new BABYLON.Vector3(-1, 2, 0),
            new BABYLON.Vector3(0, 0, 0),

        ]
        BABYLON.MeshBuilder.CreateLines(
            'lines3',
            {
                points: points3,
                colors: [
                    new BABYLON.Color4(255,0,0),
                    new BABYLON.Color4(255,255,0),
                ]
            },
            this.scene
        );
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
        BABYLON.MeshBuilder.CreateLines(
            'spiralLines',
            {
                points: spiralPoints,
                colors: colors
            },
            this.scene
        );
    }
}