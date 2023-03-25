import React, { ReactEventHandler } from "react";
import styles from './switchTheme.module.css';

interface SwitchThemeProps {
    onChange: ReactEventHandler,
    theme: 'light-theme' | 'dark-theme'
}

export function SwitchTheme({ onChange, theme }: SwitchThemeProps) {

    return <label className={styles.switch}>
        <input type="checkbox" onChange={onChange} />
        {/* <div className={styles.switchOut}>
            <div className={styles.switchIn}></div>
        </div> */}
        {theme}
    </label>
}