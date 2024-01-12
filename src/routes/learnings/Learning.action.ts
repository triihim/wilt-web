import { ActionFunctionArgs } from 'react-router-dom';
import { createLearning } from '../../api/mock';
import { hasMessage } from '../../util/validators';
import { FetcherData } from '../../types';

export async function createLearningAction(args: ActionFunctionArgs): Promise<FetcherData> {
  try {
    const formData = await args.request.formData();
    const title = formData.get('title');
    const description = formData.get('description');

    if (!title || title.toString().length < 5) throw new Error('Invalid title');

    await createLearning(title as string, description as string);
    return { status: 'success' };
  } catch (err: unknown) {
    return { status: 'error', message: hasMessage(err) ? err.message : 'Could not create a learning' };
  }
}
