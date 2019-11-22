import {Controller, Get, HttpCode, Post} from '@nestjs/common';
import {AppService} from './app.service';

@Controller('pepito') //recibe el segmento de la url -> '/'
export class AppController {
    constructor(private readonly appService: AppService) {
    }

    //http:/localhost:4000/pepito/hola-mundo
    @Get('hola-mundo')
    getHello(): string {
        return this.appService.getHello();
    }

    @HttpCode(200) //si sale bien
    @Post()
    adiosMundo():string{
        return 'Adios Mundo';
        //trow new Internal....Exeption('message'); //tambien sirve como el return pero para  errores
    }
}

// TypeScript
var nombre: string = "Miguel";  //no usar var
let apellido = "Aguilar";       // variable mutable se pueden reasignar
const cedula = "172534.....";   //variable no mutable no se puede cambiar

// existen tres tipos de datos primitivos, string, boolean y number
//tambien se puede usar null, pero si en la variable no se asigna ningun valor retorna undefined

//== compara los valores, === compara el valor y el tipo de dato
if (apellido === "") {

}

class Usuario {

    constructor(
        public nombre: string, //crear una propiedad llamada nombre y recibir un parametro y asignarlo a la propiedad nombre
        public apellido: string
    ) {
    }

    private lola(): void {

    }
}

class Usuario2 {
    constructor(
        public nombre: string,
        public apellido?: string
    ) {
    }

}

class Empleado extends Usuario2 {
    constructor(
        public nombre: string,
        public numeroContrato: String,
        public apellido?: string
    ) {
        super(nombre, apellido)
    }
}

var user = new Usuario2('miguel');

interface Pelota {
    diametro: number;
    color?: string;
}

const balon: Pelota = { //tipado de datos
    diametro: 10
};

interface Pokemon {
    id: number;
    nombre: string;
    entrenador: Entrenador | number; // entrenador es una foreign key
}

interface Entrenador {
    id: number;
    nombre: string;
}

const ash: Entrenador = {
    id: 1,
    nombre: 'ash'
};

const pikachu: Pokemon = {
    id: 1,
    nombre: 'pikachu',
    entrenador: ash
};

const suma = pikachu.id + (pikachu.entrenador as number);
