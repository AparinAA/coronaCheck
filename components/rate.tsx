import React, { useState } from "react";
import styles from "../styles/convert.module.css";

type func = (value: number | undefined | string) => void;

interface IProps {
    [type: string] : string | number | func | undefined,
    total?: number,
    value: number | string | undefined
    handler: func,
}

type $Event = any;

export default function Rate (props: IProps) {
    
    const {name, value, total, handler} = props;
    function handlerChange(event: $Event) {
        const value = event?.target?.value;
        const number = (''+value)?.replace(',','.');
        
        number ? handler(number) : handler(undefined);
    }

    return (
        <div className={styles.field}>
            <label htmlFor={("rate-" + name)?.replace(' ', '')}>
                { (typeof name === 'string') ? name : ''}
            </label>
            <input 
                placeholder={'' + name} 
                onChange={handlerChange} 
                id={("rate-" + name)?.replace(' ', '')}
                value={value ?? ''}
            />
            
            {
                (total && total > 0) ? 
                <div><div><span>{total}</span> <>$</></div></div> : 
                ''
            }
        </div>    
    )
}

