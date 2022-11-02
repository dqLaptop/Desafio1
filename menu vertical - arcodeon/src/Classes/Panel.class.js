export class Panel {

    constructor(num) {
        this.cod = 'P' + num;
        this.tareas = [];
        
    }
    AddTarea(tarea) {
        this.tareas.push(tarea);
    }
    borrarTarea(tarea) {
        let i = this.tarea.indexOf(tarea);
        if (i !== -1) {
            this.tarea.slice(i, i + 1);
        }
    }
    modificarTarea(tarea) {
        let i = this.tarea.indexOf(tarea);
        if (i !== -1) {
            this.tarea.splice(i, i - 1, tarea);
        }
    }
}