import { PanelHecho, PanelPendiente, PanelProgreso } from "../index";
import { tarea, subtarea, listaSubtarea } from "../Classes/index";

const divPendiente = document.querySelector('.Pendiente');
const divProgreso = document.querySelector('.progreso');
const divHecho = document.querySelector('.hecho');
const addTarea = document.querySelectorAll('.addTarjeta');
const cancelar = document.querySelector('#cancelar');
const addSub = document.querySelector('#addSub');
const subT = document.querySelector('#subT');
const ulSub = document.querySelector('.ulSub');
const barra = document.querySelector('.barra');
const bp = document.querySelector('.bp');
const contenedores = document.querySelectorAll('.contenedor');
var ls = new listaSubtarea();
var botonPulsado = '';


const crearTareaHtml = (tarea) => {
    let htmlTodo = '';
    if (tarea.img === '') {
        htmlTodo = `
        <div id="${tarea.cod}" draggable="true" class="twelve columns tarjeta">
        <label>${tarea.tarea}</label>
        <span class="dot"></span>
        </div>
        `;
    } else {
        htmlTodo = `
    <div draggable="true" class="twelve columns tarjeta">
    <img src="${tarea.img}"></img>
    <label>${tarea.tarea}</label>
    <span class="dot"></span>
    </div>
    `;
    }
    //Creo el elemento html
    const div = document.createElement('div'); //Quiero crear el elemento con todos los nodos pero luego añado sólo el hijo
    div.innerHTML = htmlTodo;
    (botonPulsado === 'P1') ? divPendiente.append(div.firstElementChild) : (botonPulsado === 'P2') ? divProgreso.append(div.firstElementChild) : divHecho.append(div.firstElementChild);
    return div;
}
const crearSubHtml = (subtarea) => {
    const htmlTodo = `
                <div class="row">
                    <input type="checkbox" class="columns one check" id="${subtarea.id}">
                    <label for="${subtarea.id}" class="columns four">${subtarea.subtarea}</label>
                 </div>
        </div>
    `;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;
    ulSub.append(div);
    return div;
}

cancelar.addEventListener('click', function () {
    modal.classList.remove('aparecer');
    modal.classList.add('desaparecer');
    document.querySelector('#addNomT').value = '';
    document.querySelector('#foto').value = '';
});
const modal = document.querySelector('.modal');
const buttonAceptar = document.querySelector('#aceptar');
addTarea.forEach(add => {
    add.addEventListener('click', function (e) {
        modal.classList.remove('desaparecer');
        modal.classList.add('aparecer');
        botonPulsado = (e.target.id === 'P1') ? botonPulsado = 'P1' : (e.target.id === 'P2') ? botonPulsado = 'P2' : botonPulsado = 'P3';
    });
});

buttonAceptar.addEventListener('click', function () {
    const inputNom = document.querySelector('#addNomT').value;
    const inputImg = document.querySelector('#foto').value;
    const valorRadio = obtenerValorRadio();

    if (inputNom.trim() === '') {
        alert('Escribe un nombre para la tarea');
    } else {
        if (valorRadio === 0) {
            alert('Selecciona una prioridad para la tarea');
        } else {
            modal.classList.remove('aparecer');
            modal.classList.add('desaparecer');
            let t = new tarea(inputNom, valorRadio, inputImg, ls, false);
            ls = new listaSubtarea();
            (botonPulsado === 'P1') ? PanelPendiente.AddTarea(t) : (botonPulsado === 'P2') ? PanelProgreso.AddTarea(t) : PanelHecho.AddTarea(t);
            crearTareaHtml(t);
            document.querySelectorAll('.tarjeta').forEach(tarjeta => {
                tarjeta.addEventListener('dragstart', functionDragStar);
            });
            document.querySelector('#addNomT').value = '';
            document.querySelector('#foto').value = '';
            document.querySelector('input[name="p"]:checked').value = "";

        }
    }
});

addSub.addEventListener('click', function () {
    subT.classList.remove('desaparecer');
    subT.classList.add('aparecer');
});

const functioncheck = () => {
    const checklist = document.querySelectorAll('.check')
    let cont = 0;
    for (let i = 0; i < checklist.length; i++) {
        if (checklist[i].checked) {
            cont = cont + 1;
        }
    }
    if (cont !== 0) {
        barra.style.width = (cont * 100) / ls.lista.length + '%';
        bp.innerHTML = Math.floor((cont * 100) / ls.lista.length) + "%";
    } else {
        barra.style.width = 0
        bp.innerHTML = '0%';
    }
}
const obtenerValorRadio = () => {
    let valor = 0;
    const radio = document.querySelectorAll('input[name="p"]');
    let completado = false;
    for (let index = 0; index < radio.length && !completado; index++) {
        if (radio[index].checked) {
            let selector = 'label[for=' + radio[index].id + ']';
            let label = document.querySelector(selector);
            valor = label.innerHTML
            completado = true;
        }
    }
    return valor;
}
const functionDragStar = (e) => {
    e.stopPropagation();
    e.dataTransfer.setData("text", e.target.id);
}
contenedores.forEach(contenedor => {
    contenedor.addEventListener('dragover', function (e) {
        e.preventDefault();
        e.stopPropagation();
    })
});

contenedores.forEach(contenedor => {
    contenedor.addEventListener('drop', function (e) {
        e.stopPropagation();
        e.preventDefault();
        let data = e.dataTransfer.getData("text");
        e.currentTarget.append(document.getElementById(data));
    })
});


subT.addEventListener('keyup', (event) => {
    if (event.keyCode === 13 && subT.value.length > 0) { //Cuando pulso intro
        const s = new subtarea(subT.value, false);
        ls.nuevaSubtarea(s);
        crearSubHtml(s);
        document.querySelector("#" + s.id).addEventListener('change', functioncheck);
        subT.value = '';
        subT.classList.remove('aparecer');
        subT.classList.add('desaparecer');
    }
});
document.querySelectorAll("div.acordeon h3").forEach(titulo => {
    titulo.addEventListener("click", function(){
        if( this.nextElementSibling.style.display == "block" ){
            this.nextElementSibling.style.display = "none";
        }else{
            this.nextElementSibling.style.display = "block";
        }
    });
});




