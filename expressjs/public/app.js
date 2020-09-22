document.querySelectorAll(".price").forEach(elem => {
    elem.textContent = new Intl.NumberFormat("ru-Ru",{
        currency : "rub",
        style : "currency"
    }).format(elem.textContent)
})