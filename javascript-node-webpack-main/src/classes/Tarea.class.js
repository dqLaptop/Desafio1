
export class Tarea {
    constructor(tarea, etiqueta) {
        this.tarea = tarea;
        this.etiqueta = etiqueta;
        this.cod = new Date().getTime();
        this.completada = false;
        this.img = null;
        this.subtareas = [];
    }

}