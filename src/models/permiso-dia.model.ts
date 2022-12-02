import {Entity, model, property} from '@loopback/repository';

@model()
export class PermisoDia extends Entity {
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


  constructor(data?: Partial<PermisoDia>) {
    super(data);
  }
}

export interface PermisoDiaRelations {
  // describe navigational properties here
}

export type PermisoDiaWithRelations = PermisoDia & PermisoDiaRelations;
