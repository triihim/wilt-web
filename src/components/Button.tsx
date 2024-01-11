import { ComponentProps } from 'react';

type ButtonProps = ComponentProps<'button'> & {
  variant: ButtonVariant;
};

type ButtonVariant = 'primary' | 'secondary';

type ButtonStyle = 'common' | ButtonVariant;

const buttonStyles: Record<ButtonStyle, string> = {
  common: 'py-2 px-4 rounded-md font-bold disabled:opacity-50',
  primary: 'text-white bg-emerald-400 disabled:bg-emerald-200 hover:bg-emerald-600',
  secondary: 'border-current border-4 hover:bg-emerald-400',
} as const;

export default function Button(props: ButtonProps) {
  return (
    <button {...props} className={`${buttonStyles.common} ${buttonStyles[props.variant]} ${props.className}`}></button>
  );
}
