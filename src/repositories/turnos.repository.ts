import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ProyectoDataSource} from '../datasources';
import {Turnos, TurnosRelations} from '../models';

export class TurnosRepository extends DefaultCrudRepository<
  Turnos,
  typeof Turnos.prototype.idTurno,
  TurnosRelations
> {
  constructor(
    @inject('datasources.proyecto') dataSource: ProyectoDataSource,
  ) {
    super(Turnos, dataSource);
  }
}
