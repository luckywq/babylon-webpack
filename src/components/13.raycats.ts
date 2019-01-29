import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';
import { AdvancedDynamicTexture, Rectangle, Control, TextBlock } from 'babylonjs-gui';

export default class Learn{
    private canvas: HTMLCanvasElement;
    private engine: BABYLON.Engine;
    private scene: BABYLON.Scene;
    private camera: BABYLON.Camera;
    private light: BABYLON.Light;
    private highLightLayer: BABYLON.HighlightLayer;
    private meshes: BABYLON.Mesh[] = [];
    private advancedTexture: AdvancedDynamicTexture;
    constructor(ele:string) {
        this.canvas = document.querySelector(ele) as HTMLCanvasElement;
        this.engine = new BABYLON.Engine(this.canvas, true, { stencil: true }, true);
        this.scene = new BABYLON.Scene(this.engine);
        this.scene.clearColor = new BABYLON.Color4(6/255, 22/255, 37/255, 1);
        this.camera = new BABYLON.ArcRotateCamera('camera', -0.5, 1.2, 1500, BABYLON.Vector3.Zero(), this.scene)
        this.light = new BABYLON.HemisphericLight('hLight', new BABYLON.Vector3(1, 1, 0), this.scene);
        this.camera.attachControl(this.canvas, true);

        // this.advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI('ui1');

        this.highLightLayer = new BABYLON.HighlightLayer('HI', this.scene);
        this.loadCity();
        this.onClick();
        this.initMaterials();
    }

    private initMaterials(): void {
        const mainMat = new BABYLON.StandardMaterial('main', this.scene);
        mainMat.diffuseColor = new BABYLON.Color3(42/255, 178/255, 203/255); // 主楼颜色
        mainMat.alpha = 0.4;
        const otherMat = new BABYLON.StandardMaterial('other', this.scene);
        otherMat.diffuseColor = new BABYLON.Color3(1, 1, 1); // 其他楼颜色
        otherMat.specularColor = new BABYLON.Color3(0, 0, 0);
        otherMat.alpha = 0.05;
        const roadMat = new BABYLON.StandardMaterial('road', this.scene);
        roadMat.diffuseColor = new BABYLON.Color3(0, 0, 0); // 道路颜色
        roadMat.specularColor = new BABYLON.Color3(0, 0, 0);
        roadMat.alpha = 0.05;
        const roomMat = new BABYLON.StandardMaterial('room', this.scene);
        roomMat.diffuseColor = new BABYLON.Color3(252/255, 45/255, 57/255);
        const pickedMat = new BABYLON.StandardMaterial('picked', this.scene);
        pickedMat.diffuseColor = new BABYLON.Color3(236/255, 194/255, 71/255); // 选中颜色
        pickedMat.alpha = 0.8;
    }


    loadCity(): void {
        this.engine.loadingUIText = '模型加载中...'
        const loadingManager:BABYLON.AssetsManager = new BABYLON.AssetsManager(this.scene);
        const meshTask = loadingManager.addMeshTask('load city', null, 'assets/obj/', 'city.obj');
        meshTask.onSuccess = task => {
            const { loadedMeshes } = task;
            this.meshes = loadedMeshes as BABYLON.Mesh[];
            this.meshes.forEach(mesh => {

                if (mesh.name.includes('main')) {
                    mesh.material = this.scene.getMaterialByName('main');
                    if (mesh.name.includes('room-1')) {
                        mesh.material = this.scene.getMaterialByName('room');
                        this.highLightLayer.addMesh(mesh, new BABYLON.Color3(252/255, 45/255, 57/255));
                    }
                }
                else if (mesh.name.includes('other')) {
                    mesh.material = this.scene.getMaterialByName('other');
                }
                else if (mesh.name.includes('road')) {
                    mesh.material = this.scene.getMaterialByName('road');
                }
            })
        }
        loadingManager.load();
    }

    onClick() {
        window.addEventListener('click', async () => {
            const res:any = this.scene.pick(this.scene.pointerX, this.scene.pointerY);
            if(res.hit) {
                // console.log(res.pickedMesh.name);
                console.log(res.pickedMesh.name)
                
                // res.pickedMesh.material.alpha = 1;
                // this.highLightLayer.addMesh(res.pickedMesh, new BABYLON.Color3(1,1,1));
                // console.log(this.highLightLayer);
            }
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