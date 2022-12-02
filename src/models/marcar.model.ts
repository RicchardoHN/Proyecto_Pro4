import {Entity, model, property, hasMany} from '@loopback/repository';
import {Empleado} from './empleado.model';

@model()
export class Marcar extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idEmpleado?: string;

  @property({
    type: 'date',
    required: true,
  })
  horaEntrada: string;

  @property({
    type: 'date',
    required: true,
  })
  horaSalida: string;

  @property({
    type: 'string',
    required: true,
  })
  nombreCompleto: string;

  @hasMany(() => Empleado)
  empleados: Empleado[];

  constructor(data?: Partial<Marcar>) {
    super(data);
  }
}

export interface MarcarRelations {
  // describe navigational properties here
}

export type MarcarWithRelations = Marcar & MarcarRelations;
