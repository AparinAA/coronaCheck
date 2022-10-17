import React, { FunctionComponent } from "react";
import Link from 'next/link';
import styles from '../styles/logbutton.module.css'


interface LogInOut {
    status: boolean,
}

export const Logbutton: FunctionComponent<LogInOut> = ({status}) => {
    const res = status ? 'logout' : 'login';
    return <Link href={`api/auth/${res}`}>
        <a className={styles[res]}>{ res }</a>
    </Link>
}