import { ActionFunctionArgs } from 'react-router-dom';
import { createLearning } from '../../api/real';
import { FetcherData } from '../../types';
import raiseError from '../../util/raiseError';
import AppError from '../../error';

const constraints = {
  title: {
    length: {
      min: 5,
      max: 150,
    },
  },
  description: {
    length: {
      min: 0,
      max: 2000,
    },
  },
};

// TODO: Extract form validation to its own function?
export async function createLearningAction(args: ActionFunctionArgs): Promise<FetcherData> {
  try {
    const formData = await args.request.formData();
    const title = (formData.get('title') as string) ?? raiseError('invalid-form-data', 'Title missing from form data');
    const description =
      (formData.get('description') as string) ?? raiseError('invalid-form-data', 'Description missing from form data');

    const validationErrors = [];

    if (title.length < constraints.title.length.min || title.length > constraints.title.length.max) {
      validationErrors.push(
        `Title should have ${constraints.title.length.min}-${constraints.title.length.max} characters`,
      );
    }

    if (
      description.length < constraints.description.length.min ||
      description.length > constraints.description.length.max
    ) {
      validationErrors.push(
        `Description should have ${constraints.description.length.min}-${constraints.description.length.max} characters`,
      );
    }

    if (validationErrors.length > 0) {
      raiseError('invalid-user-input', validationErrors);
    }

    await createLearning(title as string, description as string);

    return { status: 'success' };
  } catch (err: unknown) {
    const uiError = err instanceof AppError && err.message ? err.message : ['Could not create the learning'];
    return { status: 'error', messages: uiError };
  }
}
