// ===== VARIABLES
let baseUrl = 'https://pokeapi.co/api/v2/pokemon/'

// Gera um número inteiro aleatório entre 1 e 898
function getRandomPokemon() {
    min = Math.ceil(1);
    max = Math.floor(150);
    return Math.floor(Math.random() * (max - min)) + min;
}

// Carrega o card da sorte
async function showPokemon(id) {
    let pokemonData = {};

    await fetch(baseUrl + id)
        .then(response => response.json())
        .then(data => {
            pokemonData.id = data.id
            pokemonData.name = data.name
            pokemonData.types = data.types.map(types => { return types.type.name; })
            pokemonData.image = "https://assets.pokemon.com/assets/cms2/img/pokedex/full/" + ("00" + id).slice(-3) + ".png"
            id = ("00" + id).slice(-3)
        })
        .catch(() => {
            console.log("Error request pokémon. Id: " + id)
        })

    console.log(pokemonData.id)
    console.log(pokemonData.name)
    console.log(pokemonData.types[0])
    return pokemonData;
}

var pokemonOnScreen = []

//primeira chamada para iniciar o jogo
dadosPokemon()

// Função que escreve o pokemon na tela e reseta as dicas
async function dadosPokemon(){
    pokemonOnScreen = await showPokemon(getRandomPokemon())
    
    let containerMain = document.querySelector('#imagem-pokemon')
    containerMain.innerHTML = ` <img class="card-imagempokemonMedium" id="filtro" src="${pokemonOnScreen.image}" >`

    let moneyPlayer = document.querySelector('.money-player')
    moneyPlayer.innerHTML = `${currentPlayerMoney}`
    
    let scorePlayer = document.querySelector('.container-score')
    scorePlayer.innerHTML = `PONTOS : ${cureentPlayerScore}`

    if (hintOneShow == true){
        var hintOne = document.querySelector('#hint-one')
        hintOne.innerHTML = ''

        var hintOneOriginal = document.querySelector('#hint-one-original')
        hintOneOriginal.classList.remove('hidden-hint')

        var buttonHintOne = document.getElementById('button-hint-one')
        buttonHintOne.classList.remove('button-used')

        hintOneShow = false
    }
    
    if (hintTwoShow == true){
        var hintTwo = document.querySelector('#hint-two')
        hintTwo.innerHTML = ''

        var hintTwoOriginal = document.querySelector('#hint-two-original')
        hintTwoOriginal.classList.remove('hidden-hint')

        var buttonHintTwo = document.getElementById('button-hint-two')
        buttonHintTwo.classList.remove('button-used')

        hintTwoShow = false
    }

    if (hintThreeShow == true){
        var hintThree = document.querySelector('#hint-three')
        hintThree.innerHTML = ''

        var hintThreeOriginal = document.querySelector('#hint-three-original')
        hintThreeOriginal.classList.remove('hidden-hint')

        var buttonHintThree = document.getElementById('button-hint-three')
        buttonHintThree.classList.remove('button-used')

        hintThreeShow = false
    }
}

var hintTwoShow = false
var hintThreeShow = false
var hintOneShow = false

//Geracoes de pokemon
var Geracoes = {
    1: {
        inicio: 1,
        fim: 151,
    },
    2: {
        inicio: 152,
        fim: 251,
    },
    3: {
        inicio: 252,
        fim: 386,
    },
    4: {
        inicio: 387,
        fim: 493,
    },
    5: {
        inicio: 494,
        fim: 649,
    },
    6: {
        inicio: 650,
        fim: 721,
    },
    7: {
        inicio: 722,
        fim: 807,
    },
    8: {
        inicio: 808,
        fim: 898,
    },
};



//Variavel que guarda dinheiro do jogador
var currentPlayerMoney = 100

//Variavel que guarda a pontaução do jogador
var cureentPlayerScore = 0
 
//Função para o Enter apertar o botão de enviar
const inputEle = document.getElementById('nome-pokemon');
inputEle.addEventListener('keyup', function(e){
  var key = e.key
  if (key == 'Enter') { 
    sendNamePokemon()
  }
})

//função linkada ao botão enviar que a pessoa envia o que ta dentro do input
function sendNamePokemon(){
    var inputNomePokemon = document.querySelector('#nome-pokemon')
    inputNomePokemon = inputNomePokemon.value.toLowerCase()
    console.log(inputNomePokemon)
    console.log(pokemonOnScreen)
    if(inputNomePokemon == pokemonOnScreen.name){
        cureentPlayerScore += 1
        currentPlayerMoney += 25
        var imagemPokemon = document.getElementById('filtro')
        imagemPokemon.style.filter = "brightness(100%)" 
        setTimeout(dadosPokemon,3000)
        document.querySelector('#nome-pokemon').value = ""

        win.play();
    } else {
        cureentPlayerScore -= 1
        setTimeout(dadosPokemon,1500)
        var imagemPokemon = document.getElementById('filtro')
        imagemPokemon.style.filter = "brightness(100%)"

        document.querySelector('#nome-pokemon').value = ""

        wrong.play()
    }
}


// Função para traduzir o tipo de pokemon para português
function traduzirPokemon(pokemonTypes) {
    var tipoPokemonTraduzido = []
    for(let i=0 ; i < pokemonTypes.length ; i++){
        switch (pokemonTypes[i]) {
            case "grass":
                tipoPokemonTraduzido[i] = "Planta"     
                break;
            case "fire":
                tipoPokemonTraduzido[i] = "Fogo"  
                break;
            case "water":
                tipoPokemonTraduzido[i] = "Água"    
                break;
            case "poison":
                tipoPokemonTraduzido[i] = "Venenoso"                  
                break;
            case "psychic":
                tipoPokemonTraduzido[i] = "Psíquico"   
                break;
            case "ground":
                tipoPokemonTraduzido[i] = "Terra"
                break;
            case "electric":
                tipoPokemonTraduzido[i] = "Elétrico"
                break; 
            case "flying":
                tipoPokemonTraduzido[i] = "Voador"
                break;
            case "ice" :
                tipoPokemonTraduzido[i] = "Gelo"
                break;
            case "bug" :
                tipoPokemonTraduzido[i] = "Inseto"
                break;    
            case "dark" :
                tipoPokemonTraduzido[i] = "Sombrio"
                break;    
            case "dragon" :
                tipoPokemonTraduzido[i] = "Dragão"
                break;  
            case "fairy" :
                tipoPokemonTraduzido[i] = "Fada"
                break;
            case "fighting" :
                tipoPokemonTraduzido[i] = "Lutador"
                break;         
            case "ghost" :
                tipoPokemonTraduzido[i] = "Fantasma"
                break;  
            case "rock" :
                tipoPokemonTraduzido[i] = "Pedra"
                break;   
            case "steel" :
                tipoPokemonTraduzido[i] = "Aço"
                break;   
            default:
                tipoPokemonTraduzido[i] = "Normal"
                break;
        }
    }
    return tipoPokemonTraduzido
}

//Função para escrever na tela a dica 1 
function WriteHintOne(){
    if(currentPlayerMoney >= 15 & !hintOneShow){
        var hintOneOriginal = document.querySelector('#hint-one-original')
        hintOneOriginal.classList.add('hidden-hint')
        
        tipoPokemon = traduzirPokemon(pokemonOnScreen.types)
        console.log(tipoPokemon)
        
        var hintOne = document.querySelector('#hint-one')
        hintOne.innerHTML = `<div>Tipo: ${tipoPokemon}<\div>`
        
        var buttonHintOne = document.getElementById('button-hint-one')
        buttonHintOne.classList.add('button-used')

        currentPlayerMoney -= 15
        let moneyPlayer = document.querySelector('.money-player')
        moneyPlayer.innerHTML = `${currentPlayerMoney}`
        hintOneShow = true
    }

    buyTip.play();

}

//Função para escrever na tela a dica 2
function WriteHintTwo(){
    if(currentPlayerMoney >= 25 & !hintTwoShow){
        var hintTwoOriginal = document.querySelector('#hint-two-original')
        hintTwoOriginal.classList.add('hidden-hint')
        var hintTwo = document.querySelector('#hint-two')
        hintTwo.innerHTML = `<div>Primeira letra: ${pokemonOnScreen.name[0].toUpperCase()}<\div>`

        var buttonHintTwo = document.getElementById('button-hint-two')
        buttonHintTwo.classList.add('button-used')


        currentPlayerMoney -= 25
        let moneyPlayer = document.querySelector('.money-player')
        moneyPlayer.innerHTML = `${currentPlayerMoney}`
        hintTwoShow = true
    }

    buyTip.play();
}

//Função para escrever na tela a dica 3 
function WriteHintThree(){
    if(currentPlayerMoney >= 35 & !hintThreeShow){
        var imagem = document.getElementById("filtro")
        imagem.style.filter = "brightness(20%)"
    
        var hintThreeOriginal = document.querySelector('#hint-three-original')
        hintThreeOriginal.classList.add('hidden-hint')

        var hintThree = document.querySelector('#hint-three')
        hintThree.innerHTML = `<div>A imagem já esta mais clara<\div>`

        var buttonHintThree = document.getElementById('button-hint-three')
        buttonHintThree.classList.add('button-used')


        currentPlayerMoney -= 35
        let moneyPlayer = document.querySelector('.money-player')
        moneyPlayer.innerHTML = `${currentPlayerMoney}`
        
        hintThreeShow = true
    }

    buyTip.play();
}

// Função para seleção de imagem dado a dificuldade
// function definirDificuldade(dificuldadeSelecionada) {
//     if (dificuldadeSelecionada == dificuldadeFacil || selectedDifficulty == dificuldadeNormal) {
//         imageDirectory = 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/'
//     } 
//     // nao funciona para geração 6/7/8
//     else if (dificuldadeSelecionada == dificuldadeDificil) {
//         imageDirectory = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/'
//     }
// }


//Modal 
function displayModal() {
    var modal = document.querySelector('#modal-exit')
    var button = document.querySelector('#button')
  
    button.addEventListener('click', function(e) {
      e.preventDefault()
  
      if (modal.classList.contains('showtime') === false) {
        modal.classList.add('showtime')
      } else {
        return
      }

      exit.play();
    });
  }
  
function closeModal() {
var modal = document.querySelector('#modal-exit')

modal.addEventListener('click', function(e) {
    e.preventDefault()
    
    if ( e.target.id === "modal-confirm") {
    modal.classList.remove('showtime')
    }
    if ( e.target.id === "modal-cancel"){
    window.location.href ='./index.html'
    }
})
}

displayModal();
closeModal();

//skip button

function skipPokemon() {
    cureentPlayerScore -= 1
    setTimeout(dadosPokemon,1500)
    var imagemPokemon = document.getElementById('filtro')
    imagemPokemon.style.filter = "brightness(100%)" 

    nextPokemon.play();
}

// sounds effects

var win = new Audio('./assets/win_sound.wav')
var wrong = new Audio('./assets/wrong_sound.wav')
var buyTip = new Audio('./assets/tip_sound.wav')
var nextPokemon = new Audio("https://freesound.org/data/previews/536/536782_1415754-lq.mp3");
var exit = new Audio('./assets/click_sound.wav')