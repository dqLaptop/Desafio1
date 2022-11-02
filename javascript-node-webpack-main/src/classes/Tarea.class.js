export class Tarea {

    constructor(tarea, prioridad, img, sub, completada) {
        this.tarea = tarea;
        this.prioridad = prioridad;
        this.cod = 'T' + new Date().getTime();
        this.completada = completada;
        this.img = img;
        this.subtareas = sub;
    }
    static fromJSON({ tarea, prioridad, img, sub, completada }) {
        const tareaJ = new Tarea(tarea, prioridad, img, sub, completada);
        console.log(tareaJ);
        return tareaJ;
    }
}