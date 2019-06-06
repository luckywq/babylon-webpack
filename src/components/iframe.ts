export default class TestFactory {

    private _frame: HTMLIFrameElement;
    private _cccc: number = 0;
    constructor(name: string) {
        this._frame = document.createElement('iframe');
        this._frame.src = 'http://192.168.1.78:9527/scada.html';
        this._frame.style.width = '100%';
        this._frame.style.height = '100%';
        this._frame.style.zIndex = '10';
        this._frame.style.left = '0px';
        this._frame.style.top = '0px';
        this._frame.style.position = 'absolute';
        this._frame.style.border = 'none'
        document.body.appendChild(this._frame);

        this.reciveMsgFromChild();
    }

    render() {
        this.initMsgToParent();
    }

    initMsgToParent () {
        const msg = {
            app_id: '5ce503534a560c0c186e2b05',
            scada_id: '5cf8c11d024f2a3164f68db6',
            type: 3
        }

        // (<Window>this._frame.contentWindow).
        this._frame.addEventListener('load', () => {
            const window = this._frame.contentWindow as Window;
            window.postMessage(msg, '*');
        })
    }

    reciveMsgFromChild () {
        window.addEventListener('message', e => {
            if(e.data.pick) {

                this._cccc +=1;

                const msg = {
                    type: 4,
                    label: {
                        link_mesh:e.data.name,
                        data: {
                            title: `这是一个标题${this._cccc}`,
                            content: [
                                {
                                    text: '温度\xa0\xa0\xa0\xa020℃',
                                },
                                {
                                    text: '温度\xa0\xa0\xa0\xa030%',
                                }
                            ]
                        },
                    }
                }

                const window = this._frame.contentWindow as Window;
                window.postMessage(msg, '*');
            }
        })
    }
}