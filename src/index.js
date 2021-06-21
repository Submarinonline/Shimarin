function gI(id) { return document.getElementById(id); }
function gC(c) { return document.getElementsByClassName(c); }
function activate(id) {
    const tab = gI(id);
    if (tab.classList.contains('tab-active')) return;
    gC('tab-active')[0].classList.remove('tab-active');
    tab.classList.add('tab-active');
    gC('main-cont-show')[0].classList.remove('main-cont-show');
    gI(`cont-${tab.id}`).classList.add('main-cont-show');
}

document.addEventListener('DOMContentLoaded', function () {
    for (const tab of gC('tab')) {
        tab.addEventListener('click', function () { activate(this.id); });
    }

    window.api.activateSubmarin(() => { activate('submarin'); });
    window.api.activateConvert(() => { activate('conv'); });
    window.api.activateSettings(() => { activate('settings'); });


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


    window.api.enterFullScreen(() => { document.body.classList.add('fullscreen'); });
    window.api.leaveFullScreen(() => { document.body.classList.remove('fullscreen'); });


    window.api.contentLoaded();
});