document.addEventListener('DOMContentLoaded', function () {
    const cartas = [1,2,3,4,5,6,7,8,9,10,11,12,13];

    // Función para barajar las cartas en el arreglo
    function barajar(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Función para crear una carta con un valor y un índice dado
    function crearCarta(valor, indice) {
        const carta = document.createElement('div');
        carta.classList.add('carta');
        carta.dataset.indice = indice;
        carta.innerHTML = valor;
        carta.addEventListener('click', voltearCarta);
        return carta;
    }

    // Función para inicializar el juego
    function inicializarJuego() {
        barajar(cartas);
        const juegoDeMemoria = document.querySelector('.juego-de-memoria');

        cartas.forEach((carta, indice) => {
            const nuevaCarta = crearCarta(carta, indice);
            juegoDeMemoria.appendChild(nuevaCarta);
        });
    }

    // Función para voltear una carta cuando se hace clic
    function voltearCarta() {
        if (cartasVolteadas.length < 2 && !cartasVolteadas.includes(this)) {
            this.classList.add('volteada');
            cartasVolteadas.push(this);

            if (cartasVolteadas.length === 2) {
                setTimeout(verificarEmparejamiento, 500);
            }
        }
    }

    // Función para verificar si las cartas volteadas coinciden
    function verificarEmparejamiento() {
        const [carta1, carta2] = cartasVolteadas;
        if (carta1.innerHTML === carta2.innerHTML) {
            carta1.classList.add('emparejada');
            carta2.classList.add('emparejada');
            cartasEmparejadas.push(carta1, carta2);
            verificarVictoria();
        } else {
            carta1.classList.remove('volteada');
            carta2.classList.remove('volteada');
        }

        cartasVolteadas = [];
    }

    // Función para verificar si el jugador ha ganado el juego
    function verificarVictoria() {
        if (cartasEmparejadas.length === cartas.length) {
            alert('¡Has ganado!');
            reiniciarJuego();
        }
    }

    // Función para reiniciar el juego
    function reiniciarJuego() {
        cartasVolteadas = [];
        cartasEmparejadas = [];
        const juegoDeMemoria = document.querySelector('.juego-de-memoria');
        juegoDeMemoria.innerHTML = '';
        inicializarJuego();
    }

    // Inicializar el juego cuando se carga la página
    inicializarJuego();
});
