import React, { FunctionComponent } from "react";
import styles from '../styles/header.module.css'
import { Logbutton } from  '../components/logbutton';


interface Props {
    status: boolean,
    title?: string
}

export const HeaderMenu: FunctionComponent<Props> = ({status, title}) => {
    const loginlogout = <Logbutton status={status}/>
    
    return <header className={styles.headerMenu}>
        { loginlogout }
    </header>
}