import React, { useState } from "react";

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
        <div>
            <input placeholder={'' + name} onChange={handlerChange} id={"rate-" + name}/>
            <label htmlFor={"rate-" + name}>{(total && total > 0) ? total + ' $' : ''}</label>
        </div>    
    )
}

