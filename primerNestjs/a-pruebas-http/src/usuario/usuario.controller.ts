import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioEntity } from './usuario.entity';
import { DeleteResult } from 'typeorm';
import * as Joi from '@hapi/joi'
import { UsuarioCreateDto } from './usuario.create-dto';
import { validate } from 'class-validator';

//JS const Joi = require ('@hapi/joi')

@Controller('usuario')
export class UsuarioController {
  constructor(
    private readonly _usuarioService: UsuarioService,
  ) {

  }

  // GET /modelo/:id
  @Get(':id')
  obtenerUnUsuario(
    @Param('id') identificador: string,
  ): Promise<UsuarioEntity | undefined> {
    return this._usuarioService
      .encontrarUno(
        Number(identificador),
      );
  }

  @Post()
  async crearUnUsuario(
    @Body() usuario: UsuarioEntity,
  ): Promise<UsuarioEntity> {
    let usuarioCreateDTO=new UsuarioCreateDto();
    usuarioCreateDTO.nombre=usuario.nombre;
    usuarioCreateDTO.cedula=usuario.cedula;

    const errores= await validate(usuarioCreateDTO);
    if(errores.length>0){
      throw new BadRequestException('Error validando')
    }else{
      return this._usuarioService
        .crearUno(
          usuario,
        );
    }


  }

  @Put()
  actualizarUnUsuario(
    @Body() usuario: UsuarioEntity,
    @Param('id')id: string,
  ): Promise<UsuarioEntity> {
    return this._usuarioService
      .actualizarUno(
        +id,
        usuario,
      );
  }

  @Delete(':id')
  eliminarUnUsuario(
    @Param('id')id: string,
  ): Promise<DeleteResult> {
    return this._usuarioService
      .borrarUno(
        +id,
      );
  }

  @Get()
  buscar(
    @Query('skip') skip?: string|number,
    @Query('take')take?: string|number,
    @Query('where')where?: string,
    @Query('order')order?: string,

  ): Promise<UsuarioEntity[]> {

    if(skip){
      skip= +skip;
    }
    if(take){
      take= +take;
    }
    if(where){
      try {
        where=JSON.parse(where);
      }catch (e) {
        where=undefined;
      }
    }
    if(order){
      try {
        order=JSON.parse(order);
      }catch (e) {
        order=undefined;
      }
    }
    return this._usuarioService
      .buscar(
        where,
        skip as number,
        take as number
      );
  }

  @Get('hola')
  hola(): string {
    return 'Hola';
  }
}
