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
            if(msg.type === 3) {
                let a = false;
                setInterval(() => {
                    a = !a;
                    /**
                     *handle
                     1: showlabel
                     2. hidelabel
                     3. updateTxt
                     4. color
                    */
                    window.postMessage({
                        type: 5,
                        handle: a ? 1 : 2,
                        mesh: 'add__arrow_blue'
                    }, '*');

                    window.postMessage({
                        type: 5,
                        handle: 4,
                        mesh: 'add__exchanger',
                        data: a? '#ffff00' : '#00cccc'
                    }, '*');
                    window.postMessage({
                        type: 5,
                        handle: 3,
                        mesh: 'add__arrow_blue-2',
                        data: a ? [
                            {
                                text: '温度\xa0\xa0\xa0\xa020℃',
                            },
                            {
                                text: '温度\xa0\xa0\xa0\xa030%',
                            }
                        ] : [
                            {
                                text: '温度\xa0\xa0\xa0\xa030℃',
                            },
                            {
                                text: '温度\xa0\xa0\xa0\xa040%',
                                color: 'green'
                            }
                        ]
                    }, '*');
                }, 3000)
            }
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
                                    color: 'green'
                                }
                            ]
                        },
                    }
                }

                const window = this._frame.contentWindow as Window;
                window.postMessage(msg, '*');
            }

            if(e.data.bind) {
                alert(e.data.scada_id);
                //e.data.scada_id
                // 业务系统需要将这个scada_id 绑定到当前配置组态的对象上。比如数据库关联
            }
        })
    }
}