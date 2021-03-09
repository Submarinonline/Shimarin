document.addEventListener('DOMContentLoaded', function () {
    for (const tab of document.getElementsByClassName('titlebar-tab')) {
        tab.addEventListener('click', function () {
            if (this.classList.contains('titlebar-tab-active')) return;
            document.getElementsByClassName('titlebar-tab-active')[0].classList.remove('titlebar-tab-active');
            this.classList.add('titlebar-tab-active');
            document.getElementsByClassName('main-cont-show')[0].classList.remove('main-cont-show');
            getElement(`cont-${this.id}`).classList.add('main-cont-show');
        });
    }

    getElement('window-ctl-close').addEventListener('click', function () { window.api.close(); });
    getElement('window-ctl-restore').addEventListener('click', function () { window.api.restore(); });
    getElement('window-ctl-max').addEventListener('click', function () { window.api.max(); });
    getElement('window-ctl-min').addEventListener('click', function () { window.api.min(); });

    getElement('conv-select').addEventListener('change', function () {
        getElement('conv-frame').className = `selected-${this.value}`;
        gen();
    });

    getElement('conv-copy').addEventListener('click', function () {
        getElement('conv-output').select();
        document.execCommand('copy');
    });

    getElement('conv-clear').addEventListener('click', function () {
        getElement('conv-input').value = '';
        getElement('conv-output').value = '';
    });

    getElement('conv-input').addEventListener('input', function () { gen(); });
    getElement('conv-output').addEventListener('click', function () { this.select(); });

    window.api.maximize(() => {
        getElement('window-ctl-max').classList.remove('window-ctl-show');
        getElement('window-ctl-restore').classList.add('window-ctl-show');
    });

    window.api.unmaximize(() => {
        getElement('window-ctl-max').classList.add('window-ctl-show');
        getElement('window-ctl-restore').classList.remove('window-ctl-show');
    });

    window.api.enterFullScreen(() => { document.body.classList.add('fullscreen'); });

    window.api.leaveFullScreen(() => { document.body.classList.remove('fullscreen'); });

    window.api.contentLoaded();
});

function getElement(id) { return document.getElementById(id); }

function gen() {
    const cf = getElement('conv-frame');
    const ci = getElement('conv-input');
    if (cf.classList.contains('selected-cjp')) {
        window.api.genCjp(ci.value).then(result => {
            getElement('conv-output').value = result;
        });
    } else if (cf.classList.contains('selected-mhr')) {
        window.api.genMhr(ci.value).then(result => {
            getElement('conv-output').value = result;
        });
    }
}