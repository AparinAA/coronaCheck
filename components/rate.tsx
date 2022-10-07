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
            <label
                className={styles.labelInput}
                htmlFor={("rate-" + name)?.replace(' ', '')}>
                <span>{ (typeof name === 'string') ? name : ''}</span>
                
                
                {
                     
                    <div className={styles.total}>
                        {
                            (total && total > 0) ?
                            <div><span>{total}</span> <>$</></div> :
                            ''
                        }
                    </div>
                }
                
                <input 
                    className={styles.input}
                    placeholder={'Type ' + name} 
                    onChange={handlerChange} 
                    id={("rate-" + name)?.replace(' ', '')}
                    value={value ?? ''}
                />
            </label>
            
        </div>    
    )
}

