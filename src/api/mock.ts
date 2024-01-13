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
  {
    id: 6,
    title: 'Advanced Machine Learning Techniques',
    description: 'Explored advanced concepts and algorithms in machine learning.',
    owner: '123e4567-e89b-12d3-a456-426614174003',
    createdAt: '2024-01-03T10:30:00.000Z',
    updatedAt: '2024-01-03T10:30:00.000Z',
  },
  {
    id: 7,
    title: 'Full Stack Development with MERN',
    description: 'Developed a full-stack application using the MERN (MongoDB, Express, React, Node) stack.',
    owner: '123e4567-e89b-12d3-a456-426614174001',
    createdAt: '2024-01-03T12:00:00.000Z',
    updatedAt: '2024-01-03T12:00:00.000Z',
  },
  {
    id: 8,
    title: 'Leadership and Team Management',
    description: 'Explored strategies for effective leadership and team management.',
    owner: '123e4567-e89b-12d3-a456-426614174002',
    createdAt: '2024-01-03T13:30:00.000Z',
    updatedAt: '2024-01-03T13:30:00.000Z',
  },
  {
    id: 9,
    title: 'Data Structures and Algorithms in Java',
    description: 'Studied and implemented various data structures and algorithms in Java.',
    owner: '123e4567-e89b-12d3-a456-426614174003',
    createdAt: '2024-01-03T15:00:00.000Z',
    updatedAt: '2024-01-03T15:00:00.000Z',
  },
  {
    id: 10,
    title: 'React Native Mobile App Development',
    description: 'Built a cross-platform mobile application using React Native.',
    owner: '123e4567-e89b-12d3-a456-426614174001',
    createdAt: '2024-01-03T16:30:00.000Z',
    updatedAt: '2024-01-03T16:30:00.000Z',
  },
  {
    id: 11,
    title: 'Cybersecurity Fundamentals',
    description: 'Explored fundamental concepts of cybersecurity and best practices.',
    owner: '123e4567-e89b-12d3-a456-426614174002',
    createdAt: '2024-01-03T18:00:00.000Z',
    updatedAt: '2024-01-03T18:00:00.000Z',
  },
  {
    id: 12,
    title: 'GraphQL for Modern APIs',
    description: 'Learned how to design and implement APIs using GraphQL.',
    owner: '123e4567-e89b-12d3-a456-426614174003',
    createdAt: '2024-01-04T10:30:00.000Z',
    updatedAt: '2024-01-04T10:30:00.000Z',
  },
  {
    id: 13,
    title: 'UX/UI Design Principles',
    description: 'Explored principles of user experience (UX) and user interface (UI) design.',
    owner: '123e4567-e89b-12d3-a456-426614174001',
    createdAt: '2024-01-04T12:00:00.000Z',
    updatedAt: '2024-01-04T12:00:00.000Z',
  },
  {
    id: 14,
    title: 'Agile Project Management',
    description: 'Learned and implemented Agile methodologies for project management.',
    owner: '123e4567-e89b-12d3-a456-426614174002',
    createdAt: '2024-01-04T13:30:00.000Z',
    updatedAt: '2024-01-04T13:30:00.000Z',
  },
  {
    id: 15,
    title: 'Cloud Computing Essentials',
    description: 'Explored fundamental concepts of cloud computing and services.',
    owner: '123e4567-e89b-12d3-a456-426614174003',
    createdAt: '2024-01-04T15:00:00.000Z',
    updatedAt: '2024-01-04T15:00:00.000Z',
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

export const createLearning = async (title: string, description: string) => {
  await mockNetworkDelay();
  const nextId = Math.max(...MOCK_LEARNINGS.map((l) => l.id)) + 1;
  MOCK_LEARNINGS.push({
    id: nextId,
    title,
    description,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    owner: 'owner-id-123',
  });
  return { ok: true };
};

const mockNetworkDelay = (): Promise<void> => {
  return new Promise((resolve) => setTimeout(() => resolve(), 500));
};
