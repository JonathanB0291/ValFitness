// Inicializamos un carrito vacío o lo cargamos desde el localStorage
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Datos de los planes disponibles
const planes = [
    { id: 1, nombre: "PLAN EXPRESS BASIC", precio: 80 },
    { id: 2, nombre: "PLAN PREMIUM 1", precio: 60 },
    { id: 3, nombre: "PLAN PREMIUM 2", precio: 60 },
    { id: 4, nombre: "PLAN PREMIUM DUO", precio: 90 },
    { id: 5, nombre: "PLAN EXCLUSIVE", precio: 400 },
];

// Función para agregar un plan al carrito
function agregarAlCarrito(planId) {
    const plan = planes.find(p => p.id === planId);
    if (plan) {
        carrito.push(plan);
        actualizarResumen(); // Actualiza el resumen de compra
        localStorage.setItem('carrito', JSON.stringify(carrito)); // Guarda el carrito en localStorage
    }
}

// Función para eliminar un plan del carrito
function eliminarDelCarrito(planId) {
    carrito = carrito.filter(p => p.id !== planId);
    actualizarResumen(); // Actualiza el resumen de compra
    localStorage.setItem('carrito', JSON.stringify(carrito)); // Guarda el carrito en localStorage
}

// Función para actualizar el resumen de la compra
function actualizarResumen() {
    const resumenTotal = document.getElementById('resumen-total');
    const resumenPlan = document.getElementById('resumen-plan');
    const resumenLista = document.getElementById('resumen-lista'); // Para mostrar la lista de productos

    // Limpiar el resumen de productos
    resumenLista.innerHTML = '';

    // Si el carrito está vacío
    if (carrito.length === 0) {
        resumenPlan.textContent = "No hay productos en el carrito.";
        resumenTotal.textContent = "€0";
    } else {
        // Mostrar los productos del carrito
        carrito.forEach(item => {
            let itemLista = document.createElement('p');
            itemLista.textContent = `${item.nombre} - €${item.precio.toFixed(2)} x 1`;  // Asegurarse de mostrar 1 por cada plan
            resumenLista.appendChild(itemLista);
        });

        // Calcular el total
        let total = carrito.reduce((acc, item) => acc + item.precio, 0);

        // Actualizar el resumen
        resumenPlan.textContent = `Planes seleccionados: ${carrito.length}`;
        resumenTotal.textContent = `Total a pagar: €${total.toFixed(2)}`;  // Mostrar el total con 2 decimales
    }
}

// Función para vaciar el carrito
function vaciarCarrito() {
    carrito = [];  // Vaciar el carrito
    actualizarResumen(); // Actualizar el resumen
    localStorage.setItem('carrito', JSON.stringify(carrito)); // Guardar el carrito vacío en localStorage
    limpiarFormulario(); // Limpiar el formulario
}

// Función para limpiar los campos del formulario de checkout
function limpiarFormulario() {
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('address').value = '';
    document.getElementById('card-number').value = '';
    document.getElementById('expiry-date').value = '';
    document.getElementById('cvv').value = '';
}

// Función para inicializar los botones de agregar al carrito
function inicializarBotones() {
    document.getElementById('btn-plan-express-basic').addEventListener('click', () => agregarAlCarrito(1));
    document.getElementById('btn-plan-premium-1').addEventListener('click', () => agregarAlCarrito(2));
    document.getElementById('btn-plan-premium-2').addEventListener('click', () => agregarAlCarrito(3));
    document.getElementById('btn-plan-premium-duo').addEventListener('click', () => agregarAlCarrito(4));
    document.getElementById('btn-plan-exclusive').addEventListener('click', () => agregarAlCarrito(5));
}

// Llamada inicial para mostrar el resumen al cargar la página
document.addEventListener("DOMContentLoaded", function() {
    actualizarResumen();  // Llamada inicial para actualizar el resumen
    inicializarBotones(); // Inicializa los botones
});
