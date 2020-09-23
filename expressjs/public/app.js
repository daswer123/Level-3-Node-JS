const toCurrency = (price) => {
    return new Intl.NumberFormat("ru-Ru",{
        currency : "rub",
        style : "currency"
    }).format(price)
}

document.querySelectorAll(".price").forEach(elem => {
    elem.textContent = toCurrency(elem.textContent)
})

const cart = document.querySelector("#cart")

if (cart){
    cart.addEventListener("click",(e)=>{
        if(e.target.classList.contains("js-remove")){
            const id = e.target.dataset.id;
            
            fetch("/cart/remove/"+id,{
                method : "DELETE",
            })
            .then(res => res.json())
            .then(result =>{
                console.log(result.courses.length)
               if(result.courses.length){
                   html = result.courses.map(course => {
                    return  `
                    <tr>
                         <td>${course.title}</td>
                         <td>${course.count}</td>
                         <td><button class="btn btn-primary js-remove" data-id="${course.id}">Delete</button></td>
                    </tr>
                    `
                   }).join("")
                   cart.querySelector("tbody").innerHTML = html
                   cart.querySelector(".price").textContent = toCurrency(result.price)
                    
               } else{
                   cart.innerHTML = `<p>Корзина пуста</p>`
               }
            })    
        }
    })
}
