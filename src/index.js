document.addEventListener('DOMContentLoaded', function () {
    // Tab
    for (const tab of gC('titlebar-tab')) {
        tab.addEventListener('click', function () {
            if (this.classList.contains('titlebar-tab-active')) return;
            gC('titlebar-tab-active')[0].classList.remove('titlebar-tab-active');
            this.classList.add('titlebar-tab-active');
            gC('main-cont-show')[0].classList.remove('main-cont-show');
            gI(`cont-${this.id}`).classList.add('main-cont-show');
        });
    }


    // Window Control
    gI('window-ctl-close').addEventListener('click', function () { window.api.close(); });
    gI('window-ctl-restore').addEventListener('click', function () { window.api.restore(); });
    gI('window-ctl-max').addEventListener('click', function () { window.api.max(); });
    gI('window-ctl-min').addEventListener('click', function () { window.api.min(); });

    window.api.maximize(() => {
        gI('window-ctl-max').classList.remove('window-ctl-show');
        gI('window-ctl-restore').classList.add('window-ctl-show');
    });

    window.api.unmaximize(() => {
        gI('window-ctl-max').classList.add('window-ctl-show');
        gI('window-ctl-restore').classList.remove('window-ctl-show');
    });


    // 変換
    gI('conv-select').addEventListener('change', function () { gen(); });

    gI('conv-copy').addEventListener('click', function () {
        gI('conv-output').select();
        document.execCommand('copy');
    });

    gI('conv-clear').addEventListener('click', function () {
        gI('conv-input').value = '';
        gI('conv-output').value = '';
    });

    gI('conv-input').addEventListener('input', function () { gen(); });
    gI('conv-output').addEventListener('click', function () { this.select(); });


    // FullScreen
    window.api.enterFullScreen(() => { document.body.classList.add('fullscreen'); });
    window.api.leaveFullScreen(() => { document.body.classList.remove('fullscreen'); });


    window.api.contentLoaded();
});

function gI(id) { return document.getElementById(id); }
function gC(c) { return document.getElementsByClassName(c); }

function gen() {
    switch (gI('conv-select').value) {
        case 'cjp': {
            window.api.genCjp(gI('conv-input').value).then(result => { gI('conv-output').value = result; });
            break;
        }
        case 'mhr': {
            window.api.genMhr(gI('conv-input').value).then(result => { gI('conv-output').value = result; });
            break;
        }
    }
}