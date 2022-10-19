
export class ListaTarea {
    constructor() {
        this.cargarDatosLocalStorage();
    }
    
    guardarDatosLocalStorage() {
        localStorage.setItem('tarea', JSON.stringify(this.tarea));
        localStorage.setItem('progreso', JSON.stringify(this.progreso));
        localStorage.setItem('hecho', JSON.stringify(this.hecho));
    }
    cargarDatosLocalStorage() {
        this.tarea = (localStorage.getItem('tarea')) ? JSON.parse(localStorage.getItem('tarea')) : [];
        this.progreso = (localStorage.getItem('progreso')) ? JSON.parse(localStorage.getItem('progreso')) : [];
        this.hecho = (localStorage.getItem('hecho')) ? JSON.parse(localStorage.getItem('hecho')) : [];

        this.tarea = this.tarea.map(Tarea.fromJson);
        this.hecho = this.hecho.map(Tarea.fromJson);
        this.progreso = this.progreso.map(Tarea.fromJson);

    }
}