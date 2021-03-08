document.addEventListener('DOMContentLoaded', function () {
    for (const tab of document.getElementsByClassName('titlebar-tab')) {
        tab.addEventListener('click', function () {
            if (this.classList.contains('titlebar-tab-active')) return;
            document.getElementsByClassName('titlebar-tab-active')[0].classList.remove('titlebar-tab-active');
            this.classList.add('titlebar-tab-active');
            document.getElementsByClassName('main-cont-show')[0].classList.remove('main-cont-show');
            document.getElementById(`cont-${this.id}`).classList.add('main-cont-show');
        });
    }

    document.getElementById('window-ctl-close').addEventListener('click', function () { window.api.close(); });
    document.getElementById('window-ctl-restore').addEventListener('click', function () { window.api.restore(); });
    document.getElementById('window-ctl-max').addEventListener('click', function () { window.api.max(); });
    document.getElementById('window-ctl-min').addEventListener('click', function () { window.api.min(); });

    document.getElementById('conv-select').addEventListener('change', function () {
        document.getElementById('conv-frame').className = `selected-${this.value}`;
    });

    document.getElementById('conv-input').addEventListener('input', function () {
        const ele = document.getElementById('conv-frame');
        if (ele.classList.contains('selected-cjp')) {
            window.api.genCjp(this.value).then(result => {
                document.getElementById('conv-output').value = result;
            });
        } else if (ele.classList.contains('selected-mhr')) {
            window.api.genMhr(this.value).then(result => {
                document.getElementById('conv-output').value = result;
            });
        }
    });
    document.getElementById('conv-output').addEventListener('click', function () { this.select(); });

    window.api.maximize(() => {
        document.getElementById('window-ctl-max').classList.remove('window-ctl-show');
        document.getElementById('window-ctl-restore').classList.add('window-ctl-show');
    });

    window.api.unmaximize(() => {
        document.getElementById('window-ctl-max').classList.add('window-ctl-show');
        document.getElementById('window-ctl-restore').classList.remove('window-ctl-show');
    });

    window.api.enterFullScreen(() => {
        document.body.classList.add('fullscreen');
    });

    window.api.leaveFullScreen(() => {
        document.body.classList.remove('fullscreen');
    });

    window.api.contentLoaded();
});