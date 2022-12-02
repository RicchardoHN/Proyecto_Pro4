import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ProyectoDataSource} from '../datasources';
import {PermisoHora, PermisoHoraRelations} from '../models';

export class PermisoHoraRepository extends DefaultCrudRepository<
  PermisoHora,
  typeof PermisoHora.prototype.idEmpleado,
  PermisoHoraRelations
> {
  constructor(
    @inject('datasources.proyecto') dataSource: ProyectoDataSource,
  ) {
    super(PermisoHora, dataSource);
  }
}
