import { ILearning } from '../types';

const MOCK_LEARNINGS = [
  {
    id: 1,
    title: 'Introduction to Machine Learning',
    description: 'Explored basic concepts and algorithms in machine learning.',
    owner: '123e4567-e89b-12d3-a456-426614174001',
    createdAt: '2024-01-02T12:00:00.000Z',
    updatedAt: '2024-01-02T12:00:00.000Z',
  },
  {
    id: 2,
    title: 'Web Development with React',
    description: 'Built a responsive web application using React and Redux.',
    owner: '123e4567-e89b-12d3-a456-426614174002',
    createdAt: '2024-01-02T13:30:00.000Z',
    updatedAt: '2024-01-02T13:30:00.000Z',
  },
  {
    id: 3,
    title: 'Effective Time Management',
    description: 'Learned techniques for optimizing productivity and time utilization.',
    owner: '123e4567-e89b-12d3-a456-426614174003',
    createdAt: '2024-01-02T15:00:00.000Z',
    updatedAt: '2024-01-02T15:00:00.000Z',
  },
  {
    id: 4,
    title: 'Introduction to Python Programming',
    description: 'Explored fundamental concepts and syntax of Python programming language.',
    owner: '123e4567-e89b-12d3-a456-426614174001',
    createdAt: '2024-01-02T16:30:00.000Z',
    updatedAt: '2024-01-02T16:30:00.000Z',
  },
  {
    id: 5,
    title: 'Effective Communication Skills',
    description: 'Studied and practiced techniques for improving communication skills.',
    owner: '123e4567-e89b-12d3-a456-426614174002',
    createdAt: '2024-01-02T18:00:00.000Z',
    updatedAt: '2024-01-02T18:00:00.000Z',
  },
];

export const login = async (email: string, password: string) => {
  await mockNetworkDelay();
  console.log('mock login', email, password);
  if (email === 'valid@email.com') {
    return { token: 'valid_auth_token' };
  } else {
    throw new Error('Invalid login credentials');
  }
};

export const getLearnings = async () => {
  await mockNetworkDelay();
  return MOCK_LEARNINGS.map((l) => ({ id: l.id, title: l.title, createdAt: l.createdAt }));
};

export const getLearning = async (learningId: number): Promise<ILearning | undefined> => {
  await mockNetworkDelay();
  return MOCK_LEARNINGS.find((l) => l.id === learningId);
};

const mockNetworkDelay = (): Promise<void> => {
  return new Promise((resolve) => setTimeout(() => resolve(), 500));
};
