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
})