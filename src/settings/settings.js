function gI(id) { return document.getElementById(id); }
// function gC(c) { return document.getElementsByClassName(c); }
function setConfig(key, value) { window.parent.api.setConfig(key, value); }

document.addEventListener('DOMContentLoaded', function () {
    window.parent.api.getConfig('tab').then(v => {
        gI('tab-submarin').checked = !v?.submarin;
        gI('tab-conv').checked = !v?.conv;
        gI('tab-settings').checked = !v?.settings;
    });

    gI('save').addEventListener('click', function () {
        setConfig('tab.submarin', !gI('tab-submarin').checked);
        setConfig('tab.conv', !gI('tab-conv').checked);
        setConfig('tab.settings', !gI('tab-settings').checked);
    });
});