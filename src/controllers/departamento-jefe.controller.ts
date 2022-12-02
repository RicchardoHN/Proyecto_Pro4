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
  Departamento,
  Jefe,
} from '../models';
import {DepartamentoRepository} from '../repositories';

export class DepartamentoJefeController {
  constructor(
    @repository(DepartamentoRepository) protected departamentoRepository: DepartamentoRepository,
  ) { }

  @get('/departamentos/{id}/jefes', {
    responses: {
      '200': {
        description: 'Array of Departamento has many Jefe',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Jefe)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Jefe>,
  ): Promise<Jefe[]> {
    return this.departamentoRepository.jefes(id).find(filter);
  }

  @post('/departamentos/{id}/jefes', {
    responses: {
      '200': {
        description: 'Departamento model instance',
        content: {'application/json': {schema: getModelSchemaRef(Jefe)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Departamento.prototype.idJefe,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Jefe, {
            title: 'NewJefeInDepartamento',
            exclude: ['idJefe'],
            optional: ['departamentoId']
          }),
        },
      },
    }) jefe: Omit<Jefe, 'idJefe'>,
  ): Promise<Jefe> {
    return this.departamentoRepository.jefes(id).create(jefe);
  }

  @patch('/departamentos/{id}/jefes', {
    responses: {
      '200': {
        description: 'Departamento.Jefe PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Jefe, {partial: true}),
        },
      },
    })
    jefe: Partial<Jefe>,
    @param.query.object('where', getWhereSchemaFor(Jefe)) where?: Where<Jefe>,
  ): Promise<Count> {
    return this.departamentoRepository.jefes(id).patch(jefe, where);
  }

  @del('/departamentos/{id}/jefes', {
    responses: {
      '200': {
        description: 'Departamento.Jefe DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Jefe)) where?: Where<Jefe>,
  ): Promise<Count> {
    return this.departamentoRepository.jefes(id).delete(where);
  }
}
