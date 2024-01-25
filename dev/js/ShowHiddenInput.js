;
function ShowHiddenInput(_dataSelector){
    const tg = event.target,
        elem = document.querySelector('[data-hidden-input="'+_dataSelector+'"]')

    if (tg.type === 'checkbox' || tg.type === 'radio'){
        if (tg.checked) {
            elem.classList.add('active')
        } else {
            elem.classList.remove('active')
        }
    }
}
;