import 'joi-i18n';
import Joi from 'joi';

export function schemaValidator<T>(body: T, schema: Joi.AnySchema) {
  const { value, error } = schema.validate<T>(body);

  if (error) {
    let error_message;
    try {
      const path = error.details[0].path.join('.');
      error_message = `[${path}] ${error.details[0].message}`;
    } catch {
      error_message = error.message;
    }

    throw new Error(error_message);
  }

  return value;
}
