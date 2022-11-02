import {
    modal,
    buttonAceptar,
    buttonModificar,
    divPendiente,
    divProgreso,
    divHecho,
    ulSub,
    barra,
    bp,
    ls,
    botonPulsado
} from './index';
import { PanelHecho, PanelPendiente, PanelProgreso } from "../index";
import { Tarea, Subtarea, ListaSubtarea } from "../Classes/index";

export const crearTareaHtml = (tarea) => {
    let htmlTodo = '';
    if (tarea.img === '') {
        htmlTodo = `
        <div id="${tarea.cod}" draggable="true" class="twelve columns tarjeta">
        <label class="columns ten">${tarea.tarea}</label>
        <span class="dot columns two"></span>
        <img class="delete columns one"src="./assets/iconos/trash-2.svg">
        <img class="edit columns one"src="./assets/iconos/edit.svg">
        </div>
        `;
    } else {
        htmlTodo = `
    <div draggable="true" class="twelve columns tarjeta">
    <label class="columns eleven">${tarea.tarea}</label>
    <label>${tarea.tarea}</label>
    <span class="dot columns one"></span>
    <img class="delete"src="./assets/iconos/trash-2.svg">
    <img class="edit columns one"src="./assets/iconos/edit.svg">
    </div>
    `;
    }

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;
    (botonPulsado === 'P1') ? divPendiente.append(div.firstElementChild) : (botonPulsado === 'P2') ? divProgreso.append(div.firstElementChild) : divHecho.append(div.firstElementChild);
    return div;
}
export const crearSubHtml = (subtarea) => {
    const htmlTodo = `
                <div class="row">
                    <input type="checkbox" class="columns one check" id="${subtarea.id}">
                    <label for="${subtarea.id}" class="columns ten">${subtarea.subtarea}</label>
                 </div>
        </div>
    `;
    const div = document.createElement('div');
    div.innerHTML = htmlTodo;
    ulSub.append(div);
    return div;
}

export const functioncheck = () => {
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
export const obtenerValorRadio = () => {
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

