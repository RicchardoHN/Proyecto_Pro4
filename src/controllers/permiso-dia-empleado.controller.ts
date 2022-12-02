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
  PermisoDia,
  Empleado,
} from '../models';
import {PermisoDiaRepository} from '../repositories';

export class PermisoDiaEmpleadoController {
  constructor(
    @repository(PermisoDiaRepository) protected permisoDiaRepository: PermisoDiaRepository,
  ) { }

  @get('/permiso-dias/{id}/empleados', {
    responses: {
      '200': {
        description: 'Array of PermisoDia has many Empleado',
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
    return this.permisoDiaRepository.empleados(id).find(filter);
  }

  @post('/permiso-dias/{id}/empleados', {
    responses: {
      '200': {
        description: 'PermisoDia model instance',
        content: {'application/json': {schema: getModelSchemaRef(Empleado)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof PermisoDia.prototype.idEmpleado,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Empleado, {
            title: 'NewEmpleadoInPermisoDia',
            exclude: ['idEmpleado'],
            optional: ['permisoDiaId']
          }),
        },
      },
    }) empleado: Omit<Empleado, 'idEmpleado'>,
  ): Promise<Empleado> {
    return this.permisoDiaRepository.empleados(id).create(empleado);
  }

  @patch('/permiso-dias/{id}/empleados', {
    responses: {
      '200': {
        description: 'PermisoDia.Empleado PATCH success count',
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
    return this.permisoDiaRepository.empleados(id).patch(empleado, where);
  }

  @del('/permiso-dias/{id}/empleados', {
    responses: {
      '200': {
        description: 'PermisoDia.Empleado DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Empleado)) where?: Where<Empleado>,
  ): Promise<Count> {
    return this.permisoDiaRepository.empleados(id).delete(where);
  }
}
