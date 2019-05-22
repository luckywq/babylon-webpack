


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
    private _utilLayer: BABYLON.UtilityLayerRenderer;
    constructor(ele:string) {
        this.canvas = document.querySelector(ele) as HTMLCanvasElement;
        
        this.engine = new BABYLON.Engine(this.canvas, true, { stencil: true }, true);
        this.scene = new BABYLON.Scene(this.engine);
        this.scene.clearColor = new BABYLON.Color4(6/255, 22/255, 37/255, 1);
        this._utilLayer = new BABYLON.UtilityLayerRenderer(this.scene);
        this.camera = new BABYLON.ArcRotateCamera('camera', -0.5, 1.2, 10, BABYLON.Vector3.Zero(), this.scene)
        this.light = new BABYLON.HemisphericLight('hLight', new BABYLON.Vector3(1, 1, 0), this.scene);
        this.camera.attachControl(this.canvas, true);
        this.create();
    }

    private create() {
        const box2 = BABYLON.Mesh.CreateBox('box',1,this.scene);
        const mat2 = new BABYLON.StandardMaterial('mat',this.scene);
        mat2.diffuseColor = new BABYLON.Color3(1,0,1);


        var v3 = new BABYLON.Vector3(1,1,1);
        var quat2 = new BABYLON.Quaternion(0,0,0,1);
        this.eulerToQuaternion(v3,quat2);
        // box2.rotationQuaternion = quat2;
        box2.rotationQuaternion = BABYLON.Quaternion.FromArray([-0.08490338470130929, 0.5504358912246221, 0.22595804652311344, 0.7992213123593966]);
        this.initControl(box2);

        window.addEventListener('keydown', (e) => {
            // console.log(e.keyCode);
            if(e.keyCode === 87) {
                box2.rotation.x += 0.01;
            }
            if(e.keyCode === 83) {
                box2.rotation.x -= 0.01;
            }

            if(e.keyCode === 13) {
                console.log(box2.rotation);
                //@ts-ignore
                console.log(box2.rotationQuaternion.asArray());
            }
        })
    }

    private initControl (box: BABYLON.Mesh) {
        const gizmo = new BABYLON.RotationGizmo(this._utilLayer);
        gizmo.updateGizmoRotationToMatchAttachedMesh = false;
        gizmo.updateGizmoPositionToMatchAttachedMesh = true;
        gizmo.attachedMesh = box;
    }
    // @ts-ignore
    private clamp( value, min, max ) {
        return Math.max( min, Math.min( max, value )  );
    }
    //@ts-ignore
    private quaternionToEuler(q,euler){
        var x = q.x, y = q.y, z = q.z, w = q.w;
        var x2 = x + x, y2 = y + y, z2 = z + z;
        var xx = x * x2, xy = x * y2, xz = x * z2;
        var yy = y * y2, yz = y * z2, zz = z * z2;
        var wx = w * x2, wy = w * y2, wz = w * z2;

        var te0 = 1 - ( yy + zz );
        var te4 = xy - wz;
        var te8 = xz + wy;

        var te1 = xy + wz;
        var te5 = 1 - ( xx + zz );
        var te9 = yz - wx;

        var te2 = xz - wy;
        var te6 = yz + wx;
        var te10 = 1 - ( xx + yy );

        euler.y = Math.asin( this.clamp(te8, - 1, 1 ) );

        if ( Math.abs( te8 ) < 0.99999 ) {

            euler.x = Math.atan2( - te9, te10 );
            euler.z = Math.atan2( - te4, te0 );

        } else {
            euler.x = Math.atan2( te6, te5 );
            euler.z = 0;
        }
    }
    // @ts-ignore
    private eulerToQuaternion(euler,qt){
        var x = euler.x, y = euler.y, z = euler.z;
        var cos = Math.cos;
        var sin = Math.sin;

        var c1 = cos( x / 2 );
        var c2 = cos( y / 2 );
        var c3 = cos( z / 2 );

        var s1 = sin( x / 2 );
        var s2 = sin( y / 2 );
        var s3 = sin( z / 2 );

        qt.x = s1 * c2 * c3 + c1 * s2 * s3;
        qt.y = c1 * s2 * c3 - s1 * c2 * s3;
        qt.z = c1 * c2 * s3 + s1 * s2 * c3;
        qt.w = c1 * c2 * c3 - s1 * s2 * s3;
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