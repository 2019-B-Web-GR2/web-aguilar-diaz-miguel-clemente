import {
    BadRequestException, Body,
    Controller,
    Get, Headers,
    HttpCode,
    InternalServerErrorException, Param,
    Post,
    Query
} from '@nestjs/common';
import {AppService} from './app.service';

@Controller('pepito') // segmento url -> "/"
export class AppController {
    constructor(private readonly appService: AppService) {
    } // http://localhost:4000/pepito/ GET
    @Get() // -> url "hola-mundo"
    getHello(): string {
        return this.appService.getHello();
    }

    // http://localhost:4000/pepito/ POST
    @HttpCode(200)
    @Post('esPar')
    adiosMundo(): string {
        const segundos = this.obtenerSegundos();
        if (segundos % 2 === 0) {
            return 'Adios mundo!';
        } else {
            throw new InternalServerErrorException(
                'Es  impar'
            );
        }

    }

    private obtenerSegundos(): number {
        return new Date().getSeconds();
    }

    @Get('bienvenida')
    public bienvenida(
        @Query() parametrosDeConsulta: ObjetoBienvenida,
        @Query('nombre') nombreUsuario: string,
        @Query('numero') numeroUsuario: string,
        @Query('casado') casadoUsuario: string,
    ): string {
        console.log(parametrosDeConsulta);
        console.log(typeof numeroUsuario);
        // template strings \\ `Mensaje ${variable}`
        return `Mensaje ${parametrosDeConsulta.nombre} Numero: ${parametrosDeConsulta.numero}`;
    }

    @Get('inscripcion-curso/:idCurso/:cedula') //  "/:nombreParametro"
    public inscripcionCurso(
        @Param() parametrosDeRuta: ObjetoInscripcion,
        @Param('idCurso') idCurso: string,
        @Param('cedula') cedula: string
    ): string {
        console.log(parametrosDeRuta);
        return `Te inscribiste al curso: ${idCurso}\n ${cedula}`;
    }

    @Post('almorzar')
    @HttpCode(200)
    public almorzar(
        @Body() parametrosDeCuerpo,
        @Body('id') id: number, // Objeto :D Arreglo D:
    ): string {
        console.log(parametrosDeCuerpo);
        return `Te inscribiste al curso: ${parametrosDeCuerpo}`;
    }

    @Get('obtener-cabeceras')
    obtenerCabeceras(
        @Headers() cabeceras,
        @Headers('numerouno') numeroUno: string,
    ) {
        console.log(cabeceras);
        return `Las cabeceras son: ${numeroUno}`;
    }
}

interface ObjetoInscripcion {
    idCurso: string;
    cedula: string;
}


interface ObjetoBienvenida {
    nombre?: string;
    numero?: string;
    casado?: string;
}


/*
import {Body, Controller, Headers, Get, HttpCode, Param, Post, Query} from '@nestjs/common';
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

    @Get('bienvenida')
    public bienvenida(
        @Query() parametrosDeConsulta:any,
        @Query('nombre') nombre:string,
        @Query('casado') bandera:string,
        @Query('numero') number:string
    ):string{
        console.log(parametrosDeConsulta);
        //template strings
        return `Mensaje ${parametrosDeConsulta.nombre} ${typeof parametrosDeConsulta}`
    }

    @Get('inscripcion-curso/:idCurso/:cedula') // /:nombreParametro
    public inscripcionCurso(
        @Param() parametrosDeRuta: ObjetoInscripcion,
        @Param('idCurso') idCurso: ObjetoInscripcion,
        @Param('cedula') cedula: ObjetoInscripcion
    ):string{
        console.log(parametrosDeRuta);
        //template strings
        return `Te inscribiste al curso ${idCurso} \n${cedula}`
    }

    @Post('almorzar') // /:nombreParametro
    @HttpCode(200)
    public almorzar(
        @Body() parametrosDeCuerpo,
        @Body('nombre') nombre:string //solo para un objeto sirve, para lo otro no
    ):string{
        console.log(parametrosDeCuerpo);
        //template strings
        return `Te inscribiste al curso ${parametrosDeCuerpo}`;
    }

    @Get('obtener-cabeceras')
    obtenerCabeceras(
        @Headers() cabeceras
    ){
        console.log(cabeceras);
        return `${cabeceras}`;
    }
}

interface ObjetoBienvenida {
    nombre?:string;
    numero?:string;
    casado?:string;
}

interface ObjetoInscripcion {
    idCurso: string;
    cedula: string;
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
*/
