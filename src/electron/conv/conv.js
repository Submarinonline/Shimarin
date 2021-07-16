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

document.addEventListener('DOMContentLoaded', () => {
    gI('select').addEventListener('change', gen);

    gI('copy').addEventListener('click', () => {
        gI('output').select();
        document.execCommand('copy');
    });

    gI('clear').addEventListener('click', () => {
        gI('input').value = '';
        gI('output').value = '';
    });

    gI('input').addEventListener('input', gen);
    gI('output').addEventListener('click', () => gI('output').select());
});