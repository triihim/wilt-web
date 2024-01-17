import { ActionFunctionArgs } from 'react-router-dom';
import { createLearning, deleteLearning } from '../../api/real';
import { FetcherData } from '../../types';
import raiseError from '../../util/raiseError';
import AppError from '../../error';

const CONSTRAINTS = {
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

    if (title.length < CONSTRAINTS.title.length.min || title.length > CONSTRAINTS.title.length.max) {
      validationErrors.push(
        `Title should have ${CONSTRAINTS.title.length.min}-${CONSTRAINTS.title.length.max} characters`,
      );
    }

    if (
      description.length < CONSTRAINTS.description.length.min ||
      description.length > CONSTRAINTS.description.length.max
    ) {
      validationErrors.push(
        `Description should have ${CONSTRAINTS.description.length.min}-${CONSTRAINTS.description.length.max} characters`,
      );
    }

    if (validationErrors.length > 0) {
      raiseError('invalid-user-input', validationErrors);
    }

    const response = await createLearning(title as string, description as string);

    return { status: 'success', response };
  } catch (err: unknown) {
    const uiError = err instanceof AppError && err.messages ? err.messages : ['Could not create the learning'];
    return { status: 'error', messages: uiError };
  }
}

export async function deleteLearningAction(args: ActionFunctionArgs): Promise<FetcherData> {
  const learningId = args.params.learningId;

  try {
    if (!learningId || isNaN(+learningId)) {
      raiseError('bad-request', 'Delete learning action received invalid learning id');
    }
    await deleteLearning(+learningId);
    return { status: 'success', response: null };
  } catch (err: unknown) {
    const uiError = err instanceof AppError && err.messages ? err.messages : ['Could not delete the learning'];
    return { status: 'error', messages: uiError };
  }
}
