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
  PermisoHora,
} from '../models';
import {EmpleadoRepository} from '../repositories';

export class EmpleadoPermisoHoraController {
  constructor(
    @repository(EmpleadoRepository)
    public empleadoRepository: EmpleadoRepository,
  ) { }

  @get('/empleados/{id}/permiso-hora', {
    responses: {
      '200': {
        description: 'PermisoHora belonging to Empleado',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(PermisoHora)},
          },
        },
      },
    },
  })
  async getPermisoHora(
    @param.path.string('id') id: typeof Empleado.prototype.idEmpleado,
  ): Promise<PermisoHora> {
    return this.empleadoRepository.permisoHora(id);
  }
}
