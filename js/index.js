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
    var next = document.querySelector('.gallery__next');

    prev.addEventListener('click', function() {
      stream.insertBefore(items[items.length - 1], items[0]);
      items = document.querySelectorAll('.gallery__item');
    });
    
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


