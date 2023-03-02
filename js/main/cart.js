async function listCart() {
    const itemsList = JSON.parse(localStorage.getItem('cart'));
    const container = document.getElementsByClassName('container')[0];
    if (!(localStorage.getItem('cart'))){localStorage.setItem('cart', JSON.stringify(''));location.reload(   )} else {
        const response = await fetch('item.json');
        const items = await response.json();
    
        let cardsHtml = '';
    
        if (itemsList.length === 0) {
        container.innerHTML = `<p style="text-align: center">There's nothing in the cart for now...</p>`;
        } else {
        const itemIdArray = itemsList.split(',').map(id => id.trim());
        for (const itemId of itemIdArray) {
            const itemImg = `./img/prod/${itemId}.png`;
            const itemName = items[itemId];
    
            const cardHtml = `
    <div class="card" style="width: 18rem;">
        <div class="card-body">
            <p class="card-text"><img src="${itemImg}" style="width: 20%;">   ${itemName}</p>
        </div>
    </div>
    `;
            cardsHtml += cardHtml;
        }
    
        container.innerHTML = cardsHtml;
        }
    }
}

listCart()