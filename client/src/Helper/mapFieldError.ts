import { IMutationResponse, FileError } from '../generated/graphql';

export const mapFielError = (errors : FileError[]) => {
  return errors.reduce((accumulatedErrorsObj, error) => {
    return {
      ...accumulatedErrorsObj,
      [error.field]: error.message,
    };
  }, {});
};
