let suggestions = [];

const getPokemonsList = async function() {
    await fetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=898')
        .then(resolve => resolve.json())
        .then(data => {
            for (let i = 0; i < data.results.length; i++) {
                suggestions.push(data.results[i].name)
            }
        })
}

getPokemonsList()

// obtendo os elementos necessários
const cardsBox = document.querySelector('.cards');
const botaoSeemore = document.querySelector('.botao-seemore');
const botaoBack = document.querySelector('.botao-back');
const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");
const icon = searchWrapper.querySelector(".icon");
let selectedPokemonData = {};

// executa se o usuário pressionar qualquer tecla e soltar
inputBox.onkeyup = (e)=>{
    let userData = e.target.value; // dados inseridos pelo usuário
    if(userData){        
        emptyArray = suggestions.filter((data)=>{
            // transforma os caracteres inseridos para minúsculas e retornar apenas as palavras que começam com os caracteres inseridos pelo usuário
            return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase()); 
        });
        emptyArray = emptyArray.map((data)=>{
            // insere os dados nos itens da lista
            return data = '<li>'+ data +'</li>';
        });
        searchWrapper.classList.add("active"); // exibe o autocompletar
        showSuggestions(emptyArray);
        let allList = suggBox.querySelectorAll("li");
        for (let i = 0; i < allList.length; i++) {
            //adding onclick attribute in all li tag
            allList[i].setAttribute("onclick", "select(this)");
        }
    }else{
        searchWrapper.classList.remove("active"); // esconde o autocompletar
    }
}

function select(element){
    let selectData = element.textContent;
    inputBox.value = selectData;
    searchWrapper.classList.remove("active");
}

function showSuggestions(list){
    let listData;
    if(!list.length){
        userValue = inputBox.value;
        listData = '<li>'+ userValue +'</li>';
    }else{
        listData = list.join('');
    }
    suggBox.innerHTML = listData;
}

// obtem os atributos do pokemon escolhido
async function getPokemonProps(pokemonName) {
    await fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonName)
        .then(response => response.json())
        .then(data => {
            selectedPokemonData.id = data.id
            selectedPokemonData.name = data.name
            selectedPokemonData.types = data.types.map(types => { return types.type.name; })
            selectedPokemonData.image = "https://assets.pokemon.com/assets/cms2/img/pokedex/full/" + ("00" + data.id).slice(-3) + ".png"
            selectedPokemonData.index = ("00" + data.id).slice(-3)
        })
        .catch(() => {
            console.log("Error request pokémon. Id: " + selectedPokemonData.id)
        })
}


// a tecla enter executa a função showSelectedPokemon()
const inputEle = document.getElementById('text-input-pokemon');
inputEle.addEventListener('keyup', function(e){
  var key = e.key
  if (key == 'Enter') { 
    showSelectedPokemon()
  }
})


// exibe o pokemon selecionado na tela
async function showSelectedPokemon() {
	let pokemonFirstClass

	if(inputBox.value && (suggestions.includes(inputBox.value) || (parseInt(inputBox.value) >= 1 && parseInt(inputBox.value) <= 898))){
		await getPokemonProps(inputBox.value)

		switch (selectedPokemonData.types[0]) {
			case "grass":
				pokemonFirstClass = "card-grass" 
				break;
			case "fire":
				pokemonFirstClass = "card-fire"
				break;
			case "water":
				pokemonFirstClass = "card-water"
				break;
			case "poison":
				pokemonFirstClass = "card-poison"
				break;
			case "psychic":
				pokemonFirstClass = "card-psychic"
				break;
			case "ground":
				pokemonFirstClass = "card-ground"
				break;
			case "electric":
				pokemonFirstClass = "card-electric"
				break; 
			case "flying":
				pokemonFirstClass = "card-flying"
				break;
			case "ice" :
				pokemonFirstClass = "card-ice"
				break;
			case "bug" :
				pokemonFirstClass = "card-bug"
				break;    
			case "dark" :
				pokemonFirstClass = "card-dark"
				break;    
			case "dragon" :
				pokemonFirstClass = "card-dragon"
				break;  
			case "fairy" :
				pokemonFirstClass = "card-fairy"
				break;
			case "fighting" :
				pokemonFirstClass = "card-fighting"
				break;         
			case "ghost" :
				pokemonFirstClass = "card-ghost"
				break;  
			case "rock" :
				pokemonFirstClass = "card-rock"
				break;   
			case "steel" :
				pokemonFirstClass = "card-steel"
				break;   
			default:
				pokemonFirstClass = "card-normal"
				break;
		}
		
        let pokemonTiposTraduzido = traduzirPokemon(selectedPokemonData.types)

		cardsBox.innerHTML =
		`
			<div class="card-pokemon ${pokemonFirstClass}" id=${selectedPokemonData.name}>
				<h4><strong class="nome">${selectedPokemonData.name}</strong></h4>
				<img class="imagempokemon" src="${selectedPokemonData.image}" alt="imagem do ${selectedPokemonData.name}">
				<div class="container">
					<span class="code-pokemon">#${selectedPokemonData.index}</span>
					<p class="type-pokemon">${pokemonTiposTraduzido.join('/')}</p>
				</div>
			</div>
		`
        searchWrapper.classList.remove("active"); //hide autocomplete box
        inputBox.value = ''
        botaoSeemore.setAttribute('hidden','hidden')
        botaoBack.removeAttribute('hidden')
	} else {
		cardsBox.innerHTML =
		`
			<div class="card-pokemon">
				<h4><strong class="nome">Pokemon não encontrado!</strong></h4>
			</div>
		`
        searchWrapper.classList.remove("active"); //hide autocomplete box
        inputBox.value = ''
        botaoSeemore.setAttribute('hidden','hidden')
        botaoBack.removeAttribute('hidden')
    }
}

// traduz a classe dos pokemons
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