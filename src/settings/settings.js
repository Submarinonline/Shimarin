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
                    div.appendChild(checkbox);

                    const span = document.createElement('span');
                    span.appendChild(document.createTextNode(obj.text));
                    div.appendChild(span);

                    resetFunc.push(() => {
                        resetConfig(key);
                        getConfig(key).then(v => checkbox.checked = v);
                    });

                    root.appendChild(div);
                }
            }
        }

        reset.addEventListener('click', () => resetFunc.forEach(func => func()));
        reset.appendChild(document.createTextNode('リセット'));
        root.appendChild(reset);

        gI('main').appendChild(root);
    });
});