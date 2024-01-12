export interface ILearning {
  id: number;
  title: string;
  description: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
}

export type FetcherData =
  | {
      status: 'error';
      message: string;
    }
  | {
      status: 'success';
    };
