import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ProyectoDataSource} from '../datasources';
import {Empleado, EmpleadoRelations} from '../models';

export class EmpleadoRepository extends DefaultCrudRepository<
  Empleado,
  typeof Empleado.prototype.idEmpleado,
  EmpleadoRelations
> {
  constructor(
    @inject('datasources.proyecto') dataSource: ProyectoDataSource,
  ) {
    super(Empleado, dataSource);
  }
}
