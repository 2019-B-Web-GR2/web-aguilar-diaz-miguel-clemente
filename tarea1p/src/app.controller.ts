import {Body, Controller, Delete, Get, Headers, HttpCode, Post, Put, Query} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()


export class AppController {

  puntaje: number=100;

  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }


  @Get('suma')
  @HttpCode(200)
  public sumar(
      @Headers() cabeceras:any,
      @Headers('numero1') numero1:string,
      @Headers('numero2') numero2:string,
  ){
    console.log(cabeceras);
    const resultado: number=parseInt(numero1)+parseInt(numero2);
    return `Resultado de la suma: ${resultado}. ${this.quitarScore(resultado)}`;
  }

  @Post('resta')
  @HttpCode(201)
  public restar(
      @Body('numero1') numero1: string,
      @Body('numero2') numero2:string
  ):string{
    const resultado: number=parseInt(numero1)-parseInt(numero2);
    return `Resultado de la resta: ${resultado}. ${this.quitarScore(resultado)}`;
  }

  @Put('multiplicacion')
  @HttpCode(202)
  public multiplicar(
      @Query('numero1')numero1:string,
      @Query('numero2')numero2:string
  ){
    console.log(`${numero1} ${numero2}`);
    const resultado: number=parseInt(numero1)*parseInt(numero2);
    return `Resultado de la multiplicacion: ${resultado}. ${this.quitarScore(resultado)}`;
  }

  @Delete('division')
  @HttpCode(200)
  public dividir(
      @Headers() cabeceras:any,
      @Headers('numero1') numero1:string,
      @Headers('numero2') numero2:string,
  ){
    console.log(cabeceras);
    const resultado: number=parseInt(numero1)/parseInt(numero2);
    return `Resultado de la division: ${resultado}. ${this.quitarScore(resultado)}`;
  }

  public quitarScore(valor:number):String{
    let respuesta:String='';
    this.puntaje=this.puntaje-Math.abs(valor);
    if(this.puntaje<=0){
      this.puntaje=100;
      respuesta+='Puntaje llego a cero, puntaje restablecido. '
    }
    respuesta+=`Puntaje actual: ${this.puntaje}`;
    return respuesta;
  }
}
