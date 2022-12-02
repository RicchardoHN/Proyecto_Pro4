import {Entity, model, property, hasMany} from '@loopback/repository';
import {Empleado} from './empleado.model';

@model()
export class PermisoHora extends Entity {
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
  horaSalida: string;

  @property({
    type: 'date',
    required: true,
  })
  horaRegreso: string;

  @hasMany(() => Empleado)
  empleados: Empleado[];

  constructor(data?: Partial<PermisoHora>) {
    super(data);
  }
}

export interface PermisoHoraRelations {
  // describe navigational properties here
}

export type PermisoHoraWithRelations = PermisoHora & PermisoHoraRelations;
