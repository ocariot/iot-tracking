import { inject, injectable } from 'inversify'
import { Identifier } from '../../di/identifiers'
import { IActivityRepository } from '../../application/port/activity.repository.interface'
import { Activity } from '../../application/domain/model/activity'
import { ActivityEntity } from '../entity/activity.entity'
import { BaseRepository } from './base/base.repository'
import { IEntityMapper } from '../entity/mapper/entity.mapper.interface'
import { Query } from './query/query'
import { IEventBus } from '../port/event.bus.interface'
import { ILogger } from '../../utils/custom.logger'

/**
 * Implementation of the activity repository.
 *
 * @implements {IActivityRepository}
 */
@injectable()
export class ActivityRepository extends BaseRepository<Activity, ActivityEntity> implements IActivityRepository {
    constructor(
        @inject(Identifier.ACTIVITY_REPO_MODEL) protected readonly activityModel: any,
        @inject(Identifier.ACTIVITY_ENTITY_MAPPER) protected readonly activityMapper: IEntityMapper<Activity, ActivityEntity>,
        @inject(Identifier.RABBITMQ_EVENT_BUS) protected readonly _rabbitMQEventBus: IEventBus,
        @inject(Identifier.LOGGER) protected readonly logger: ILogger
    ) {
        super(activityModel, activityMapper, logger)
    }

    /**
     * Checks if an activity already has a registration.
     * What differs from one activity to another is the start date and associated user.
     *
     * @param activity
     * @return {Promise<boolean>} True if it exists or False, otherwise
     * @throws {ValidationException | RepositoryException}
     */
    public async checkExist(activity: Activity): Promise<boolean> {
        const query: Query = new Query()
        return new Promise<boolean>((resolve, reject) => {
            if (activity.getStartTime() && activity.getUser()) {
                query.filters = { start_time: activity.getStartTime(), user: activity.getUser().getId() }
            }
            super.findOne(query)
                .then((result: Activity) => {
                    if (result) return resolve(true)
                    return resolve(false)
                })
                .catch(err => reject(super.mongoDBErrorListener(err)))
        })
    }

    /**
     * Update user activity data.
     *
     * @param activity Containing the data to be updated
     * @param idUser User ID.
     * @return {Promise<T>}
     * @throws {ValidationException | ConflictException | RepositoryException}
     */
    public updateByUser(activity: Activity, idUser: string): Promise<Activity> {
        const itemUp: ActivityEntity = this.activityMapper.transform(activity)
        return new Promise<Activity>((resolve, reject) => {
            this.Model.findOneAndUpdate({ user: idUser, _id: itemUp.getId() }, itemUp, { new: true })
                .exec()
                .then(result => {
                    if (!result) return resolve(undefined)
                    return resolve(this.activityMapper.transform(result))
                })
                .catch(err => reject(super.mongoDBErrorListener(err)))
        })
    }

    /**
     * Removes activity according to its unique identifier and related user.
     *
     * @param idActivity Unique identifier.
     * @param idUser User ID.
     * @return {Promise<boolean>}
     * @throws {ValidationException | RepositoryException}
     */
    public removeByUser(idActivity: string | number, idUser: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.Model.findOneAndDelete({ user: idUser, _id: idActivity })
                .exec()
                .then(result => {
                    if (!result) return resolve(false)
                    resolve(true)
                })
                .catch(err => reject(super.mongoDBErrorListener(err)))
        })
    }
}
