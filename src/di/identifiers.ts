/**
 * Constants used in dependence injection.
 *
 * @abstract
 */
export abstract class Identifier {
    public static readonly APP: any = Symbol.for('App')

    // Controllers
    public static readonly HOME_CONTROLLER: any = Symbol.for('HomeController')
    public static readonly USER_CONTROLLER: any = Symbol.for('UserController')
    public static readonly ACTIVITY_CONTROLLER: any = Symbol.for('ActivityController')
    public static readonly ENVIRONMENT_CONTROLLER: any = Symbol.for('EnvironmentController')

    // Services
    public static readonly USER_SERVICE: any = Symbol.for('UserService')
    public static readonly ACTIVITY_SERVICE: any = Symbol.for('ActivityService')
    public static readonly ENVIRONMENT_SERVICE: any = Symbol.for('EnvironmentService')

    // Repositories
    public static readonly USER_REPOSITORY: any = Symbol.for('UserRepository')
    public static readonly ACTIVITY_REPOSITORY: any = Symbol.for('ActivityRepository')
    public static readonly ENVIRONMENT_REPOSITORY: any = Symbol.for('EnvironmentRepository')

    // Models
    public static readonly ACTIVITY_REPO_MODEL: any = Symbol.for('ActivityRepoModel')
    public static readonly ENVIRONMENT_REPO_MODEL: any = Symbol.for('EnvironmentRepoModel')
    public static readonly USER_ENTITY: any = Symbol.for('UserEntity')
    public static readonly ACTIVITY_ENTITY: any = Symbol.for('ActivityEntity')
    public static readonly ENVIRONMENT_ENTITY: any = Symbol.for('EnvironmentEntity')

    // Mappers
    public static readonly USER_ENTITY_MAPPER: any = Symbol.for('UserEntityMapper')
    public static readonly ACTIVITY_ENTITY_MAPPER: any = Symbol.for('ActivityEntityMapper')
    public static readonly ENVIRONMENT_ENTITY_MAPPER: any = Symbol.for('EnvironmentEntityMapper')

    // Background Services
    public static readonly RABBITMQ_EVENT_BUS: any = Symbol.for('EventBusRabbitMQ')
    public static readonly RABBITMQ_CONNECTION_FACTORY: any = Symbol.for('RabbitMQConnectionFactory')
    public static readonly RABBITMQ_CONNECTION: any = Symbol.for('RabbitMQConnection')
    public static readonly MONGODB_CONNECTION_FACTORY: any = Symbol.for('MongoDBConnectionFactory')
    public static readonly MONGODB_CONNECTION: any = Symbol.for('MongoDBConnection')
    public static readonly BACKGROUND_SERVICE: any = Symbol.for('BackgroundService')

    // Log
    public static readonly LOGGER: any = Symbol.for('CustomLogger')
}
