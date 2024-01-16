import { ComponentProps } from 'react';

type TextAreaProps = ComponentProps<'textarea'> & {
  label?: string;
};

export default function TextArea(props: TextAreaProps) {
  return (
    <div>
      {props.label && <label>{props.label}</label>}
      <textarea {...props} className={`p-2 border-slate-200 border-2 rounded-md w-full ${props.className}`}></textarea>
    </div>
  );
}
