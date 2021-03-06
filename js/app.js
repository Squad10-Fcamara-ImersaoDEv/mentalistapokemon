// Seleciona um numero aleatório de acordo com a geração de pokemon
function getRandomPokemon(menor,maior) {
    min = Math.ceil(menor)
    max = Math.floor(maior)
    return Math.floor(Math.random() * (max - min)) + min
}

// Busca na api o pokemon sorteado
async function showPokemon(id) {
    let pokemonData = {}

    await fetch('https://pokeapi.co/api/v2/pokemon/' + id)
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

    return pokemonData;
}

//variavel com os dados do pokemon em tela
var pokemonOnScreen = []

//Dicionario com inicio e fim das Geracoes de pokemon
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
}


var geracaoAtual = 1
var inicio = Geracoes[geracaoAtual].inicio
var fim = Geracoes[geracaoAtual].fim
// Função que troca as gerações (é chamada a cada 5 pontos)
function trocaDeGeracao(){
    if (fim < 898){
    geracaoAtual += 1
    inicio = Geracoes[geracaoAtual].inicio
    fim = Geracoes[geracaoAtual].fim
    }
    else {
        geracaoAtual = 1
        inicio = Geracoes[geracaoAtual].inicio
        fim = Geracoes[geracaoAtual].fim
    }
}



//primeira chamada para iniciar o jogo
dadosPokemon()

// Função que escreve o pokemon na tela e reseta as dicas
async function dadosPokemon(){
    pokemonOnScreen = await showPokemon(getRandomPokemon(inicio,fim))
    
    let containerMain = document.querySelector('#imagem-pokemon')
    containerMain.innerHTML = ` <img class="card-imagempokemonMedium" id="filtro" src="${pokemonOnScreen.image}" >`

    let moneyPlayer = document.querySelector('.money-player')
    moneyPlayer.innerHTML = `${currentPlayerMoney}`
    
    let scorePlayer = document.querySelector('.container-score')
    scorePlayer.innerHTML = `PONTOS : ${currentPlayerScore}`

    if (hintOneShow == true){
        let hintOne = document.querySelector('#hint-one')
        hintOne.innerHTML = ''

        let hintOneOriginal = document.querySelector('#hint-one-original')
        hintOneOriginal.classList.remove('hidden-hint')

        let buttonHintOne = document.getElementById('button-hint-one')
        buttonHintOne.classList.remove('button-used')

        hintOneShow = false
    }
    
    if (hintTwoShow == true){
        let hintTwo = document.querySelector('#hint-two')
        hintTwo.innerHTML = ''

        let hintTwoOriginal = document.querySelector('#hint-two-original')
        hintTwoOriginal.classList.remove('hidden-hint')

        let buttonHintTwo = document.getElementById('button-hint-two')
        buttonHintTwo.classList.remove('button-used')

        hintTwoShow = false
    }

    if (hintThreeShow == true){
        let hintThree = document.querySelector('#hint-three')
        hintThree.innerHTML = ''

        let hintThreeOriginal = document.querySelector('#hint-three-original')
        hintThreeOriginal.classList.remove('hidden-hint')

        let buttonHintThree = document.getElementById('button-hint-three')
        buttonHintThree.classList.remove('button-used')

        hintThreeShow = false
    }
}

var hintTwoShow = false
var hintThreeShow = false
var hintOneShow = false



//Variavel que guarda dinheiro do jogador
var currentPlayerMoney = 100

//Variavel que guarda a pontaução do jogador
var currentPlayerScore = 0
 
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


    if(inputNomePokemon == pokemonOnScreen.name){
        currentPlayerScore += 1
        currentPlayerMoney += 25
        var imagemPokemon = document.getElementById('filtro')
        imagemPokemon.style.filter = "brightness(100%)" 
        setTimeout(dadosPokemon,3000)
        document.querySelector('#nome-pokemon').value = ""

        if ((currentPlayerScore%5) == 0){
            trocaDeGeracao()
        }

        win.play();
    } else {
        if (currentPlayerScore > 0){
            currentPlayerScore -= 1
        }
        
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
    if(currentPlayerMoney >= 10 & !hintOneShow){
        tipoPokemon = traduzirPokemon(pokemonOnScreen.types)
        
        let hintOne = document.querySelector('#hint-one')
        hintOne.innerHTML = `<div>Tipo: ${tipoPokemon}<\div>`
       
        let hintOneOriginal = document.querySelector('#hint-one-original')
        hintOneOriginal.classList.add('hidden-hint')
        
        let buttonHintOne = document.getElementById('button-hint-one')
        buttonHintOne.classList.add('button-used')

        currentPlayerMoney -= 10
        let moneyPlayer = document.querySelector('.money-player')
        moneyPlayer.innerHTML = `${currentPlayerMoney}`
        hintOneShow = true

        buyTip.play();
    }  
}

//Função para escrever na tela a dica 2
function WriteHintTwo(){
    if(currentPlayerMoney >= 20 & !hintTwoShow){
        let hintTwo = document.querySelector('#hint-two')
        hintTwo.innerHTML = `<div>Primeira letra: ${pokemonOnScreen.name[0].toUpperCase()}<\div>`
        
        let hintTwoOriginal = document.querySelector('#hint-two-original')
        hintTwoOriginal.classList.add('hidden-hint')
       
        let buttonHintTwo = document.getElementById('button-hint-two')
        buttonHintTwo.classList.add('button-used')


        currentPlayerMoney -= 20
        let moneyPlayer = document.querySelector('.money-player')
        moneyPlayer.innerHTML = `${currentPlayerMoney}`
        hintTwoShow = true
        
        buyTip.play();
    }    
}

//Função para escrever na tela a dica 3 
function WriteHintThree(){
    if(currentPlayerMoney >= 30 & !hintThreeShow){
        var imagem = document.getElementById("filtro")
        imagem.style.filter = "brightness(20%)"
    
        var hintThreeOriginal = document.querySelector('#hint-three-original')
        hintThreeOriginal.classList.add('hidden-hint')

        var hintThree = document.querySelector('#hint-three')
        hintThree.innerHTML = `<div>A imagem já esta mais clara<\div>`

        var buttonHintThree = document.getElementById('button-hint-three')
        buttonHintThree.classList.add('button-used')


        currentPlayerMoney -= 30
        let moneyPlayer = document.querySelector('.money-player')
        moneyPlayer.innerHTML = `${currentPlayerMoney}`
        
        hintThreeShow = true
        
        buyTip.play();
    } 
}


//Modal 'sair do jogo'
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
    })
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

displayModal()
closeModal()

// Botão para pular o pokemon 
function skipPokemon() {
    if (currentPlayerScore > 0){
        currentPlayerScore -= 1
    }
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