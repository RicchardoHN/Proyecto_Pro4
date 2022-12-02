import {Entity, model, property, hasMany} from '@loopback/repository';
import {Empleado} from './empleado.model';

@model()
export class Vacaciones extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idEmpleado?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombreCompleto: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaSalida: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaRegreso: string;

  @hasMany(() => Empleado)
  empleados: Empleado[];

  constructor(data?: Partial<Vacaciones>) {
    super(data);
  }
}

export interface VacacionesRelations {
  // describe navigational properties here
}

export type VacacionesWithRelations = Vacaciones & VacacionesRelations;
