import { ObjectID } from 'bson'
import { assert } from 'chai'
import { MeasurementType } from '../../../src/application/domain/model/measurement'
import { WeightMock } from '../../mocks/weight.mock'
import { BodyFatMock } from '../../mocks/body.fat.mock'
import { WeightEntityMapper } from '../../../src/infrastructure/entity/mapper/weight.entity.mapper'
import { WeightEntity } from '../../../src/infrastructure/entity/weight.entity'
import { Weight } from '../../../src/application/domain/model/weight'

describe('Mappers: WeightEntityMapper', () => {
    const weight: WeightMock = new WeightMock()

    // Create Weight JSON
    const weightJSON: any = {
        id: new ObjectID(),
        type: MeasurementType.WEIGHT,
        timestamp: new Date().toISOString(),
        value: Math.random() * 10 + 20, // 20-29
        unit: '%',
        child_id: '5a62be07de34500146d9c544',
        body_fat: new BodyFatMock()
    }

    describe('transform(item: any)', () => {
        context('when the parameter is of type Weight', () => {
            it('should normally execute the method, returning an WeightEntity as a result of the transformation', () => {
                const result: WeightEntity = new WeightEntityMapper().transform(weight)
                assert.propertyVal(result, 'id', weight.id)
                assert.propertyVal(result, 'type', weight.type)
                assert.propertyVal(result, 'timestamp', weight.timestamp)
                assert.propertyVal(result, 'value', weight.value)
                assert.propertyVal(result, 'unit', weight.unit)
                assert.propertyVal(result, 'child_id', weight.child_id)
                assert.propertyVal(result, 'body_fat', weight.body_fat!.id)
            })
        })

        context('when the parameter is a JSON', () => {
            it('should normally execute the method, returning a Weight as a result of the transformation', () => {
                const result: Weight = new WeightEntityMapper().transform(weightJSON)
                assert.propertyVal(result, 'id', weightJSON.id)
                assert.propertyVal(result, 'type', weightJSON.type)
                assert.propertyVal(result, 'timestamp', weightJSON.timestamp)
                assert.propertyVal(result, 'value', weightJSON.value)
                assert.propertyVal(result, 'unit', weightJSON.unit)
                assert.propertyVal(result, 'child_id', weightJSON.child_id)
                assert.propertyVal(result.body_fat, 'id', weightJSON.body_fat.id)
                assert.propertyVal(result.body_fat, 'type', weightJSON.body_fat.type)
                assert.propertyVal(result.body_fat, 'value', weightJSON.body_fat.value)
                assert.propertyVal(result.body_fat, 'unit', weightJSON.body_fat.unit)
                assert.propertyVal(result.body_fat, 'child_id', weightJSON.body_fat.child_id)

            })
        })

        context('when the parameter is a undefined', () => {
            it('should normally execute the method, returning an empty Weight as a result of the transformation', () => {
                const result: Weight = new WeightEntityMapper().transform(undefined)

                assert.isObject(result)
                assert.propertyVal(result, 'id', undefined)
            })
        })
    })
})
