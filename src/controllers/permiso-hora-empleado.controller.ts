import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  PermisoHora,
  Empleado,
} from '../models';
import {PermisoHoraRepository} from '../repositories';

export class PermisoHoraEmpleadoController {
  constructor(
    @repository(PermisoHoraRepository) protected permisoHoraRepository: PermisoHoraRepository,
  ) { }

  @get('/permiso-horas/{id}/empleados', {
    responses: {
      '200': {
        description: 'Array of PermisoHora has many Empleado',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Empleado)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Empleado>,
  ): Promise<Empleado[]> {
    return this.permisoHoraRepository.empleados(id).find(filter);
  }

  @post('/permiso-horas/{id}/empleados', {
    responses: {
      '200': {
        description: 'PermisoHora model instance',
        content: {'application/json': {schema: getModelSchemaRef(Empleado)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof PermisoHora.prototype.idEmpleado,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Empleado, {
            title: 'NewEmpleadoInPermisoHora',
            exclude: ['idEmpleado'],
            optional: ['permisoHoraId']
          }),
        },
      },
    }) empleado: Omit<Empleado, 'idEmpleado'>,
  ): Promise<Empleado> {
    return this.permisoHoraRepository.empleados(id).create(empleado);
  }

  @patch('/permiso-horas/{id}/empleados', {
    responses: {
      '200': {
        description: 'PermisoHora.Empleado PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Empleado, {partial: true}),
        },
      },
    })
    empleado: Partial<Empleado>,
    @param.query.object('where', getWhereSchemaFor(Empleado)) where?: Where<Empleado>,
  ): Promise<Count> {
    return this.permisoHoraRepository.empleados(id).patch(empleado, where);
  }

  @del('/permiso-horas/{id}/empleados', {
    responses: {
      '200': {
        description: 'PermisoHora.Empleado DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Empleado)) where?: Where<Empleado>,
  ): Promise<Count> {
    return this.permisoHoraRepository.empleados(id).delete(where);
  }
}
