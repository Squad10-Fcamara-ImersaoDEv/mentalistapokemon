let suggestions = []

// getting pokemon list on pokeapi
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

// getting all required elements
const cardsBox = document.querySelector(".cards")
const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");
const icon = searchWrapper.querySelector(".icon");
let apiLink;

// if user press any key and release
inputBox.onkeyup = (e) => {
    let userData = e.target.value; //user enetered data
    if(userData){
        icon.onclick = () => {
            apiLink = "https://pokeapi.co/api/v2/pokemon/" + userData;
            
            linkTag.setAttribute("href", apiLink);
            console.log(apiLink);
            linkTag.click();
        }
        
        emptyArray = suggestions.filter((data)=>{
            //filtering array value and user characters to lowercase and return only those words which are start with user enetered chars
            return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase()); 
        });
        emptyArray = emptyArray.map((data)=>{
            // passing return data inside li tag
            return data = '<li>'+ data +'</li>';
        });
        searchWrapper.classList.add("active"); //show autocomplete box
        showSuggestions(emptyArray);
        let allList = suggBox.querySelectorAll("li");
        for (let i = 0; i < allList.length; i++) {
            //adding onclick attribute in all li tag
            allList[i].setAttribute("onclick", "select(this)");
        }
    }else{
        searchWrapper.classList.remove("active"); //hide autocomplete box
    }
}