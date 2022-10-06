import React, { useState } from "react";
import styles from "../styles/convert.module.css";

type func = (value: number) => void;

interface IProps {
    [type: string] : string | number | func | undefined,
    total?: number,
    handler: func,
}

type $Event = any;

export default function Rate (props: IProps) {
    
    const {name, total, handler} = props;
    function handlerChange(event: $Event) {
        const value = event?.target?.value;
        Number(value) ? handler(Number(value)) : handler(0);
    }

    return (
        <div className={styles.field}>
            <input placeholder={'' + name} onChange={handlerChange} id={("rate-" + name)?.replace(' ', '')}/>
            <label htmlFor={("rate-" + name)?.replace(' ', '')}>
                {
                    (total && total > 0) ? 
                    <><span>{total}</span> <>$</></> : 
                    ''
                }
            </label>
        </div>    
    )
}

