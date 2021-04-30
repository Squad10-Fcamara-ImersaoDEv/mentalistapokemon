// ===== VARIABLES
let baseUrl = 'https://pokeapi.co/api/v2/pokemon/'
// Gera um número inteiro aleatório entre 1 e 898
function getPokemonIndex() {
    min = Math.ceil(1);
    max = Math.floor(898);
    return Math.floor(Math.random() * (max - min)) + min;
}

// Busca dados do jogador
//function getPlayerData() {}

// Seta o tempo para 30 seg

// Carrega o card da sorte
async function getPokemon(pokemonId) {
    let id
    let pokemonData = {};
    let el = document.querySelector(".cards")

    await fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonId)
        .then(response => response.json())
        .then(data => {
            pokemonData.id = data.id
            pokemonData.name = data.name
            pokemonData.types = data.types.map(types => { return types.type.name; })
            pokemonData.image = "https://assets.pokemon.com/assets/cms2/img/pokedex/full/" + ("00" + pokemonId).slice(-3) + ".png"
            id = ("00" + pokemonId).slice(-3)

            switch (pokemonData.types[0]) {
                case "grass":
                    var classeTipoPrimarioPokemon = "card-grass";                    
                    break;
                case "fire":
                    var classeTipoPrimarioPokemon = "card-fire";                        
                    break;
                case "water":
                    var classeTipoPrimarioPokemon = "card-water";                  
                    break;
                case "poison":
                    var classeTipoPrimarioPokemon = "card-poison";                  
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

            el.innerHTML += `
                            <div class="card-pokemon ${classeTipoPrimarioPokemon}" id =${pokemonData.name}>
                                <h4><strong class="nome">${pokemonData.name}</strong></h4>
                                <img class="imagempokemon" src="${pokemonData.image}" alt="imagem do ${pokemonData.name}">
                                <div class="container">
                                    <span id="code-pokemon">#${id}</span>
                                    <p id="type-pokemon">${pokemonData.types}</p>
                                </div>
                            </div>
                            `
        })
        .catch(() => {
            console.log("Error request pokémon. Id: " + pokemonId)
        })
    return pokemonData;
}