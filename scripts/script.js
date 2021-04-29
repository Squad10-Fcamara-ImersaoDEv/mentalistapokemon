async function getPokemon(pokemonId) {
    let id
    let pokemonData = {};

    await fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonId)
        .then(response => response.json())
        .then(poke => {
            pokemonData.id = poke.id
            pokemonData.name = poke.name
            pokemonData.types = poke.types.map(types => { return types.type.name; })
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

            console.log("bbbb")
            var el = document.querySelector(".cards")
            el.innerHTML += `
                            <div class="youare ${classeTipoPrimarioPokemon}" id =${pokemonData.name}>
                                <h4><strong class="nome">${pokemonData.name}</strong></h4>
                                <img class="imagempokemon" src="${pokemonData.image}" alt="imagem do ${pokemonData.name}">
                                <div class="container">
                                    <p>#${id}</p>
                                    <p>${pokemonData.types}</p>
                                </div>
                            </div>
                            `
            })
        .catch(() => {
            console.log("Error request pokémon. Id: " + pokemonId)
        })
    return pokemonData;
}

async function escrevePokemons(){
    for (var i = 1;i<10; i++){
        var aa = await getPokemon(i.toString())
        console.log(aa.types)
    }
}

escrevePokemons()