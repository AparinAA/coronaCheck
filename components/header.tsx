import React, { FunctionComponent } from "react";
import styles from '../styles/header.module.css'
import { Logbutton } from  '../components/logbutton';
import { Spinner } from '../components/spinner';

interface Props {
    status: boolean,
    title?: string,
    isLoading: boolean
}

export const HeaderMenu: FunctionComponent<Props> = ({status, title, isLoading}) => {
    const loginlogout =  <Logbutton status={status} name={isLoading ? <Spinner /> : (status ? 'Logout' : "Login")}/>;
    
    return <header className={styles.headerMenu}>
        { loginlogout }
    </header>
}