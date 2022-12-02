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
  Marcar,
  Empleado,
} from '../models';
import {MarcarRepository} from '../repositories';

export class MarcarEmpleadoController {
  constructor(
    @repository(MarcarRepository) protected marcarRepository: MarcarRepository,
  ) { }

  @get('/marcars/{id}/empleados', {
    responses: {
      '200': {
        description: 'Array of Marcar has many Empleado',
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
    return this.marcarRepository.empleados(id).find(filter);
  }

  @post('/marcars/{id}/empleados', {
    responses: {
      '200': {
        description: 'Marcar model instance',
        content: {'application/json': {schema: getModelSchemaRef(Empleado)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Marcar.prototype.idEmpleado,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Empleado, {
            title: 'NewEmpleadoInMarcar',
            exclude: ['idEmpleado'],
            optional: ['marcarId']
          }),
        },
      },
    }) empleado: Omit<Empleado, 'idEmpleado'>,
  ): Promise<Empleado> {
    return this.marcarRepository.empleados(id).create(empleado);
  }

  @patch('/marcars/{id}/empleados', {
    responses: {
      '200': {
        description: 'Marcar.Empleado PATCH success count',
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
    return this.marcarRepository.empleados(id).patch(empleado, where);
  }

  @del('/marcars/{id}/empleados', {
    responses: {
      '200': {
        description: 'Marcar.Empleado DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Empleado)) where?: Where<Empleado>,
  ): Promise<Count> {
    return this.marcarRepository.empleados(id).delete(where);
  }
}
