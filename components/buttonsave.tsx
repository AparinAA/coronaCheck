import React, { MouseEvent } from "react";
import styles from '../styles/buttonsave.module.css'
import { Spinner } from './spinner';

type hand = (event: MouseEvent<HTMLButtonElement>) => void;

interface Props {
    handler: hand
    spinner: number | undefined
}


export class ButtonSave extends React.Component<Props, {}> {
    render () {
        const { handler, spinner } = this.props;
        return <button 
                    name="Save rates" 
                    className={`${styles.button}`} 
                    onClick={handler}
                    disabled={[0, 3, 4].indexOf(Number(spinner)) !== -1}
                >
                    {spinner === 2 ? <Spinner /> : 'Save rates'}
                </button>
    }
}

