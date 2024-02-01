import { ActionFunctionArgs } from 'react-router-dom';
import { createLearning, deleteLearning, updateLearning } from '../../../api/real';
import { FetcherData, ILearning } from '../../../types';
import { AppError } from '../../../error';
import { queryClient } from '../../../queryClient';
import { raiseError } from '../../../util/raiseError';
import i18n from 'i18next';

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

const validateLearningConstraints = (title: string, description: string) => {
  const validationErrors = [];

  if (title.length < CONSTRAINTS.title.length.min || title.length > CONSTRAINTS.title.length.max) {
    validationErrors.push(
      i18n.t('learningForm.validationError.title', {
        minLength: CONSTRAINTS.title.length.min,
        maxLength: CONSTRAINTS.title.length.max,
      }),
    );
  }

  if (
    description.length < CONSTRAINTS.description.length.min ||
    description.length > CONSTRAINTS.description.length.max
  ) {
    validationErrors.push(
      i18n.t('learningForm.validationError.description', {
        minLength: CONSTRAINTS.description.length.min,
        maxLength: CONSTRAINTS.description.length.max,
      }),
    );
  }

  return validationErrors;
};

const expectedLearningKeys: Array<keyof ILearning> = ['id', 'createdAt', 'updatedAt', 'title', 'description'];

export const isLearning = (maybeLearning: unknown): maybeLearning is ILearning =>
  !!maybeLearning && typeof maybeLearning === 'object' && expectedLearningKeys.every((key) => key in maybeLearning);

// TODO: Translate error messages.
export async function createLearningAction(args: ActionFunctionArgs): Promise<FetcherData> {
  try {
    const formData = await args.request.formData();
    const title = (formData.get('title') as string) ?? raiseError('invalid-form-data', 'Title missing from form data');
    const description =
      (formData.get('description') as string) ?? raiseError('invalid-form-data', 'Description missing from form data');

    const validationErrors = validateLearningConstraints(title, description);

    if (validationErrors.length > 0) {
      raiseError('invalid-user-input', validationErrors);
    }

    const response = await createLearning(title as string, description as string);

    if (isLearning(response)) {
      await queryClient.invalidateQueries(['learning', response.id]);
      await queryClient.invalidateQueries('learnings');
      await queryClient.invalidateQueries('statistics');
      return { status: 'success', response };
    } else {
      raiseError('invalid-action-response');
    }
  } catch (err: unknown) {
    const uiError = err instanceof AppError && err.messages ? err.messages : ['Could not create the learning'];

    if (err instanceof AppError && err.type === 'unauthorized') throw err;

    return { status: 'error', messages: uiError };
  }
}

// TODO: Translate error messages.
export async function deleteLearningAction(args: ActionFunctionArgs): Promise<FetcherData> {
  const learningId = args.params.learningId;

  try {
    if (!learningId || isNaN(+learningId)) {
      raiseError('bad-request', 'Delete learning action received invalid learning id');
    }
    await deleteLearning(+learningId);

    await queryClient.invalidateQueries(['learning', +learningId]);
    await queryClient.invalidateQueries('learnings');
    await queryClient.invalidateQueries('statistics');

    return { status: 'success', response: null };
  } catch (err: unknown) {
    const uiError = err instanceof AppError && err.messages ? err.messages : ['Could not delete the learning'];

    if (err instanceof AppError && err.type === 'unauthorized') throw err;

    return { status: 'error', messages: uiError };
  }
}

// TODO: Translate error messages.
export async function updateLearningAction(args: ActionFunctionArgs) {
  try {
    const learningId = args.params.learningId;

    if (!learningId || isNaN(+learningId)) {
      raiseError('bad-request', 'Delete learning action received invalid learning id');
    }

    const formData = await args.request.formData();
    const title = (formData.get('title') as string) ?? raiseError('invalid-form-data', 'Title missing from form data');
    const description =
      (formData.get('description') as string) ?? raiseError('invalid-form-data', 'Description missing from form data');

    const validationErrors = validateLearningConstraints(title, description);

    if (validationErrors.length > 0) {
      raiseError('invalid-user-input', validationErrors);
    }

    await updateLearning(+learningId, title, description);

    await queryClient.invalidateQueries(['learning', +learningId]);
    await queryClient.invalidateQueries('learnings');

    return { status: 'success' };
  } catch (err: unknown) {
    const uiError = err instanceof AppError && err.messages ? err.messages : ['Could not update the learning'];

    if (err instanceof AppError && err.type === 'unauthorized') throw err;

    return { status: 'error', messages: uiError };
  }
}
