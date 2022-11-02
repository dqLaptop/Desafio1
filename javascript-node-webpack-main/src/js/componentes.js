
import { crearTareaHtml, crearSubHtml, functioncheck, obtenerValorRadio, functionEditClick, functionEliminar } from './index';
import { PanelHecho, PanelPendiente, PanelProgreso } from "../index";
import { Tarea, Subtarea, ListaSubtarea } from "../Classes/index";

export const modal = document.querySelector('.modal');
export const buttonAceptar = document.querySelector('#aceptar');
export const buttonModificar = document.querySelector('#modificar');
export const divPendiente = document.querySelector('.Pendiente');
export const divProgreso = document.querySelector('.progreso');
export const divHecho = document.querySelector('.hecho');
export const addTarea = document.querySelectorAll('.addTarjeta');
export const cancelar = document.querySelector('#cancelar');
export const addSub = document.querySelector('#addSub');
export const subT = document.querySelector('#subT');
export const ulSub = document.querySelector('.ulSub');
export const barra = document.querySelector('.barra');
export const bp = document.querySelector('.bp');
export const contenedores = document.querySelectorAll('.contenedor');
export var ls = new ListaSubtarea();
export var botonPulsado = '';
let tareaD = "";
let p = "";


document.querySelector('#cambio').addEventListener('click', function () {
    if (document.querySelector('#body').classList.value === 'temaClaro') {
        document.querySelector('#body').classList.remove('temaClaro');
        document.querySelector('#body').classList.add('temaOscuro');
    } else {
        document.querySelector('#body').classList.remove('temaOscuro');
        document.querySelector('#body').classList.add('temaClaro');
    }
});
cancelar.addEventListener('click', function () {
    modal.classList.remove('aparecer');
    modal.classList.add('desaparecer');
    document.querySelector('#addNomT').value = '';
    document.querySelector('#foto').value = '';
});

addTarea.forEach(add => {
    add.addEventListener('click', function (e) {
        buttonAceptar.classList.remove('desaparecer');
        buttonAceptar.classList.add('aparecer');
        buttonModificar.classList.remove('aparecer');
        buttonModificar.classList.add('desaparecer');
        modal.classList.remove('desaparecer');
        modal.classList.add('aparecer');
        botonPulsado = (e.target.id === 'P1') ? botonPulsado = 'P1' : (e.target.id === 'P2') ? botonPulsado = 'P2' : botonPulsado = 'P3';
    });
});
document.querySelector('#deleteSub').addEventListener('click', function () {
    subT.value = '';
    subT.classList.remove('aparecer');
    subT.classList.add('desaparecer');
});
buttonAceptar.addEventListener('click', function () {
    let inputNom = document.querySelector('#addNomT').value;
    let inputImg = document.querySelector('#foto').value;
    let valorRadio = obtenerValorRadio();

    if (inputNom.trim() === '') {
        alert('Escribe un nombre para la tarea');
    } else {
        if (valorRadio === 0) {
            alert('Selecciona una prioridad para la tarea');
        } else {
            modal.classList.remove('aparecer');
            modal.classList.add('desaparecer');
            let t = new Tarea(inputNom, valorRadio, inputImg, ls, false);
            ls = new ListaSubtarea();
            (botonPulsado === 'P1') ? PanelPendiente.AddTarea(t) : (botonPulsado === 'P2') ? PanelProgreso.AddTarea(t) : PanelHecho.AddTarea(new Tarea(inputNom, valorRadio, inputImg, ls, true));
            crearTareaHtml(t);
            document.querySelectorAll('.tarjeta').forEach(tarjeta => {
                tarjeta.addEventListener('dragstart', functionDragStar);
            });
            document.querySelectorAll('.edit').forEach(editar => {
                editar.addEventListener('click', functionEditClick);
            });
            document.querySelectorAll('.delete').forEach(del => {
                del.addEventListener('click', functionEliminar);
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

const functionDragStar = (e) => {
    e.stopPropagation();
    e.dataTransfer.setData("text", e.target.id);
    tareaD = e.target.id;
}
contenedores.forEach(contenedor => {
    contenedor.addEventListener('dragover', function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (e.target.id === 'Panel1') {
            let encontrado = PanelPendiente.buscarTarea(tareaD);
            if (encontrado === true) {
                p = 'Panel1';
            }
        } else {
            if (e.target.id === 'Panel2') {
                let encontrado = PanelProgreso.buscarTarea(tareaD);
                if (encontrado === true) {
                    p = 'Panel2';
                }
            } else {
                let encontrado = PanelHecho.buscarTarea(tareaD);
                if (encontrado === true) {
                    p = 'Panel3';
                }
            }
        }
    })
});

contenedores.forEach(contenedor => {
    contenedor.addEventListener('drop', function (e) {
        e.stopPropagation();
        e.preventDefault();
        let data = e.dataTransfer.getData("text");
        e.currentTarget.append(document.getElementById(data));
        (e.currentTarget.id === 'Panel1') ? PanelPendiente.AddTarea(tareaD) : (e.currentTarget.id === 'Panel2') ? PanelProgreso.AddTarea(tareaD) : PanelHecho.AddTarea(tareaD);
        (p === 'Panel1') ? PanelPendiente.borrarTarea(tareaD) : (p === 'Panel2') ? PanelProgreso.borrarTarea(tareaD) : PanelHecho.borrarTarea(tareaD);
    })
});

subT.addEventListener('keyup', (event) => {
    if (event.keyCode === 13 && subT.value.length > 0) {
        let s = new Subtarea(subT.value, false);
        ls.nuevaSubtarea(s);
        crearSubHtml(s);
        document.querySelector("#" + s.id).addEventListener('change', functioncheck);
        subT.value = '';
        subT.classList.remove('aparecer');
        subT.classList.add('desaparecer');
    }
});
buttonModificar.addEventListener('click', function () {

});