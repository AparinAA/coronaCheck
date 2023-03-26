import React, { ReactEventHandler, useEffect, useState } from "react";
import styles from './switchTheme.module.css';


export function SwitchTheme() {
    const [theme, setTheme] = useState<boolean>(false);

    function handlerChangeTheme() {
        setTheme(!theme);
        localStorage.setItem("theme", `${!theme}`);
    }

    useEffect(() => {
        if (localStorage.getItem('theme')) {
            const checkLocalStorage = localStorage.getItem('theme') === 'true';
            document.body.classList.add(checkLocalStorage ? 'dark-theme' : 'light-theme');
            setTheme(checkLocalStorage);
        } else {
            const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
            document.body.classList.add(prefersDarkScheme.matches ? 'dark-theme' : 'light-theme');
            setTheme(prefersDarkScheme.matches);
        }
    }, []);

    useEffect(() => {
        if (theme) {
            document.body.classList.replace('light-theme', 'dark-theme');
        } else {
            document.body.classList.replace('dark-theme', 'light-theme');
        }
    }, [theme])

    return <div className={styles.switchTheme}>
        <div className={`${styles.switch} ${theme ? styles.dark : styles.light}`}></div>
        <label className={styles.mainSwitch}>
            <input type="checkbox" onChange={() => handlerChangeTheme()} checked={theme} />
            <span className={`${styles.slider} ${styles.round}`}></span>
        </label>
    </div>
}