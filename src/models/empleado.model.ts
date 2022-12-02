import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {PermisoHora} from './permiso-hora.model';
import {PermisoDia} from './permiso-dia.model';
import {Marcar} from './marcar.model';
import {Vacaciones} from './vacaciones.model';
import {Turnos} from './turnos.model';
import {Departamento} from './departamento.model';

@model()
export class Empleado extends Entity {
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
    type: 'string',
    required: true,
  })
  puesto: string;

  @property({
    type: 'string',
    required: true,
  })
  departamento: string;

  @belongsTo(() => PermisoHora)
  permisoHoraId: string;

  @belongsTo(() => PermisoDia)
  permisoDiaId: string;

  @belongsTo(() => Marcar)
  marcarId: string;

  @belongsTo(() => Vacaciones)
  vacacionesId: string;

  @belongsTo(() => Turnos)
  turnosId: string;

  @hasMany(() => Departamento)
  departamentos: Departamento[];

  constructor(data?: Partial<Empleado>) {
    super(data);
  }
}

export interface EmpleadoRelations {
  // describe navigational properties here
}

export type EmpleadoWithRelations = Empleado & EmpleadoRelations;
