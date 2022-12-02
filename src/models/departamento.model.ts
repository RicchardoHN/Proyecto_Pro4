import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Jefe} from './jefe.model';
import {Empleado} from './empleado.model';

@model()
export class Departamento extends Entity {
  @property({
    type: 'string',
  })
  nombreDepartamento?: string;

  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idJefe?: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @hasMany(() => Jefe)
  jefes: Jefe[];

  @belongsTo(() => Empleado)
  empleadoId: string;

  constructor(data?: Partial<Departamento>) {
    super(data);
  }
}

export interface DepartamentoRelations {
  // describe navigational properties here
}

export type DepartamentoWithRelations = Departamento & DepartamentoRelations;
