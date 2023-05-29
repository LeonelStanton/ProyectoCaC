
//Scroll de la barra de navegacion

window.addEventListener("scroll", function () {
  var header = document.querySelector("header");
  header.classList.toggle("abajo", window.scrollY > 0);
});

//Menu hamburguesa para pantallas moviles

const nav = document.querySelector("nav");
document.querySelector(".menu").addEventListener("click", animateBars);

var line1__bars = document.querySelector(".menuL1");
var line2__bars = document.querySelector(".menuL2");
var line3__bars = document.querySelector(".menuL3");

function animateBars() {
  line1__bars.classList.toggle("menuActiveL1");
  line2__bars.classList.toggle("menuActiveL2");
  line3__bars.classList.toggle("menuActiveL3");
  nav.classList.toggle("active");
}

const menuLinks = document.querySelectorAll('.menuNavs a[href^="#"]');
menuLinks.forEach((menuLink) => {
  menuLink.addEventListener("click", function () {
    line1__bars.classList.remove("menuActiveL1");
  line2__bars.classList.remove("menuActiveL2");
  line3__bars.classList.remove("menuActiveL3")
    nav.classList.remove("active");
  });
  })



//Slider automatico y manual del inicio

let slider_index = 0;

function show_slide(index) {
  let slides = document.querySelectorAll(".slide");
  let dots = document.querySelectorAll(".dot-nav");

  if (index >= slides.length) slider_index = 0;
  if (index < 0) {
    slider_index = slides.length - 1;
  }

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
    slides[i].classList.remove("slide-active");
   
  }

  slides[slider_index].style.display = "block";
  slides[slider_index].classList.add("slide-active");
  
}

show_slide(slider_index);

document.querySelector("#arrow-prev").addEventListener("click", () => {
  show_slide(--slider_index);
});

document.querySelector("#arrow-next").addEventListener("click", () => {
  show_slide(++slider_index);
});

let intervalo = setInterval(() => {
  show_slide(++slider_index);
}, 6000);
document.querySelector("#arrow-next").addEventListener("click", function () {
  clearInterval(intervalo);
  show_slide(slider_index);
  intervalo = setInterval(() => {
    show_slide(++slider_index);
  }, 6000);
});
document.querySelector("#arrow-prev").addEventListener("click", function () {
  clearInterval(intervalo);
  show_slide(slider_index);
  intervalo = setInterval(() => {
    show_slide(++slider_index);
  }, 6000);
});

//Validacion del formulario mediante expresiones regulares

window.addEventListener("load", () => {
  const form = document.querySelector("#formulario");
  const usuario = document.getElementById("usuario");
  const email = document.getElementById("email");
  const telefono = document.getElementById("telefono");
  const evento = document.getElementById("evento");
  let cumpleU = false;
  let cumpleEm = false;
  let cumpleT = false;
  let cumpleE = false;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    validaCampos();
   setTimeout(()=> {
    if (cumpleU && cumpleEm && cumpleT && cumpleE) {
      document.getElementById("cumple").classList.add("cumpleOk");
      form.reset();
      setTimeout(() => {
        document.getElementById("cumple").classList.remove("cumpleOk");
        cumpleU = false;
        cumpleEm = false;
        cumpleT = false;
        cumpleE = false;
      }, 3000);
    }}, 800)
  });

  const validaCampos = () => {
    //capturar los valores ingresados por el usuario
    const usuarioValor = usuario.value.trim();
    const emailValor = email.value.trim();
    const telefonoValor = telefono.value.trim();
    const eventoValor = evento.value.trim();

    //validando campo usuario
    if (!usuarioValor) {
      validaFalla(usuario, "Este campo es obligatorio");
    } else if (!validaUsuario(usuarioValor)) {
      validaFalla(usuario, "El nombre no es valido");
    } else {
      validaOk(usuario);
      cumpleU = true;
    }

    //validando campo email
    if (!emailValor) {
      validaFalla(email, "Este campo es obligatorio");
    } else if (!validaEmail(emailValor)) {
      validaFalla(email, "El e-mail no es válido");
    } else {
      validaOk(email);
      cumpleEm = true;
    }

    //validando campo telefono
    if (!telefonoValor) {
      validaFalla(telefono, "Este campo es obligatorio");
    } else if (!validaTelefono(telefonoValor)) {
      validaFalla(telefono, "El telefono no es válido");
    } else {
      validaOk(telefono);
      cumpleT = true;
    }

    //validando campo evento
    if (!eventoValor) {
      validaFalla(evento, "Este campo es obligatorio");
    } else if (!validaEvento(eventoValor)) {
      validaFalla(evento, "El nombre del evento no es válido");
    } else {
      validaOk(evento);
      cumpleE = true;
    }

  };

  const validaFalla = (input, msje) => {
    const formControl = input.parentElement;
    const aviso = formControl.querySelector("p");
    aviso.innerText = msje;

    formControl.className = "formControl falla";
  };
  const validaOk = (input) => {
    const formControl = input.parentElement;
    formControl.className = "formControl ok";
  };

  const validaUsuario = (usuario) => {
    return /^[a-zA-Z ]{3,50}$/.test(usuario);
  };

  const validaEmail = (email) => {
    return /^[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/.test(email);
  };

  const validaTelefono = (telefono) => {
    return /^\+?\d{7,15}$/.test(telefono);
  };

  const validaEvento = (evento) => {
    return /^[a-zA-Z][a-zA-Z0-9\s]*$/.test(evento);
  };
});

//Galeria de imagenes

let cad;
let contador=0;

async function cargarLivings(){
 try{

  const resp = await fetch("./js/productos.json");
  const data = await resp.json();
  cad=`
<div class="img-container animate__animated animate__fadeIn">`;
  RenderizarGaleria(data.livings);
  data.livings.forEach((producto) => {
    document.getElementById(producto.id).addEventListener(`click`, () => {
      document.getElementById("popup-img").style.display = 'block';
      document.getElementById("imgPop").src = producto.img;
      contador = (producto.id -1);
       
      });
  });
  RenderizarVisualizador();

 } catch(error) {
    console.log("Error: " + error.statusText + " No se cargaron los productos");
  }
  
}

async function cargarGazebos(){
  try{
 
   const resp = await fetch("./js/productos.json");
   const data = await resp.json();
   cad=`
 <div class="img-container animate__animated animate__fadeIn">`;
   RenderizarGaleria(data.gazebos);
   data.gazebos.forEach((producto) => {
    document.getElementById(producto.id).addEventListener(`click`, () => {
      document.getElementById("popup-img").style.display = 'block';
      document.getElementById("imgPop").src = producto.img;
      contador = (producto.id -1);
       
      });
  });
  RenderizarVisualizador();
  } catch(error) {
     console.log("Error: " + error.statusText + " No se cargaron los productos");
   }
   
 }

 async function cargarSillas(){
  try{
 
   const resp = await fetch("./js/productos.json");
   const data = await resp.json();
   cad=`
 <div class="img-container animate__animated animate__fadeIn">`;
   RenderizarGaleria(data.sillas);
   data.sillas.forEach((producto) => {
    document.getElementById(producto.id).addEventListener(`click`, () => {
      document.getElementById("popup-img").style.display = 'block';
      document.getElementById("imgPop").src = producto.img;
      contador = (producto.id -1);
       
      });
  });
  RenderizarVisualizador();
  
  } catch(error) {
     console.log("Error: " + error.statusText + " No se cargaron los productos");
   }
   
 }

function RenderizarVisualizador(){
  const imagenes= document.querySelectorAll(".gallery img");
  document.querySelector(".botonAtras").addEventListener("click", () => {
    if (contador > 0){
      document.getElementById("imgPop").src = imagenes[contador-1].src;
      contador--;
    }
    else{
      document.getElementById("imgPop").src = imagenes[imagenes.length-1].src;
      contador= imagenes.length-1;
    }
  });

  document.querySelector(".botonAdelante").addEventListener("click", () => {
     if (contador < imagenes.length-1){
      document.getElementById("imgPop").src = imagenes[contador+1].src;
      contador++;
    }
    else {
      document.getElementById("imgPop").src = imagenes[0].src;
      contador=0;
    }
  });
 
}

function RenderizarGaleria(arreglo){

  arreglo.forEach((prod)=> {
    cad += `<div class="img">
    <img id="${prod.id}" src= ${prod.img}  alt="producto">
</div>`
  })
  cad += ` </div><div  id="popup-img" class="animate__animated animate__slideInDown">
  <div class="slideShow">
  <span onclick="cerrar()">&times;</span>
  <div class="botonAtras">
  <i class="fa-solid fa-arrow-left"></i>
</div>
<div class="botonAdelante">
  <i class="fa-solid fa-arrow-right"></i>
</div>
  <img id="imgPop" src="" alt="">
  </div>
</div>`
  document.getElementById("gallery").innerHTML=cad;
}


const botonLiving = document.querySelector(".livings");
const botonGazebo =  document.querySelector(".gazebos");
const botonSilla = document.querySelector(".sillas");

cargarLivings();
ActivarBoton(botonLiving);

botonLiving.addEventListener("click", () => {
  cargarLivings();
  ActivarBoton(botonLiving);
  DesactivarBoton(botonGazebo);
  DesactivarBoton(botonSilla);
 });

botonGazebo.addEventListener("click", () => {
  cargarGazebos();
  ActivarBoton(botonGazebo);
  DesactivarBoton(botonLiving);
  DesactivarBoton(botonSilla);
 });

 botonSilla.addEventListener("click", () => {
  cargarSillas();
  ActivarBoton(botonSilla);
  DesactivarBoton(botonLiving);
  DesactivarBoton(botonGazebo);
 });


function ActivarBoton(variable){
  variable.style.background="#96BEF5";
  variable.style.color="white";
} 

function DesactivarBoton(variable){
  variable.style.background="white";
 variable.style.color="#96BEF5";
}

function cerrar(){
  
  document.getElementById("popup-img").style.display = 'none';
}






















