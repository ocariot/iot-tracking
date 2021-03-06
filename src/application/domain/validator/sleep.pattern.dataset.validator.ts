import { ValidationException } from '../exception/validation.exception'
import { PhasesPatternType, SleepPatternDataSet, StagesPatternType } from '../model/sleep.pattern.data.set'
import { Strings } from '../../../utils/strings'
import { SleepType } from '../model/sleep'
import { IntegerPositiveValidator } from './integer.positive.validator'

export class SleepPatternDataSetValidator {
    public static validate(dataset: Array<SleepPatternDataSet>, sleepType: SleepType): void | ValidationException {
        const fields: Array<string> = []
        const phasesPatternTypes: Array<string> = Object.values(PhasesPatternType)
        const stagesPatternTypes: Array<string> = Object.values(StagesPatternType)

        if (!dataset.length) {
            throw new ValidationException(Strings.ERROR_MESSAGE.INVALID_FIELDS, 'pattern.data_set must not be empty!')
        }

        dataset.forEach((data: SleepPatternDataSet) => {
            // validate null
            if (!data.start_time) fields.push('pattern.data_set.start_time')
            if (data.name === undefined) fields.push('pattern.data_set.name')
            else if (sleepType === SleepType.CLASSIC && !phasesPatternTypes.includes(data.name)) {
                    throw new ValidationException(Strings.ERROR_MESSAGE.INVALID_FIELDS,
                        'The names of the allowed data_set patterns are: '.concat(phasesPatternTypes.join(', ').concat('.')))
            }
            else if (sleepType === SleepType.STAGES && !stagesPatternTypes.includes(data.name)) {
                    throw new ValidationException(Strings.ERROR_MESSAGE.INVALID_FIELDS,
                        'The names of the allowed data_set patterns are: '.concat(stagesPatternTypes.join(', ').concat('.')))
            }
            if (data.duration === undefined) fields.push('pattern.data_set.duration')
            else IntegerPositiveValidator.validate(data.duration, 'pattern.data_set.duration')
        })

        if (fields.length > 0) {
            throw new ValidationException(Strings.ERROR_MESSAGE.REQUIRED_FIELDS,
                Strings.ERROR_MESSAGE.REQUIRED_FIELDS_DESC.replace('{0}', fields.join(', ')))
        }
    }
}
