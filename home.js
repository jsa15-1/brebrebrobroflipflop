function addToCart(item) {
    localStorage.setItem('cart', JSON.stringify((JSON.parse(localStorage.getItem('cart'))) + item))
}