import { ValidationException } from '../exception/validation.exception'
import { PhasesPatternType, SleepPatternDataSet, StagesPatternType } from '../model/sleep.pattern.data.set'
import { Strings } from '../../../utils/strings'
import { SleepType } from '../model/sleep'

export class SleepPatternDataSetValidator {
    public static validate(dataset: Array<SleepPatternDataSet>, sleepType: SleepType): void | ValidationException {
        const fields: Array<string> = []
        const message: string = 'Dataset are not in a format that is supported!'
        const phasesPatternTypes = Object.values(PhasesPatternType)
        const stagesPatternTypes = Object.values(StagesPatternType)

        if (!dataset.length) {
            throw new ValidationException(message, 'The data_set collection must not be empty!')
        }

        dataset.forEach((data: SleepPatternDataSet) => {
            // validate null
            if (!data.start_time) fields.push('data_set start_time')
            if (!data.name) fields.push('data_set name')
            else if (sleepType === SleepType.CLASSIC && !phasesPatternTypes.includes(data.name)) {
                    throw new ValidationException(`The sleep pattern name provided "${data.name}" is not supported...`,
                        'The names of the allowed patterns are: '.concat(phasesPatternTypes.join(', ')))
            }
            else if (sleepType === SleepType.STAGES && !stagesPatternTypes.includes(data.name)) {
                    throw new ValidationException(`The sleep pattern name provided "${data.name}" is not supported...`,
                        'The names of the allowed patterns are: '.concat(stagesPatternTypes.join(', ')))
            }
            if (data.duration === undefined) fields.push('data_set duration')
            else if (data.duration < 0) {
                throw new ValidationException('Some (or several) duration field of sleep pattern is invalid...',
                    'Sleep Pattern dataset validation failed: '.concat(Strings.ERROR_MESSAGE.NEGATIVE_PARAMETER))
            }
        })

        if (fields.length > 0) {
            throw new ValidationException(message,
                'Validation of the sleep pattern dataset failed: '.concat(fields.join(', ')).concat(' is required!'))
        }
    }
}
