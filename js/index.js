//botao voltar ao topo com sensação de scroll
var btn = document.querySelector("#back-to-top");
btn.addEventListener('click', () => window.scrollTo({
    top ,
    behavior: 'smooth',
}));

document.addEventListener('DOMContentLoaded', function() {
    var stream = document.querySelector('.gallery__stream');
    var items = document.querySelectorAll('.gallery__item');
    
    var prev = document.querySelector('.gallery__prev');
    prev.addEventListener('click', function() {
      stream.insertBefore(items[items.length - 1], items[0]);
      items = document.querySelectorAll('.gallery__item');
    });
    
    var next = document.querySelector('.gallery__next');
    next.addEventListener('click', function() {
      stream.appendChild(items[0]);
      items = document.querySelectorAll('.gallery__item');
    });
  });


function controlesVideo() {
  let controle = document.getElementById("controlsVideo")
  controle.addEventListener("mouseover", function(){this.controls = true;}, false);
  controle.addEventListener("mouseout", function(){this.controls = false;}, false);
};
window.addEventListener('load', controlesVideo, false);

// Ativação menu hamburguer

var menu = document.querySelector(".menu")
var ham = document.querySelector(".ham")
var xIcon = document.querySelector(".xIcon")
var menuIcon = document.querySelector(".menuIcon")

ham.addEventListener("click", toggleMenu)

function toggleMenu() {
  if (menu.classList.contains("showMenu")) {
    menu.classList.remove("showMenu");
    xIcon.style.display = "none";
    menuIcon.style.display = "block";
  } else {
    menu.classList.add("showMenu");
    xIcon.style.display = "block";
    menuIcon.style.display = "none";
  }
}

var menuLinks = document.querySelectorAll(".menuLink")
var divAp = document.querySelectorAll("#responsiveAp")

menuLinks.forEach(
  function (menuLink) {
    menuLink.addEventListener("click", toggleMenu)
  }
)
