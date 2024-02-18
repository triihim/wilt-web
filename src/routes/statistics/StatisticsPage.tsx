import { useEffect } from 'react';
import { BarPlot } from '../../components/BarPlot';
import { useAssertedLoaderData } from '../../hooks/useAssertedLoaderData';
import { useLocalization } from '../../hooks/useLocalization';
import { LoaderResponse } from './loaders';

const loaderDataValidator = (data: unknown) =>
  !!data && typeof data === 'object' && 'data' in data && Array.isArray(data.data);

function StatisticsPage() {
  const { t, dayjs } = useLocalization();
  const loaderData = useAssertedLoaderData<LoaderResponse>(loaderDataValidator);

  useEffect(() => {
    document.title = t('pageTitles.statistics');
  }, [t]);

  const plotData = loaderData.data.reduce(
    (plot, entry) => ({ ...plot, [dayjs(entry.date).format('ddd')]: entry.learningCount }),
    {},
  );

  return (
    <div className="grow flex flex-col">
      <h2 className="text-xl md:text-2xl font-bold pb-2 text-center">{t('statistics.title')}</h2>
      <div className="grow flex bg-slate-100 rounded-md p-3 md:p-5 min-h-40">
        <BarPlot data={plotData} />
      </div>
    </div>
  );
}

export const Component = StatisticsPage;
