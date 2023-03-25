import React, { ReactEventHandler, useEffect, useState } from "react";
import styles from './switchTheme.module.css';


export function SwitchTheme() {
    const [theme, setTheme] = useState<boolean>(false);

    useEffect(() => {
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        document.body.classList.add(prefersDarkScheme.matches ? 'dark-theme' : 'light-theme');
        setTheme(prefersDarkScheme.matches);
    }, []);

    useEffect(() => {
        if (theme) {
            document.body.classList.replace('light-theme', 'dark-theme');
        } else {
            document.body.classList.replace('dark-theme', 'light-theme');
        }
    }, [theme])

    return <label className={styles.mainSwitch}>
        <input type="checkbox" onChange={() => setTheme(!theme)} checked={theme} />
        <span className={`${styles.slider} ${styles.round}`}></span>
        <div className={`${styles.switch} ${theme ? styles.dark : styles.light}`}></div>
    </label>
}