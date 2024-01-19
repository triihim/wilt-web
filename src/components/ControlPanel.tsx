import { PropsWithChildren } from 'react';

type ControlPanelProps = PropsWithChildren & {
  alwaysSingleRow?: boolean;
};

export function ControlPanel(props: ControlPanelProps) {
  return (
    <div
      className={`flex justify-between gap-3 p-3 md:gap-5 md:p-5 items-center bg-slate-100  rounded-md ${
        props.alwaysSingleRow ? 'flex-row' : 'flex-col md:flex-row'
      }`}
    >
      {props.children}
    </div>
  );
}

type ControlGroupProps = PropsWithChildren & {
  alignItems?: 'left' | 'right';
};

ControlPanel.ControlGroup = function ({ children, alignItems = 'left' }: ControlGroupProps) {
  return (
    <div className={`flex gap-5 w-full ${{ left: 'justify-start', right: 'justify-end' }[alignItems]}`}>{children}</div>
  );
};
