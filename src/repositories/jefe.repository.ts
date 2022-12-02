import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ProyectoDataSource} from '../datasources';
import {Jefe, JefeRelations} from '../models';

export class JefeRepository extends DefaultCrudRepository<
  Jefe,
  typeof Jefe.prototype.idJefe,
  JefeRelations
> {
  constructor(
    @inject('datasources.proyecto') dataSource: ProyectoDataSource,
  ) {
    super(Jefe, dataSource);
  }
}
