import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

// TypeScript
var nombre: string = "Miguel";  //no usar var
let apellido = "Aguilar";       // variable mutable se pueden reasignar
const cedula = "172534.....";   //variable no mutable no se puede cambiar

// existen tres tipos de datos primitivos, string, boolean y number
//tambien se puede usar null, pero si en la variable no se asigna ningun valor retorna undefined

//== compara los valores, === compara el valor y el tipo de dato
if (apellido===""){

}

class nombre1{

  private lola():void {

  }
}