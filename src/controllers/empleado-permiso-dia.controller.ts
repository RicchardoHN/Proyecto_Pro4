import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Empleado,
  PermisoDia,
} from '../models';
import {EmpleadoRepository} from '../repositories';

export class EmpleadoPermisoDiaController {
  constructor(
    @repository(EmpleadoRepository)
    public empleadoRepository: EmpleadoRepository,
  ) { }

  @get('/empleados/{id}/permiso-dia', {
    responses: {
      '200': {
        description: 'PermisoDia belonging to Empleado',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(PermisoDia)},
          },
        },
      },
    },
  })
  async getPermisoDia(
    @param.path.string('id') id: typeof Empleado.prototype.idEmpleado,
  ): Promise<PermisoDia> {
    return this.empleadoRepository.permisoDia(id);
  }
}
