import {Entity, model, property, hasMany} from '@loopback/repository';
import {Empleado} from './empleado.model';

@model()
export class Turnos extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idTurno?: string;

  @property({
    type: 'string',
    required: true,
  })
  matutino: string;

  @property({
    type: 'string',
    required: true,
  })
  vespertino: string;

  @property({
    type: 'string',
    required: true,
  })
  mixto: string;

  @property({
    type: 'string',
    required: true,
  })
  nocturno: string;

  @property({
    type: 'string',
    required: true,
  })
  idEmpleado: string;

  @hasMany(() => Empleado)
  empleados: Empleado[];

  constructor(data?: Partial<Turnos>) {
    super(data);
  }
}

export interface TurnosRelations {
  // describe navigational properties here
}

export type TurnosWithRelations = Turnos & TurnosRelations;
