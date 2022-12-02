import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ProyectoDataSource} from '../datasources';
import {PermisoDia, PermisoDiaRelations} from '../models';

export class PermisoDiaRepository extends DefaultCrudRepository<
  PermisoDia,
  typeof PermisoDia.prototype.idEmpleado,
  PermisoDiaRelations
> {
  constructor(
    @inject('datasources.proyecto') dataSource: ProyectoDataSource,
  ) {
    super(PermisoDia, dataSource);
  }
}
