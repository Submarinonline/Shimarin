document.addEventListener('DOMContentLoaded', function () {
    for (var tab of document.getElementsByClassName('titlebar-tab')) {
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

    document.getElementById('cjp-input').addEventListener('input', function () { window.api.genCjp(this.value); });
    document.getElementById('cjp-output').addEventListener('click', function () { this.select(); });

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
    
    window.api.outCjp((str) => {
        document.getElementById('cjp-output').value = str;
    });

    window.api.contentLoaded();
});