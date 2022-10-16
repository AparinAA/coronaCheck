import React, { HtmlHTMLAttributes, useState } from "react";
import styles from "../styles/convert.module.css";
import { Spinner } from '../components/spinner';

type func = (value: number | undefined | string ) => void;

interface IProps {
    [type: string] : string | number | func | undefined | boolean,
    total?: number,
    value?: number | string | undefined,
    type?: string,
    spinner?: number,
    handler: func,
}

type $Event = any;

export default function Rate (props: IProps) {
    
    const {name, value, total, handler, type, counting, spinner} = props;
    function handlerChange(event: $Event) {
        const value = event?.target?.value;
        const number = (''+value)?.replace(',','.');
        
        Number(number) ? handler(number) : handler(undefined);
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
                            <div><span>{total}</span> <> {counting === "TRY" ? <>&#x20a4;</> : `$` }</></div> :
                            spinner === 0 ? <Spinner /> : ''
                        }
                    </div>
                }
                
                <input 
                    type={type ?? "text"}
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

