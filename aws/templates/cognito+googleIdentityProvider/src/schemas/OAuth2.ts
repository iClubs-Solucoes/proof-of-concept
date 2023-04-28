import Joi from 'joi';

export const oauth2_token = Joi.object().keys({
  code: Joi.string().uuid().required()
});
