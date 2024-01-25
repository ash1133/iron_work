;
document.addEventListener("DOMContentLoaded", function() {
    let popupBg = document.querySelector('[data-popup-bg]');
    let popup = document.querySelector('[data-popup]');
    let openPopupButtons = document.querySelectorAll('[data-open-popup]');
    let closePopupButton = document.querySelector('[data-close-popup]');

    document.addEventListener('click', (e) => {
        if (e.target === popupBg) {
            popupBg.classList.remove('active');
            popup.classList.remove('active');
        }
    });
    closePopupButton.addEventListener('click', () => {
        popupBg.classList.remove('active');
        popup.classList.remove('active');
    });

    openPopupButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            popupBg.classList.add('active');
            popup.classList.add('active');
        })
    });
})


;