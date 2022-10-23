import React, { ChangeEvent } from "react";
import styles from "../styles/convert.module.css";
import { Spinner } from '../components/spinner';

type InputChangeEvent = ChangeEvent<HTMLInputElement>;

type func = (obj: {[id:string]: string | number | undefined} ) => void;

interface IProps {
    [type: string] : string | number | func | undefined | boolean,
    keyName: string,
    total?: number,
    value?: number | string | undefined,
    type?: string,
    spinner?: number,
    handler: func,
}

export default function Rate (props: IProps) {
    
    const {name, keyName, value, total, handler, type, counting, spinner} = props;
    
    function handlerChange(event: InputChangeEvent) {
        const value = event?.target?.value;
        const number = (''+value)?.replace(',','.');
        
        const obj: {[id:string]: string | number | undefined} = {};
        obj[keyName] = number;
        
        Number(number) >= 0 ? handler(obj) : handler(obj);
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
                            <div><span>{total}</span> <span>{counting === "TRY" ? <>&#x20a4;</> : `$` }</span></div> :
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

