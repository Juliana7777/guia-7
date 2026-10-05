const inputNombre = document.getElementById("nombre");
const inputApellido = document.getElementById("apellido"); 
const inputEmail = document.getElementById("email");
const inputPrograma =document.getElementById("programa"); 
const inputEdad = document.getElementById("edad");
const btnGuardar = document.getElementById("btnGuardar");
const btnLimpiar = document.getElementById("btnLimpiar");
const formulario = document.getElementById("formulario");

//  elementos nuevos del HTML
const fechaHora = document.getElementById("fechaHora");
const mensajeNombre = document.getElementById("mensajeNombre");
const mensajeEdad = document.getElementById("mensajeEdad");
const mensajeEmail = document.getElementById("mensajeEmail");
const tarjetaResultado = document.getElementById("tarjetaResultado");
const datoNombre = document.getElementById("datoNombre");
const datoApellido = document.getElementById("datoApellido");
const datoEdad = document.getElementById("datoEdad");
const datoEmail = document.getElementById("datoEmail");
const datoPrograma = document.getElementById("datoPrograma");

// botón para guaradr la info del form
btnGuardar.addEventListener('click', (evento) => {
    let nombre = inputNombre.value;
    let apellido = inputApellido.value;
    let email = inputEmail.value;
    let programa = inputPrograma.value;
    let edad = inputEdad.value;

    
if(nombre === ""|| apellido === "" || email === "" || programa === "" || edad === ""){
    Swal.fire({ template: "#alerta-vacio" });
        return;
    }

    Swal.fire({ template: "#alerta-exito" }); 
})

// botón para limpiar el form
btnLimpiar.addEventListener('dblclick', () => {
    // Vacía todos los campos del formulario
    formulario.reset();

    //  borrar los mensajes (reset no dispara los eventos input ni blur)
    mensajeNombre.textContent = "";
    mensajeEdad.textContent = "";
    mensajeEdad.classList.remove("text-success", "text-danger");
    mensajeEmail.textContent = "";

    // limpiar la tarjeta de resultados y ocultarla
    datoNombre.textContent = "";
    datoApellido.textContent = "";
    datoEdad.textContent = "";
    datoEmail.textContent = "";
    datoPrograma.textContent = "";
    tarjetaResultado.classList.add("d-none");

    // aviso con SweetAlert de que ya se limpió
    Swal.fire({ template: "#alerta-limpiado" });
});

// eventos focus y blur que sirven para resaltar el campo donde está relenando la persona

const campos = [inputNombre, inputApellido, inputPrograma, inputEdad, inputEmail];

campos.forEach((campo) => {
    campo.addEventListener('focus', () => {
        campo.classList.add("bg-warning-subtle");
    });

    campo.addEventListener('blur', () => {
        campo.classList.remove("bg-warning-subtle");
    });
});



//evento de ventana, cuando la página termina de cargar (load)
window.addEventListener('load', () => {
    // Mensaje de bienvenida
    Swal.fire({ template: "#alerta-bienvenida" });

    // Fecha y hora actual en la parte superior
    let ahora = new Date();
    fechaHora.textContent = ahora.toLocaleString("es-CO");
});

// Nombre, mientras la persona escribe (input)
inputNombre.addEventListener('input', () => {
    if (inputNombre.value === "") {
        mensajeNombre.textContent = "";
    } else {
        mensajeNombre.textContent = "Escribiendo: " + inputNombre.value;
    }
});

// Edad, mientras la persona escribe (input)
inputEdad.addEventListener('input', () => {
    if (inputEdad.value === "") {
        mensajeEdad.textContent = "";
    } else if (Number(inputEdad.value) < 18) {
        mensajeEdad.textContent = "Menor de edad";
        mensajeEdad.classList.remove("text-success");
        mensajeEdad.classList.add("text-danger");
    } else {
        mensajeEdad.textContent = "Mayor de edad";
        mensajeEdad.classList.remove("text-danger");
        mensajeEdad.classList.add("text-success");
    }
});

//Correo, cuando la persona sale del campo (blur)
inputEmail.addEventListener('blur', () => {
    if (!inputEmail.value.includes("@")) {
        mensajeEmail.textContent = "El correo debe contener el símbolo @";
    } else {
        mensajeEmail.textContent = "";
    }
});

//  mouseenter, cuando el mouse entra al botón Guardar, cambia de color
btnGuardar.addEventListener('mouseenter', () => {
    btnGuardar.classList.remove("btn-info");
    btnGuardar.classList.add("btn-warning");
});

//  mouseleave, cuando el mouse sale, vuelve al color original
btnGuardar.addEventListener('mouseleave', () => {
    btnGuardar.classList.remove("btn-warning");
    btnGuardar.classList.add("btn-info");
});

//  formulario, al presionar Guardar (submit)
formulario.addEventListener('submit', (evento) => {
    // Evita que la página se recargue
    evento.preventDefault();

    // Si falta algún dato no muestra la tarjeta (la alerta ya la mostró el click de Guardar)
    if (inputNombre.value === "" || inputApellido.value === "" || inputEmail.value === "" || inputPrograma.value === "" || inputEdad.value === "") {
        return;
    }

    // Escribe los datos del formulario dentro de la tarjeta
    datoNombre.textContent = inputNombre.value;
    datoApellido.textContent = inputApellido.value;
    datoEdad.textContent = inputEdad.value;
    datoEmail.textContent = inputEmail.value;
    datoPrograma.textContent = inputPrograma.value;

    // Muestra la tarjeta (le quita la clase que la oculta)
    tarjetaResultado.classList.remove("d-none");
});