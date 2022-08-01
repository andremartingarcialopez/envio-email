//VARIABLES

//Botonses
const btnEnviar = document.querySelector("#enviar");
const btnResetear = document.querySelector("#resetBtn");
//Campos
const campoEmail = document.querySelector("#email");
const campoAsunto = document.querySelector("#asunto");
const campoMensaje = document.querySelector("#mensaje");

const formulario = document.querySelector("#enviar-mail");
//Validacion de que si sea un correo electronico
const validarForm = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;



//EVENTOS
cargarEventos()
function cargarEventos() {
    document.addEventListener("DOMContentLoaded", () => {
        btnEnviar.classList.add("opacity-50", "cursor-not-allowed");
        btnEnviar.disabled = true
    });

    campoEmail.addEventListener("blur", leerCampo);
    campoAsunto.addEventListener("blur", leerCampo);
    campoMensaje.addEventListener("blur", leerCampo);

    formulario.addEventListener("submit", enviarForm);

    btnResetear.addEventListener("click", limpiarForm)
}


//FUNCIONES
function leerCampo(e) {

    if (e.target.classList.contains("email")) {
        if (validarForm.test(campoEmail.value)) {

        } else {
            mostrarMensaje("Correo no valido", "error")
            e.target.classList.remove("border", "border-green-500")
            e.target.classList.add("border", "border-red-500")
            btnEnviar.classList.add("opacity-50", "cursor-not-allowed");
            btnEnviar.disabled = true
            return;
        }
    }

    if (e.target.value) {

        e.target.classList.remove("border", "border-red-500")
        e.target.classList.add("border", "border-green-500")

    } else {
        mostrarMensaje("Todos los campos son obligatorios", "error")
        e.target.classList.remove("border", "border-green-500")
        e.target.classList.add("border", "border-red-500")
        btnEnviar.classList.add("opacity-50", "cursor-not-allowed");
        btnEnviar.disabled = true
    }

    //Si todo esta lleno correctamente habilitamos el boton
    if (validarForm.test(campoEmail.value) && campoAsunto.value && campoMensaje.value) {
        btnEnviar.classList.remove("opacity-50", "cursor-not-allowed");
        btnEnviar.disabled = false
    }
}


//Funcion de alerta de mensajes
function mostrarMensaje(mensaje, tipoMensaje) {
    const mensajeHTML = document.createElement("P");
    mensajeHTML.textContent = mensaje;

    if (tipoMensaje == "error") {
        mensajeHTML.classList.add("error", "mt-3", "p-3", "text-center", "uppercase", "text-white", "bg-red-500")
    } else {
        mensajeHTML.classList.add("corecto", "mt-3", "p-3", "text-center", "uppercase", "text-white", "bg-green-500")

    }

    const errores = document.querySelectorAll(".error");
    const correctos = document.querySelectorAll(".correcto");

    if (errores.length == 0 && correctos.length == 0) {
        formulario.appendChild(mensajeHTML);

    }

    setTimeout(() => {
        mensajeHTML.remove();
    }, 3000);

}

function enviarForm(e) {
    e.preventDefault();
    const spinner = document.querySelector("#spinner");
    spinner.style.display = "flex"

    setTimeout(() => {
        spinner.remove();
        mostrarMensaje("Correo enviado con exito", "correcto");
        formulario.reset();
        btnEnviar.classList.add("opacity-50", "cursor-not-allowed");
        btnEnviar.disabled = true
    }, 3000);
}

//Funcion de btn resetear formulario
function limpiarForm() {
    formulario.reset();
    btnEnviar.classList.add("opacity-50", "cursor-not-allowed");
    btnEnviar.disabled = true

}