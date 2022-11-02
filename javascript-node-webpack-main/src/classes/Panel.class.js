import { Tarea } from "./Tarea.class";

export class Panel {

    constructor(num) {
        this.cod = 'P' + num;
        this.tareas = this.cargarLocalStorage();

    }
    AddTarea(tarea) {
        if (this.tareas === undefined) {
            this.tareas = [tarea];
        } else {
            this.tareas.push(tarea);
        }
        this.guardarLocalStorage();
    }
    buscarTarea(id) {
        let incluida = false;
        let tar = this.tareas.filter(tarea => tarea.id == id);
        if (tar.length > 0) {
            incluida = true;
        }
        return incluida;
    }
    buscarTarea2(id) {
        let tar = this.tareas.filter(tarea => tarea.id == id);
        return tar[0];
    }
    borrarTarea(id) {
        let tarea = this.tareas.filter(element => element.id == id);
        if (this.tareas.indexOf(tarea) !== -1) {
            this.tarea.slice(i, i + 1);
        }
        this.guardarLocalStorage();
    }
    modificarTarea(tarea) {
        let i = this.tarea.indexOf(tarea);
        if (i !== -1) {
            this.tarea.splice(i, i - 1, tarea);
        }
        this.guardarLocalStorage();
    }
    guardarLocalStorage() {
        localStorage.setItem(this.cod, JSON.stringify(this.tareas));
    }

    cargarLocalStorage() {
        this.tareas = (localStorage.getItem(this.cod))
            ? JSON.parse(localStorage.getItem(this.cod))
            : [];
        this.tareas = this.tareas.map(Tarea.fromJSON);

    }
}