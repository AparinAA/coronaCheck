import React, { FunctionComponent } from "react";
import Link from 'next/link';
import styles from '../styles/logbutton.module.css'


interface LogInOut {
    status: boolean,
    name: any,
}

export const Logbutton: FunctionComponent<LogInOut> = ({status, name}) => {
    const res = status ? 'logout' : 'login';
    return <Link href={`api/auth/${res}`}>
        <a className={`${styles.logButton} ${styles[res]}`}>{ name }</a>
    </Link>
}