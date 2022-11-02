export class tarea {
    constructor(tarea, prioridad, img, sub, completada) {
        this.tarea = tarea;
        this.prioridad = prioridad;
        this.cod = 'T' + new Date().getTime();
        this.completada = completada;
        this.img = img;
        this.subtareas = sub;
    }

}   
