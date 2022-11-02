export class Subtarea {
    constructor(nom, completada) {
        this.id = "S"+ new Date().getTime();
        this.subtarea = nom;
        this.completada = completada;
    }
}