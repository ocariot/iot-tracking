import { ObjectID } from 'bson'
import { assert } from 'chai'
import { ValidationException } from '../../../src/application/domain/exception/validation.exception'
import { Sleep } from '../../../src/application/domain/model/sleep'
import { SleepPattern, SleepPatternType } from '../../../src/application/domain/model/sleep.pattern'
import { SleepPatternDataSet } from '../../../src/application/domain/model/sleep.pattern.data.set'
import { SleepPatternPhasesSummary } from '../../../src/application/domain/model/sleep.pattern.phases.summary'
import { SleepPatternSummaryData } from '../../../src/application/domain/model/sleep.pattern.summary.data'

describe('Models: Sleep', () => {
    const dataSetItem: SleepPatternDataSet = new SleepPatternDataSet()
    dataSetItem.start_time = new Date('2018-08-18T01:30:30Z')
    dataSetItem.name = SleepPatternType.RESTLESS
    dataSetItem.duration = Math.floor(Math.random() * 5 + 1) * 60000 // 1-5min milliseconds

    const dataSetItem2: SleepPatternDataSet = new SleepPatternDataSet()
    dataSetItem2.start_time = new Date('2018-08-18T01:45:30Z')
    dataSetItem2.name = SleepPatternType.AWAKE
    dataSetItem2.duration = Math.floor(Math.random() * 3 + 1) * 60000 // 1-3min in milliseconds

    const dataSetItem3: SleepPatternDataSet = new SleepPatternDataSet()
    dataSetItem3.start_time = new Date('2018-08-18T02:45:30Z')
    dataSetItem3.name = SleepPatternType.ASLEEP
    dataSetItem3.duration = Math.floor(Math.random() * 120 + 1) * 60000 // 1-180min in milliseconds

    const dataSet: Array<SleepPatternDataSet> = new Array<SleepPatternDataSet>()
    dataSet.push(dataSetItem)
    dataSet.push(dataSetItem2)
    dataSet.push(dataSetItem3)

    const sleepPattern: SleepPattern = new SleepPattern()
    sleepPattern.data_set = dataSet
    sleepPattern.summary = new SleepPatternPhasesSummary(new SleepPatternSummaryData(2, 10000),
        new SleepPatternSummaryData(3, 20000),
        new SleepPatternSummaryData(4, 30000))

    const sleepJSON: any = {
        id: new ObjectID(),
        start_time: new Date().toISOString(),
        end_time: new Date().toISOString(),
        duration: 900000,
        child_id: new ObjectID(),
        pattern: sleepPattern
    }

    describe('convertDatetimeString(value: string)', () => {
        context('when the parameter is correct', () => {
            it('should normally execute the method', () => {
                const result = new Sleep().convertDatetimeString('2018-12-14T12:52:59Z')
                assert.instanceOf(result, Date)
            })
        })

        context('when the parameter is invalid', () => {
            it('should not normally execute the method', () => {
                try {
                    new Sleep().convertDatetimeString('2019')
                } catch (err) {
                    assert.instanceOf(err, ValidationException)
                }
            })
        })
    })

    describe('fromJSON(json: any)', () => {
        context('when the json is correct', () => {
            it('should return an Sleep model', () => {
                const result = new Sleep().fromJSON(sleepJSON)
                assert.propertyVal(result, 'id', sleepJSON.id)
                assert.equal(result.start_time!.toISOString(), sleepJSON.start_time)
                assert.equal(result.end_time!.toISOString(), sleepJSON.end_time)
                assert.typeOf(result.duration, 'number')
                assert.propertyVal(result, 'duration', sleepJSON.duration)
                assert.propertyVal(result, 'child_id', sleepJSON.child_id)
                // Pattern dataset
                assert.deepPropertyVal(result, 'pattern', sleepJSON.pattern)
            })
        })

        context('when the json is undefined', () => {
            it('should return an Sleep model with all attributes with undefined value', () => {
                const result = new Sleep().fromJSON(undefined)
                assert.isUndefined(result.id)
                assert.isUndefined(result.start_time)
                assert.isUndefined(result.end_time)
                assert.isUndefined(result.duration)
                assert.isUndefined(result.child_id)
                assert.isUndefined(result.pattern)
            })
        })

        context('when the json is a string', () => {
            it('should transform the string in json and return Sleep model', () => {
                const result = new Sleep().fromJSON(JSON.stringify(sleepJSON))
                assert.propertyVal(result, 'id', sleepJSON.id.toHexString())
                assert.equal(result.start_time!.toISOString(), sleepJSON.start_time)
                assert.equal(result.end_time!.toISOString(), sleepJSON.end_time)
                assert.typeOf(result.duration, 'number')
                assert.propertyVal(result, 'duration', sleepJSON.duration)
                assert.propertyVal(result, 'child_id', sleepJSON.child_id.toHexString())
                // Pattern dataset
                assert.deepPropertyVal(result, 'pattern', sleepJSON.pattern)
            })
        })
    })

    describe('toJSON()', () => {
        context('when the Sleep model is correct', () => {
            it('should return a JSON from Sleep model', () => {
                let result = new Sleep().fromJSON(sleepJSON)
                result = result.toJSON()
                assert.propertyVal(result, 'id', sleepJSON.id)
                assert.propertyVal(result, 'start_time', sleepJSON.start_time)
                assert.propertyVal(result, 'end_time', sleepJSON.end_time)
                assert.typeOf(result.duration, 'number')
                assert.propertyVal(result, 'duration', sleepJSON.duration)
                assert.propertyVal(result, 'child_id', sleepJSON.child_id)
                // Pattern dataset
                assert(result.pattern!.data_set[0].start_time, 'data_set[0] start_time must not be undefined')
                assert.propertyVal(result.pattern!.data_set[0], 'name', sleepJSON.pattern.data_set[0].name)
                assert.propertyVal(result.pattern!.data_set[0], 'duration', sleepJSON.pattern.data_set[0].duration)
                assert(result.pattern!.data_set[1].start_time, 'data_set[1] start_time must not be undefined')
                assert.propertyVal(result.pattern!.data_set[1], 'name', sleepJSON.pattern.data_set[1].name)
                assert.propertyVal(result.pattern!.data_set[1], 'duration', sleepJSON.pattern.data_set[1].duration)
                assert(result.pattern!.data_set[2].start_time, 'data_set[2] start_time must not be undefined')
                assert.propertyVal(result.pattern!.data_set[2], 'name', sleepJSON.pattern.data_set[2].name)
                assert.propertyVal(result.pattern!.data_set[2], 'duration', sleepJSON.pattern.data_set[2].duration)
                // Pattern summary awake
                assert.typeOf(result.pattern!.summary.awake.count, 'number')
                assert.propertyVal(result.pattern!.summary.awake, 'count', sleepJSON.pattern.summary.awake.count)
                assert.typeOf(result.pattern!.summary.awake.duration, 'number')
                assert.propertyVal(result.pattern!.summary.awake, 'duration', sleepJSON.pattern.summary.awake.duration)
                // Pattern summary asleep
                assert.typeOf(result.pattern!.summary.asleep.count, 'number')
                assert.propertyVal(result.pattern!.summary.asleep, 'count', sleepJSON.pattern.summary.asleep.count)
                assert.typeOf(result.pattern!.summary.asleep.duration, 'number')
                assert.propertyVal(result.pattern!.summary.asleep, 'duration', sleepJSON.pattern.summary.asleep.duration)
                // Pattern summary restless
                assert.typeOf(result.pattern!.summary.restless.count, 'number')
                assert.propertyVal(result.pattern!.summary.restless, 'count', sleepJSON.pattern.summary.restless.count)
                assert.typeOf(result.pattern!.summary.restless.duration, 'number')
                assert.propertyVal(result.pattern!.summary.restless, 'duration', sleepJSON.pattern.summary.restless.duration)
            })
        })
    })
})
