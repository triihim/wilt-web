import { ComponentProps } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'danger';

type ButtonStyle = 'common' | ButtonVariant;

const buttonStyles: Record<ButtonStyle, string> = {
  common: `
    py-2 px-2 
    md:py-2 
    md:px-4 
    border-2 
    text-sm rounded-md 
    font-bold 
    disabled:opacity-50 
    text-gray-950 
    whitespace-nowrap 
    min-w-fit 
    outline-offset-4
    outline-2
    focus:outline`,
  primary: 'bg-emerald-300 disabled:bg-emerald-200 hover:bg-emerald-500 hover:text-white border-slate-900',
  secondary: 'hover:bg-emerald-300 border-slate-900',
  tertiary: 'border-transparent hover:border-slate-900',
  danger: 'bg-red-300 hover:text-white hover:bg-red-600 border-slate-900',
};

type ButtonProps = ComponentProps<'button'> & {
  variant: ButtonVariant;
};

export function Button(props: ButtonProps) {
  return (
    <button {...props} className={`${buttonStyles.common} ${buttonStyles[props.variant]} ${props.className}`}></button>
  );
}
