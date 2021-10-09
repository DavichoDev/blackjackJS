/**
 * 2C Clubs
 * 2D Diamonds
 * 2H Hearts
 * 2S Spades
 */

let deck = [];
const tipos = ['C', 'H', 'S', 'D'];
const especiales = ['A', 'J', 'Q', 'K'];


let puntosJugador = 0;
let puntosComputadora = 0;

// Referencias del HTML
const btnPedir = document.querySelector('#btnPedir');
const smalls = document.getElementsByTagName('small');
const divJugadorCartas = document.getElementById('jugador-cartas');

// Esta funcion crea una nueva baraja.
const crearDeck = () => {
    for (let i = 2; i <= 10; i++) {
        for (const tipo of tipos) {
            deck.push( i + tipo );    
        }
    }        
    for (let tipo  of tipos) {
        for (let especial of especiales) {
            deck.push( especial + tipo );    
        }
    }
    deck = _.shuffle(deck);
    return deck;
};

// Esta funcion me permite tomar una carta.
const pedirCarta = () => {

    if (deck.length === 0) { throw 'No hay cartas en el Deck'; }
    let carta = deck.pop();
    return carta;
};

// Esta funcion regresa el valor numerico de la carta.
const valorCarta = ( carta ) => {
    const valor = carta.substring( 0, carta.length - 1 );
    return ( isNaN( valor ) ) ? 
        ( valor === 'A' ) ? 11 : 10 : Number.parseInt(valor);
};

crearDeck();

// Eventos

btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();
    puntosJugador += valorCarta(carta);

    smalls[0].innerText = puntosJugador;

    let cartaNueva = document.createElement('img');
    cartaNueva.src = `assets/cartas/${ carta }.png`;
    cartaNueva.classList.add('carta');
    divJugadorCartas.append(cartaNueva);

    if (puntosJugador > 21) {
        console.warn('¡Has perdido!');
        btnPedir.disabled = true;
    } else if (puntosJugador === 21) {
        console.warn('Genial!');
        btnPedir.disabled = true;
    }
});
