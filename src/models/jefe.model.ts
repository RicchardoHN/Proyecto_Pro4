import {Entity, model, property} from '@loopback/repository';

@model()
export class Jefe extends Entity {
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
  departamento: string;


  constructor(data?: Partial<Jefe>) {
    super(data);
  }
}

export interface JefeRelations {
  // describe navigational properties here
}

export type JefeWithRelations = Jefe & JefeRelations;
