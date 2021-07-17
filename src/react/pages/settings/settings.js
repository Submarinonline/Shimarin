import { toElectronAccelerator } from '../modules/key.js';

function gI(id) { return document.getElementById(id); }
// function gC(c) { return document.getElementsByClassName(c); }
function setConfig(key, value) { window.parent.api.setConfig(key, value); }
function resetConfig(key) { window.parent.api.resetConfig(key); }
function getConfig(key) { return window.parent.api.getConfig(key); }

document.addEventListener('DOMContentLoaded', () => {
    const settings = [
        {
            text: 'タブ',
            item: {
                'tab.submarin': {
                    type: 'checkbox',
                    text: 'Submarin'
                },
                'tab.conv': {
                    type: 'checkbox',
                    text: '変換'
                },
                'tab.settings': {
                    type: 'checkbox',
                    text: '設定'
                }
            }
        },
        {
            text: 'キー設定',
            item: {
                'keyBind.quit': {
                    type: 'keyBind',
                    text: 'ウィンドウを閉じる'
                },
                'keyBind.reload': {
                    type: 'keyBind',
                    text: 'リロード'
                },
                'keyBind.fullscreen': {
                    type: 'keyBind',
                    text: 'フルスクリーン切り替え'
                },
                'keyBind.devtools': {
                    type: 'keyBind',
                    text: 'DevToolsを開く/閉じる'
                },
                'keyBind.submarin': {
                    type: 'keyBind',
                    text: 'Submarinのページを開く'
                },
                'keyBind.convert': {
                    type: 'keyBind',
                    text: '変換のページを開く'
                },
                'keyBind.settings': {
                    type: 'keyBind',
                    text: '設定のページを開く'
                }
            }
        }
    ];



    settings.forEach(async c => {
        const root = document.createElement('div');
        const reset = document.createElement('button');
        const resetFunc = [];

        root.insertAdjacentHTML('beforeend', `<h3>${c.text}</h3>`);

        for (const [key, obj] of Object.entries(c.item)) {
            switch (obj.type) {
                case 'checkbox': {
                    const div = document.createElement('div');

                    const checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';
                    checkbox.id = key;
                    checkbox.checked = await getConfig(key);
                    checkbox.addEventListener('change', () => setConfig(key, checkbox.checked));

                    const text = document.createElement('span');
                    text.appendChild(document.createTextNode(obj.text));

                    resetFunc.push(() => {
                        resetConfig(key);
                        getConfig(key).then(v => checkbox.checked = v);
                    });

                    div.appendChild(checkbox);
                    div.appendChild(text);

                    root.appendChild(div);
                    break;
                }
                case 'keyBind': {
                    const div = document.createElement('div');
                    const table = document.createElement('table');
                    const addRow = (str) => {
                        const row = table.insertRow(-1);
                        const tCell = row.insertCell(-1);
                        const dCell = row.insertCell(-1);
                        tCell.appendChild(document.createTextNode(str));
                        dCell.appendChild(document.createTextNode('削除'));
                        dCell.classList.add('del-cell');
                        dCell.addEventListener('click', async () => {
                            const text = tCell.textContent;
                            const conf = await getConfig(key);
                            setConfig(key, conf.filter(k => k !== text));
                            row.remove();
                        });
                    };
                    const initTable = async () => {
                        const conf = await getConfig(key);
                        conf.forEach(k => {
                            addRow(k);
                        });
                    };

                    const text = document.createElement('span');
                    text.appendChild(document.createTextNode(obj.text));

                    const input = document.createElement('input');
                    //input.classList.add('key-input');
                    input.readOnly = true;
                    input.addEventListener('keyup', (e) => {
                        const accelerator = toElectronAccelerator(e);
                        if (!accelerator) return;
                        input.value = accelerator;
                    });
                    input.addEventListener('blur', () => {
                        window.parent.api.enableShortcuts();
                    });
                    input.addEventListener('focus', () => {
                        window.parent.api.disableShortcuts();
                    });

                    const button = document.createElement('button');
                    button.appendChild(document.createTextNode('追加'));
                    button.addEventListener('click', async () => {
                        if (!input.value) return;
                        const conf = await getConfig(key);
                        conf.push(input.value);
                        setConfig(key, conf);
                        addRow(input.value);
                        input.value = '';
                    });

                    initTable();

                    resetFunc.push(() => {
                        input.value = '';
                        resetConfig(key);
                        table.childNodes.forEach(n => n.remove());
                        initTable();
                    });

                    div.appendChild(text);
                    div.appendChild(input);
                    div.appendChild(button);
                    div.appendChild(table);

                    root.appendChild(div);
                    break;
                }
            }
        }

        reset.addEventListener('click', () => resetFunc.forEach(func => func()));
        reset.appendChild(document.createTextNode('リセット'));
        root.appendChild(reset);

        gI('main').appendChild(root);
    });
});