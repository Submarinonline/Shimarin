function gI(id) { return document.getElementById(id); }

function gen() {
    switch (gI('select').value) {
        case 'cjp': {
            window.parent.api.generateCjp(gI('input').value).then(result => { gI('output').value = result; });
            break;
        }
        case 'mhr': {
            window.parent.api.generateMhr(gI('input').value).then(result => { gI('output').value = result; });
            break;
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
    gI('select').addEventListener('change', function () { gen(); });

    gI('copy').addEventListener('click', function () {
        gI('output').select();
        document.execCommand('copy');
    });

    gI('clear').addEventListener('click', function () {
        gI('input').value = '';
        gI('output').value = '';
    });

    gI('input').addEventListener('input', function () { gen(); });
    gI('output').addEventListener('click', function () { this.select(); });
});