//botao voltar ao topo com sensação de scroll
var btn = document.querySelector("#back-to-top");
btn.addEventListener('click', () => window.scrollTo({
    top ,
    behavior: 'smooth',
}));

async function getPokemon(pokemonId) {
    let id
    let pokemonData = {}

    await fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonId)
        .then(response => response.json())
        .then(data => {
            pokemonData.id = data.id
            pokemonData.name = data.name
            pokemonData.types = data.types.map(types => { return types.type.name; })
            pokemonData.image = "https://assets.pokemon.com/assets/cms2/img/pokedex/full/" + ("00" + pokemonId).slice(-3) + ".png"
            id = ("00" + pokemonId).slice(-3)
  
        })
        .catch(() => {
            console.log("Error request pokémon. Id: " + pokemonId)
        })
    return pokemonData;
}

// Variavel com os dados de todos pokemons(nome,id, imagem e tipos)
let dataAllPokemons = []

// variavel que tem o valor de pokemons exibidos na tela Inicia com -1 do valor que esta aqui
var maxPokemon = 10 

// variavel que tem o valor de pokemons ja exibidos na tela Inicia com 1 porque não existe pokemon com id 0
var pokemonOnScreen = 1

// Função que preenche a variavel dataAllPokemons adicionando os pokemons do id inicio ate o id controle
async function writeDataPokemons(inicio,controle){
    var i = inicio
    for(i ; i < controle ; i++){
        var onePokemon = await getPokemon(i.toString())
        dataAllPokemons.push(onePokemon)
    }
}

createDataPokemonAndWrite(pokemonOnScreen,maxPokemon)

//Função que chama a função que preenche a variavel dataAllPokemons e e escreve eles na tela assincrona pois espera a variavel dataAllPokemons ser preenchida
async function createDataPokemonAndWrite(inicio,controle){
    await writeDataPokemons(inicio,controle)
    var i = inicio
    for(i ; i < controle ; i++){
        drawPokemons(dataAllPokemons[i-1])
    }

    //funçao que desenha os pokemons na tela 
    function drawPokemons(pokemonData){
        let cards = document.querySelector(".cards")
        let id 
        id = ("00" + pokemonData.id).slice(-3)

        switch (pokemonData.types[0]) {
            case "grass":
                var classeTipoPrimarioPokemon = "card-grass"     
                break;
            case "fire":
                var classeTipoPrimarioPokemon = "card-fire"                        
                break;
            case "water":
                var classeTipoPrimarioPokemon = "card-water"                  
                break;
            case "poison":
                var classeTipoPrimarioPokemon = "card-poison"                  
                break;
            case "psychic":
                var classeTipoPrimarioPokemon = "card-psychic"
                break;
            case "ground":
                var classeTipoPrimarioPokemon = "card-ground"
                break;
            case "electric":
                var classeTipoPrimarioPokemon = "card-electric"
                break; 
            case "flying":
                var classeTipoPrimarioPokemon = "card-flying"
                break;
            case "ice" :
                var classeTipoPrimarioPokemon = "card-ice"
                break;
            case "bug" :
                var classeTipoPrimarioPokemon = "card-bug"
                break;    
            case "dark" :
                var classeTipoPrimarioPokemon = "card-dark"
                break;    
            case "dragon" :
                var classeTipoPrimarioPokemon = "card-dragon"
                break;  
            case "fairy" :
                var classeTipoPrimarioPokemon = "card-fairy"
                break;
            case "fighting" :
                var classeTipoPrimarioPokemon = "card-fighting"
                break;         
            case "ghost" :
                var classeTipoPrimarioPokemon = "card-ghost"
                break;  
            case "rock" :
                var classeTipoPrimarioPokemon = "card-rock"
                break;   
            case "steel" :
                var classeTipoPrimarioPokemon = "card-steel"
                break;   
            default:
                var classeTipoPrimarioPokemon = "card-normal"
                break;
        }

        let pokemonTiposTraduzido = traduzirPokemon(pokemonData.types)
        
        cards.innerHTML += `
            <div class="card-pokemon ${classeTipoPrimarioPokemon}" id=${pokemonData.name}>
                <h4><strong class="nome">${pokemonData.name}</strong></h4>
                <img class="imagempokemon" src="${pokemonData.image}" alt="imagem do ${pokemonData.name}">
                <div class="container">
                    <span class="code-pokemon">#${id}</span>
                    <p class="type-pokemon">${pokemonTiposTraduzido.join('/')}</p>
                </div>
            </div>
        `        
    }
}

// função para o botão ver mais ele acrescenta de 9 em 9 
async function seeMore(){
    pokemonOnScreen += 9
    maxPokemon += 9
    await createDataPokemonAndWrite(pokemonOnScreen,maxPokemon)
}


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