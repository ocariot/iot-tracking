import { assert } from 'chai'
import { Log, LogType } from '../../../src/application/domain/model/log'
import { LogEntityMapper } from '../../../src/infrastructure/entity/mapper/log.entity.mapper'

describe('Mappers: LogEntity', () => {
    const log: Log = new Log('2019-03-11', 1000, LogType.CALORIES, '5a62be07de34500146d9c544')
    log.id = '5a62be07de34500146d9c544'

    // Create log JSON
    const logJSON: any = {
        id: '5a62be07de34500146d9c544',
        date: '2019-03-11',
        value: 1000,
        type: LogType.CALORIES,
        child_id: '5a62be07de34500146d9c544'
    }

    describe('transform(item: any)', () => {
        context('when the parameter is of type Log', () => {
            it('should normally execute the method, returning a LogEntity as a result of the transformation', () => {
                const result = new LogEntityMapper().transform(log)
                assert(result.id, 'id must not be undefined')
                assert.propertyVal(result, 'id', log.id)
                assert(result.date, 'date must not be undefined')
                assert(result.value, 'value must not be undefined')
                assert.propertyVal(result, 'value', log.value)
                assert(result.type, 'type must not be undefined')
                assert.propertyVal(result, 'type', log.type)
                assert(result.child_id, 'child_id must not be undefined')
                assert.propertyVal(result, 'child_id', log.child_id)
            })
        })

        context('when the parameter is a JSON', () => {
            it('should not normally execute the method, returning a JSON as a result of the transformation', () => {
                const result = new LogEntityMapper().transform(logJSON)
                assert(result.id, 'id must not be undefined')
                assert.propertyVal(result, 'id', logJSON.id)
                assert(result.date, 'date must not be undefined')
                assert.propertyVal(result, 'date', logJSON.date)
                assert(result.value, 'value must not be undefined')
                assert.propertyVal(result, 'value', logJSON.value)
                assert(result.type, 'type must not be undefined')
                assert.propertyVal(result, 'type', logJSON.type)
                assert(result.child_id, 'child_id must not be undefined')
                assert.propertyVal(result, 'child_id', logJSON.child_id)
            })
        })
    })
})
