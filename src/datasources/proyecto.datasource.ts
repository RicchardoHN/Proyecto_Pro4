import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'proyecto',
  connector: 'mongodb',
  url: 'mongodb+srv://dev:proyectoP4@cluster0.nsj4dxw.mongodb.net/proj-pro4',
  host: 'cluster0.nsj4dxw.mongodb.net/proj-pro4',
  port: 27017,
  user: 'dev',
  password: 'proyectoP4proyproyectoP4proyectoP4',
  database: 'proj-pro4',
  useNewUrlParser: true
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class ProyectoDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'proyecto';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.proyecto', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
