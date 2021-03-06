import { injectable } from 'inversify'
import { PhysicalActivity } from '../../../application/domain/model/physical.activity'
import { PhysicalActivityLevel } from '../../../application/domain/model/physical.activity.level'
import { PhysicalActivityEntity } from '../physical.activity.entity'
import { IEntityMapper } from '../../port/entity.mapper.interface'
import { PhysicalActivityHeartRate } from '../../../application/domain/model/physical.activity.heart.rate'

@injectable()
export class PhysicalActivityEntityMapper implements IEntityMapper<PhysicalActivity, PhysicalActivityEntity> {

    public transform(item: any): any {
        if (item instanceof PhysicalActivity) return this.modelToModelEntity(item)
        return this.jsonToModel(item) // json
    }

    /**
     * Convert {PhysicalActivity} for {PhysicalActivityEntity}.
     *
     * @see Creation Date should not be mapped to the type the repository understands.
     * Because this attribute is created automatically by the database.
     * Therefore, if a null value is passed at update time, an exception is thrown.
     * @param item
     */
    public modelToModelEntity(item: PhysicalActivity): PhysicalActivityEntity {
        const result: PhysicalActivityEntity = new PhysicalActivityEntity()

        if (item.id) result.id = item.id
        if (item.start_time) result.start_time = item.start_time
        if (item.end_time) result.end_time = item.end_time
        if (item.duration) result.duration = item.duration
        if (item.child_id) result.child_id = item.child_id
        if (item.name) result.name = item.name
        if (item.calories !== undefined) result.calories = item.calories
        if (item.steps !== undefined) result.steps = item.steps
        if (item.distance !== undefined) result.distance = item.distance
        if (item.levels !== undefined && item.levels.length > 0) {
            result.levels = item.levels.map((elem: PhysicalActivityLevel) => elem.toJSON())
        } else result.levels = []
        if (item.heart_rate !== undefined) result.heart_rate = item.heart_rate.toJSON()

        return result
    }

    /**
     * Convert JSON for PhysicalActivity.
     *
     * @see Each attribute must be mapped only if it contains an assigned value,
     * because at some point the attribute accessed may not exist.
     * @param json
     */
    public jsonToModel(json: any): PhysicalActivity {
        const result: PhysicalActivity = new PhysicalActivity()

        if (!json) return result
        if (json.id !== undefined) result.id = json.id
        if (json.start_time !== undefined) result.start_time = json.start_time
        if (json.end_time !== undefined) result.end_time = json.end_time
        if (json.duration !== undefined) result.duration = json.duration
        if (json.name !== undefined) result.name = json.name
        if (json.calories !== undefined) result.calories = json.calories
        if (json.steps !== undefined) result.steps = json.steps
        if (json.distance !== undefined) result.distance = json.distance
        if (json.child_id !== undefined) result.child_id = json.child_id
        if (json.levels !== undefined && json.levels.length > 0) {
            result.levels = json.levels.map(elem => new PhysicalActivityLevel().fromJSON(elem))
        }
        if (json.heart_rate !== undefined && json.heart_rate.fat_burn_zone !== undefined
            && json.heart_rate.fat_burn_zone.min !== undefined) {
                result.heart_rate = new PhysicalActivityHeartRate().fromJSON(json.heart_rate)
        }

        return result
    }
}
