
document.querySelectorAll('.pedir').forEach(button => {
    button.addEventListener('click', function () {
        const itemElement = button.parentElement;
        const itemName = itemElement.querySelector('h3').innerText;
        const itemPrice = itemElement.querySelector('h4').innerText;

        let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        cartItems.push({ name: itemName, price: itemPrice });
        localStorage.setItem('cart', JSON.stringify(cartItems));

        alert(`${itemName} foi adicionado ao carrinho!`);
        atualizarCarrinho();
    });
});

window.onload = atualizarCarrinho;

function atualizarCarrinho() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.querySelector('.card-items');
    const totalElement = document.querySelector('.total');
    let total = 0;

    cartContainer.innerHTML = '';

    cartItems.forEach(item => {
        const cardItem = document.createElement('div');
        cardItem.className = 'card-item';
        cardItem.innerHTML = `<p>${item.name}</p> <p>Preço: ${item.price}</p> <button onclick="removerDoCarrinho(this)">Remover</button>`;
        cartContainer.appendChild(cardItem);

        total += parseFloat(item.price.replace('R$', '').replace(',', '.'));
    });

    totalElement.innerText = `Total: R$ ${total.toFixed(2)}`;

}

function removerDoCarrinho(button) {
    const itemElement = button.parentElement;
    const itemName = itemElement.querySelector('p').innerText;

    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    cartItems = cartItems.filter(item => item.name !== itemName);
    localStorage.setItem('cart', JSON.stringify(cartItems));

    itemElement.remove();

    atualizarCarrinho();
}
