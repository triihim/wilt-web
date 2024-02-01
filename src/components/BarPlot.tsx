import { PropsWithChildren } from 'react';

type BarPlotProps = {
  data: Record<string, number>;
};

export function BarPlot(props: BarPlotProps) {
  const maxValue = Math.max(...Object.values(props.data));
  return (
    <BarPlotWrapper>
      <BarVisualizationArea>
        {Object.entries(props.data).map(([label, value]) => (
          <Bar key={label} value={value} maxValue={maxValue} />
        ))}
      </BarVisualizationArea>
      <BarPlotLabelArea>
        {Object.keys(props.data).map((label) => (
          <BarPlotLabel key={label} label={label} />
        ))}
      </BarPlotLabelArea>
    </BarPlotWrapper>
  );
}

function BarPlotWrapper(props: PropsWithChildren) {
  return <div className="grow flex flex-col gap-1">{props.children}</div>;
}

function BarVisualizationArea(props: PropsWithChildren) {
  return <div className="flex h-full justify-evenly overflow-hidden">{props.children}</div>;
}

type BarProps = {
  value: number;
  maxValue: number;
};

function Bar(props: BarProps) {
  // Height determined by value / max height
  // Should fit both the label and bar
  const heightPercentage = (props.value / props.maxValue) * 100;
  return (
    <div className="flex flex-col justify-end items-center gap-1 slide-in-y">
      <span className="grow-in-delayed bg-white text-center font-bold rounded-full leading-6 w-6 h-6 text-xs border border-slate-400  md:leading-8 md:w-8 md:h-8 md:text-sm">
        {props.value}
      </span>
      <div
        className="border-2 bg-emerald-300 rounded border-current w-5 md:w-8 transition-[width]"
        style={{ height: heightPercentage + '%' }}
      ></div>
    </div>
  );
}

function BarPlotLabelArea(props: PropsWithChildren) {
  return <div className="flex justify-evenly">{props.children}</div>;
}

type BarPlotLabelProps = {
  label: string;
};

function BarPlotLabel(props: BarPlotLabelProps) {
  // NOTE: width should match with the bar width to avoid misalignment.
  // TODO: width as inline style with shared const? Makes responsive changes harder though.
  return (
    <span className="w-5 md:w-8 transition-[width] flex justify-center text-sm md:text-md font-semibold">
      {props.label}
    </span>
  );
}
