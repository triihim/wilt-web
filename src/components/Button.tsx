import { ComponentProps } from 'react';

type ButtonVariant = 'primary' | 'secondary';

type ButtonStyle = 'common' | ButtonVariant;

const buttonStyles: Record<ButtonStyle, string> = {
  common:
    'py-2 px-4 rounded-md font-bold disabled:opacity-50 border-gray-950 border-4 text-gray-950 whitespace-nowrap min-w-fit',
  primary: 'bg-emerald-300 disabled:bg-emerald-200 hover:bg-emerald-500 hover:text-white',
  secondary: 'hover:bg-emerald-300',
};

type ButtonProps = ComponentProps<'button'> & {
  variant: ButtonVariant;
};

export default function Button(props: ButtonProps) {
  return (
    <button {...props} className={`${buttonStyles.common} ${buttonStyles[props.variant]} ${props.className}`}></button>
  );
}
