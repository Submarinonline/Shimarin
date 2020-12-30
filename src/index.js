document.addEventListener('DOMContentLoaded', function () {
    for (var tab of document.getElementsByClassName('tab')) {
        tab.addEventListener('click', function () {
            if (this.classList.contains('active')) return;
            document.getElementsByClassName('active')[0].classList.remove('active');
            this.classList.add('active')
            document.getElementsByClassName('show')[0].classList.remove('show');
            document.getElementById(`cont-${this.id}`).classList.add('show')
        })
    }

    document.getElementById('close').addEventListener('click', function () { window.api.close() })
    document.getElementById('restore').addEventListener('click', function () { window.api.restore() })
    document.getElementById('max').addEventListener('click', function () { window.api.max() })
    document.getElementById('min').addEventListener('click', function () { window.api.min() })
})

window.api.maximize(() => {
    document.getElementById('max').classList.remove('show-btn')
    document.getElementById('restore').classList.add('show-btn')
})

window.api.unmaximize(() => {
    document.getElementById('max').classList.add('show-btn')
    document.getElementById('restore').classList.remove('show-btn')
})

window.api.enterFullScreen(() => {
    document.body.classList.add('fullscreen')
})

window.api.leaveFullScreen(() => {
    document.body.classList.remove('fullscreen')
})