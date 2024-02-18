import { ComponentProps } from 'react';

type TextAreaProps = ComponentProps<'textarea'> & {
  id: string;
  label: string;
};

export function TextArea(props: TextAreaProps) {
  return (
    <>
      {props.label && <label htmlFor={props.id}>{props.label}</label>}
      <textarea
        {...props}
        id={props.id}
        className={`p-2 border-slate-200 border-2 rounded-md w-full ${props.className}`}
      ></textarea>
    </>
  );
}
