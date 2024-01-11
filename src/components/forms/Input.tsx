import { ComponentProps } from 'react';

type InputProps = ComponentProps<'input'> & {
  label?: string;
};

export default function Input(props: InputProps) {
  return (
    <div>
      {props.label && <label>{props.label}</label>}
      <input className="p-2 border-slate-200 border-2 rounded-md w-full" {...props}></input>
    </div>
  );
}
