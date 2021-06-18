document.addEventListener('DOMContentLoaded', function () {
    // Tab
    for (const tab of gC('tab')) {
        tab.addEventListener('click', function () {
            if (this.classList.contains('tab-active')) return;
            gC('tab-active')[0].classList.remove('tab-active');
            this.classList.add('tab-active');
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


    // FullScreen
    window.api.enterFullScreen(() => { document.body.classList.add('fullscreen'); });
    window.api.leaveFullScreen(() => { document.body.classList.remove('fullscreen'); });


    window.api.contentLoaded();
});

function gI(id) { return document.getElementById(id); }
function gC(c) { return document.getElementsByClassName(c); }