var ancho = window.innerWidth;
var altura = window.innerHeight;

$(function() {
    $('#Container').mixItUp({
        load: {
            filter: 'all'
        },
        controls: {
            enable: true,
            live: true,
            toggleFilterButtons: false,
            toggleLogic: 'or'
        },
        animation: {
            duration: 0,
            effects: '',
            easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
        }
    });
    if (ancho < 768) {
        $('#Container').mixItUp('filter', '.category-3');
    }
});
(function($) {
    $(document).ready(function() {
        $.ajax({
                url: "data/data.json",
                dataType: "json"
            })
            .done(function(data) {
                informacion(data)
                informacion_muertos(data)
            });
        hero_image();
        navegador();

        /*scroll navegador*/
        var myFunction =  function () {
          var nav = document.getElementById("navegador")
          var alto = $(".hero-image").outerHeight()
          if ($(window).scrollTop() > alto) {
            $('nav').show();
          } else {
            $('nav').hide();
          }
        }

        $(window).on('scroll', myFunction);

        var scroll = document.getElementsByClassName("scroll");
        for (var s = 0; s < scroll.length; s++) {
            scroll[s].addEventListener('click', function(e) {
                e.preventDefault()
                    //this.classList.toggle('active')
                active()
                var offset = $($(this).attr('href')).offset().top;
                $('html, body').animate({
                    scrollTop: offset
                }, 500);
            })
        }

        function active() {
            var navlnks = document.querySelectorAll(".nav .scroll");
            Array.prototype.map.call(navlnks, function(item) {
                item.addEventListener("click", function(e) {
                    var navlnks = document.querySelectorAll(".nav .scroll");
                    Array.prototype.map.call(navlnks, function(item) {
                        if (item.parentNode.className == "active" || item.parentNode.className == "active open") {
                            item.parentNode.className = "";
                        }
                    });
                    e.currentTarget.parentNode.className = "active";
                });
            });
        };
        active()
            /*videos*/

        $('.play-pause-btn').on('click', function() {
            if ($(this).attr('data-click') == 1) {
                $(this).attr('data-click', 0)
                $('[data-video="0"]')[0].pause();
            } else {
                $(this).attr('data-click', 1)
                $('[data-video="0"]')[0].play();
            }
        })

        $('.play-pause-btn2').on('click', function() {
            if ($(this).attr('data-click') == 1) {
                $(this).attr('data-click', 0)
                $('[data-video="1"]')[0].pause();
            } else {
                $(this).attr('data-click', 1)
                $('[data-video="1"]')[0].play();
            }
        })
    });
})(jQuery)

function navegador() {
    var elemento = document.createElement("div");
    var porhacer = document.getElementById("navegador");
    if (ancho > 767) {
        elemento.className = "row hidden-xs v-center";
        elemento.innerHTML = '<div class="col-xs-3"><div class="navbar-header"><a class="navbar-brand" href="#"><img class="img-responsive" src="images/logoweb.png" alt="logoweb"></a></div></div><div class="col-xs-6 v-center"><div class="collapse navbar-collapse navbar-ex1-collapse"><ul class="nav navbar-nav"><li class="active"><a href="#juicio" class="scroll">CASOS</a></li><li><a href="#acusados" class="scroll">ACUSADOS</a></li><li><a href="#testimonios" class="scroll">TESTIMONIOS</a></li></ul></div></div><div class="col-xs-3"><span class="pull-right hidden-xs"><div class="share-buttons-square"><span class="fb mr-6"><div class="fb-share-button" data-href="http://larepublica.pe/data/matanza-en-el-fronton" data-layout="button" data-mobile-iframe="true"><a class="fb-xfbml-parse-ignore" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse">Compartir</a></div></span><span class="twitter"><a href="https://twitter.com/share" class="twitter-share-button" data-text="El juicio final - Matanza en El Frontón. Estos son los 35 acusados por la fiscalía" data-via="larepublica_pe" data-size="default" data-hashtags="JuicioFinal">Tweet</a> </span><script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?"http":"https";if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document, "script", "twitter-wjs");</script></span><span><div class="g-plusone" data-size="medium" data-annotation="none"></div></span></div></span></div>';
        porhacer.appendChild(elemento);
        var ex = porhacer.lastChild;
    } else {
        elemento.className = "hidden-sm hidden-md hidden-lg";
        elemento.innerHTML = '<div class="navbar-header"><button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse"><span class="sr-only">Desplegar navegación</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button><a class="navbar-brand" href="#"><img class="img-responsive" src="images/logoweb.png" alt="logoweb"></a></div><div class="collapse navbar-collapse navbar-ex1-collapse"><ul class="nav navbar-nav text-center"><li class="active"><a href="#juicio" class="scroll">CASOS</a></li><li><a href="#acusados" class="scroll">ACUSADOS</a></li><li><a href="#testimonios" class="scroll">TESTIMONIOS</a></li></ul></div>'
        porhacer.appendChild(elemento);
        var ex = porhacer.lastChild;
    }
}

var hero_image = function() {
        var objeto = document.getElementsByClassName("hero-image");
        for (var i = 0; i < objeto.length; i++) {
            objeto[i].style.height = parseInt(altura - 48) + "px";
        }
    }
    /*var informacion = function(data) {
        var links = document.querySelectorAll('a.tinymodal-modal');
        for (var k = 0; k < links.length; k++) {
            links[k].addEventListener('click', function() {
                var element = links[k].getAttribute('href');
                tinyModal.openModal(element, function() {
                    var id = parseInt(this.dataset.myorder) - 1;
                    var nombre = data[+id].nombre
                    var cargo = data[+id].cargo
                    var edad = data[+id].edad
                    var texto = data[+id].texto
                    var foto = ('images/' + data[+id].images);
                    document.getElementById("foto").innerHTML = "<img class='foto-on' src='" + foto + "'/>"
                    document.getElementById("nombre").innerHTML = nombre
                    document.getElementById("cargo").innerHTML = cargo
                    document.getElementById("edad").innerHTML = edad
                    document.getElementById("texto").innerHTML = texto
                        var closeLink = this.querySelectorAll('a[href="javascript:closeModal()"]');
                        if (closeLink.length < 1) {
                            var closeLink = document.createElement("a");
                            closeLink.setAttribute("href", "javascript:closeModal()");
                            closeLink.innerHTML = "X";
                            this.appendChild(closeLink);
                        }
                    console.log('opened by <a>');
                });
            });
        };
    };*/

var informacion = function(data) {
    var element = document.querySelectorAll('[data-myorder]');
    for (var i = 0; i < element.length; i++) {
        element[i].addEventListener('click', function(e) {
            var id = parseInt(this.dataset.myorder) - 1;
            var nombre = data.marinos_juzgados[+id].nombre
            var cargo = data.marinos_juzgados[+id].cargo
            var edad = data.marinos_juzgados[+id].edad
            var texto = data.marinos_juzgados[+id].texto
            var foto = ('images/' + data.marinos_juzgados[+id].images);
            document.getElementById("foto").innerHTML = "<img class='foto-on img-responsive center-block' src='" + foto + "'/>"
            document.getElementById("nombre").innerHTML = nombre
            document.getElementById("cargo").innerHTML = cargo
            document.getElementById("edad").innerHTML = "<span>Edad:</span>" + edad
            document.getElementById("texto").innerHTML = texto
        })
    };
};

var informacion_muertos = function(data) {
    var element = document.querySelectorAll('[data-marinos]');
    for (var i = 0; i < element.length; i++) {
        element[i].addEventListener('click', function(e) {
            var id = parseInt(this.dataset.marinos) - 1;
            var nombre_muertos = data.marinos_muertos[+id].nombre
            var cargo_muertos = data.marinos_muertos[+id].cargo
            var texto_muertos = data.marinos_muertos[+id].texto
            var foto_muertos = ('images/' + data.marinos_muertos[+id].images);
            document.getElementById("foto_muertos").innerHTML = "<img class='foto-on img-responsive center-block' src='" + foto_muertos + "'/>"
            document.getElementById("nombre_muertos").innerHTML = nombre_muertos
            document.getElementById("cargo_muertos").innerHTML = cargo_muertos
            document.getElementById("texto_muertos").innerHTML = texto_muertos
        })
    };
};

var links = document.querySelectorAll('a.tinymodal-modal');
for (var i = 0; links.length > i; i++) {
    links[i].addEventListener("click", function(event) { // callback
        event.preventDefault();
        var element = this.getAttribute("href");
        tinyModal.openModal(element, function() {
            console.log('opened by <a>');
        });
    });
}

/*var content = document.getElementsByClassName("mix")
for (i=0; i<content.length; i++) {
  var este = content[i]
  este.addEventListener("click", function () {
    alert(this.textContent)
})
 }*/
