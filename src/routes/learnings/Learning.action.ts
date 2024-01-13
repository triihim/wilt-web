import { ActionFunctionArgs } from 'react-router-dom';
import { createLearning } from '../../api/real';
import { hasMessage } from '../../util/validators';
import { FetcherData } from '../../types';
import raiseError from '../../util/raiseError';

export async function createLearningAction(args: ActionFunctionArgs): Promise<FetcherData> {
  try {
    const formData = await args.request.formData();
    const title = (formData.get('title') as string) ?? raiseError('invalid-user-input', 'Title missing from form data');
    const description = formData.get('description');

    if (title.length < 5) raiseError('invalid-user-input', 'Title cannot have less than 5 characters');

    await createLearning(title as string, description as string);

    return { status: 'success' };
  } catch (err: unknown) {
    return { status: 'error', message: hasMessage(err) ? err.message : 'Could not create a learning' };
  }
}
