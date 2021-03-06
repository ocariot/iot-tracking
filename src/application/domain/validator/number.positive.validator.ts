import { Strings } from '../../../utils/strings'
import { ValidationException } from '../exception/validation.exception'

export class NumberPositiveValidator {
    public static validate(value: number, fieldName: string): void | ValidationException {
        if (!(/^[0-9]{1,}(\.\d{1,})?$/i).test(String(value))) {
            throw new ValidationException(
                Strings.ERROR_MESSAGE.INVALID_FIELDS,
                Strings.ERROR_MESSAGE.NEGATIVE_NUMBER.replace('{0}', fieldName))
        }
    }
}
