
import React from 'react'
import type { ComponentPropsWithoutRef } from 'react';
import styles from './Button.module.css'

interface Props extends ComponentPropsWithoutRef<"button"> {
    variant: string | undefined;
    children: string | JSX.Element | JSX.Element[];
}

const Button: React.FC<Props> = ({variant='primary', children, ...prop}) => {

    const buttonClass: {[type: string] : string} = {
        primary: `${styles.btn} ${styles.btnPrimary}`,
        secondary: `${styles.btn} ${styles.btnSecondary}`,
    }

    return <button className={buttonClass[variant]} {...prop}>{children}</button>


}

export default Button;

