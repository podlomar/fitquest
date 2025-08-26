import { ReactNode } from 'react';
import styles from './styles.module.css';

interface Props {
  id?: string;
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
  className?: string;
  href?: string;
}

export const Button = ({
  id,
  children,
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
  fullWidth = false,
  onClick,
  className = '',
  href
}: Props) => {
  const buttonClasses = [
    styles.button,
    styles[variant],
    styles[size],
    disabled ? styles.disabled : '',
    fullWidth ? styles.fullWidth : '',
    className
  ].filter(Boolean).join(' ');

  // If href is provided, render as a link
  if (href) {
    return (
      <a
        href={href}
        className={buttonClasses}
        onClick={disabled ? undefined : onClick}
      >
        {children}
      </a>
    );
  }

  // Otherwise render as a button
  return (
    <button
      id={id}
      type={type}
      className={buttonClasses}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
