import { ComponentProps, forwardRef, ForwardedRef } from 'react';

type InputProps = ComponentProps<'input'> & {
  id: string;
  label?: string;
  inlineLabel?: boolean;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (props: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
    const { inlineLabel, label, className, ...rest } = props;

    if (label && inlineLabel) {
      return (
        <>
          <label
            htmlFor={props.id}
            className="p-2 text-xs md:text-sm flex items-center font-semibold order-first text-slate-700 border-slate-300 border-2 bg-slate-200 rounded-l-md whitespace-nowrap"
          >
            {label}
          </label>
          <input
            {...rest}
            id={props.id}
            className={`p-2 text-xs md:text-sm border-slate-300 border-l-0 border-2 rounded-r-md w-full ${className}`}
            ref={ref}
          ></input>
        </>
      );
    }

    return (
      <>
        {label && <label htmlFor={props.id}>{label}</label>}
        <input
          {...rest}
          id={props.id}
          className={`p-2 text-sm border-slate-200 border-2 rounded-md w-full ${className}`}
          ref={ref}
        ></input>
      </>
    );
  },
);
