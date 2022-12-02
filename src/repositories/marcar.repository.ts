import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ProyectoDataSource} from '../datasources';
import {Marcar, MarcarRelations} from '../models';

export class MarcarRepository extends DefaultCrudRepository<
  Marcar,
  typeof Marcar.prototype.idEmpleado,
  MarcarRelations
> {
  constructor(
    @inject('datasources.proyecto') dataSource: ProyectoDataSource,
  ) {
    super(Marcar, dataSource);
  }
}
