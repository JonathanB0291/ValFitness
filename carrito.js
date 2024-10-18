const preciosUSD = {
    fitness: 20,
    crossfit: 30,
    boxing: 25,
    yoga: 15
};

const conversiones = {
    USD: 1,
    EUR: 0.85,
    ARS: 350
};

document.getElementById('moneda').addEventListener('change', function() {
    const moneda = this.value;
    const precios = document.querySelectorAll('.precio');
    let total = 0;
    
    precios.forEach(precio => {
        const basePrice = precio.getAttribute('data-price');
        const precioConvertido = (basePrice * conversiones[moneda]).toFixed(2);
        precio.textContent = `${moneda} ${precioConvertido}`;
        total += parseFloat(precioConvertido);
    });

    document.getElementById('total').textContent = `${moneda} ${total.toFixed(2)}`;
});

function checkout() {
    alert('Compra finalizada. ¡Gracias por elegirnos!');
}
