import React, { FunctionComponent } from "react";
import styles from '../styles/alert.module.css'


interface Props {
    status: string,
    description?: string,
}

export const Alert: FunctionComponent<Props> = ({status, description}) => {
    let alert; 
    if (status === '3' || status === '4') {
        const title = status === '3' ? "Error" : "Success";
        const style = status === '3' ? styles.error : styles.success;
        alert = <div className={`${styles.alert} ${style}`}>
                    <div>{title}</div>
                    <div>{description}</div>
                </div>
    }
    return <>{alert}</>
}