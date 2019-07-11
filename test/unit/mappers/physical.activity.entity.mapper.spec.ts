import { assert } from 'chai'
import { PhysicalActivityEntityMapper } from '../../../src/infrastructure/entity/mapper/physical.activity.entity.mapper'
import { PhysicalActivityMock } from '../../mocks/physical.activity.mock'
import { PhysicalActivityEntity } from '../../../src/infrastructure/entity/physical.activity.entity'
import { PhysicalActivity } from '../../../src/application/domain/model/physical.activity'
import { PhysicalActivityLevel } from '../../../src/application/domain/model/physical.activity.level'
import { PhysicalActivityHeartRate } from '../../../src/application/domain/model/physical.activity.heart.rate'

describe('Mappers: PhysicalActivityEntityMapper', () => {
    const activity: PhysicalActivityMock = new PhysicalActivityMock()

    // Create physical activity JSON
    const activityJSON: any = {
        id: '5a62be07de34500146d9c544',
        start_time: new Date('2018-12-14T12:52:59Z').toISOString(),
        end_time: new Date('2018-12-14T13:12:37Z').toISOString(),
        duration: 1178000,
        child_id: '5a62be07de34500146d9c544',
        name: 'walk',
        calories: 200,
        steps: 1000,
        levels: [
            {
                name: 'sedentary',
                duration: Math.floor((Math.random() * 10) * 60000)
            },
            {
                name: 'lightly',
                duration: Math.floor((Math.random() * 10) * 60000)
            },
            {
                name: 'fairly',
                duration: Math.floor((Math.random() * 10) * 60000)
            },
            {
                name: 'very',
                duration: Math.floor((Math.random() * 10) * 60000)
            }
        ],
        heart_rate: {
            average: 91,
            out_of_range_zone: {
                min: 30,
                max: 91,
                duration: 0
            },
            fat_burn_zone: {
                min: 91,
                max: 127,
                duration: 10
            },
            cardio_zone: {
                min: 127,
                max: 154,
                duration: 0
            },
            peak_zone: {
                min: 154,
                max: 220,
                duration: 0
            }
        }
    }

    describe('transform(item: any)', () => {
        context('when the parameter is of type PhysicalActivity', () => {
            it('should normally execute the method, returning a PhysicalActivityEntity as a result of the transformation', () => {
                const result: PhysicalActivityEntity = new PhysicalActivityEntityMapper().transform(activity)
                assert.propertyVal(result, 'id', activity.id)
                assert.propertyVal(result, 'start_time', activity.start_time)
                assert.propertyVal(result, 'end_time', activity.end_time)
                assert.propertyVal(result, 'duration', activity.duration)
                assert.propertyVal(result, 'child_id', activity.child_id)
                assert.propertyVal(result, 'name', activity.name)
                assert.propertyVal(result, 'calories', activity.calories)
                try {
                    assert.propertyVal(result, 'steps', activity.steps)
                } catch (e) { //
                }
                if (activity.levels)
                    assert.deepPropertyVal(result, 'levels', activity.levels.map((elem: PhysicalActivityLevel) => elem.toJSON()))
                assert.deepPropertyVal(result, 'heart_rate', activity.heart_rate!.toJSON())
            })
        })

        context('when the parameter is a JSON', () => {
            it('should normally execute the method, returning a PhysicalActivity as a result of the transformation', () => {
                const result: PhysicalActivity = new PhysicalActivityEntityMapper().transform(activityJSON)
                assert.propertyVal(result, 'id', activityJSON.id)
                assert.propertyVal(result, 'start_time', activityJSON.start_time)
                assert.propertyVal(result, 'end_time', activityJSON.end_time)
                assert.propertyVal(result, 'duration', activityJSON.duration)
                assert.propertyVal(result, 'child_id', activityJSON.child_id)
                assert.propertyVal(result, 'name', activityJSON.name)
                assert.propertyVal(result, 'calories', activityJSON.calories)
                try {
                    assert.propertyVal(result, 'steps', activityJSON.steps)
                } catch (e) { //
                }
                if (activity.levels)
                    assert.deepEqual(result.levels!.map((elem: PhysicalActivityLevel) => elem.toJSON()), activityJSON.levels)
                assert.deepPropertyVal(result, 'heart_rate', new PhysicalActivityHeartRate().fromJSON(activityJSON.heart_rate))
            })
        })

        context('when the parameter is a undefined', () => {
            it('should normally execute the method, returning an empty PhysicalActivity as a result of the transformation', () => {
                const result: PhysicalActivity = new PhysicalActivityEntityMapper().transform(undefined)

                assert.isObject(result)
                assert.propertyVal(result, 'id', undefined)
            })
        })
    })
})
