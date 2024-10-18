const addToCartButtons = document.querySelectorAll('.add-to-cart');
let cart = JSON.parse(localStorage.getItem('cart')) || [];

addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const plan = button.getAttribute('data-plan');
        const price = parseInt(button.getAttribute('data-price'));

        const existingItem = cart.find(item => item.plan === plan);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ plan, price, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Plan agregado al carrito');
    });
});
