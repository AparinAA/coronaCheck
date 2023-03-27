import React, { ReactEventHandler, useEffect, useRef, useState } from "react";
import styles from './switchTheme.module.css';
import { ThemeDefault } from "./hooks";

export function SwitchTheme() {
    const [theme, setTheme] = useState(false);

    function handlerChangeTheme() {
        const temp = !theme;
        setTheme(temp);
        localStorage.setItem("theme", `${temp}`);
    }

    ThemeDefault(setTheme);

    useEffect(() => {
        if (theme) {
            document.body.classList.replace('light-theme', 'dark-theme');
        } else {
            document.body.classList.replace('dark-theme', 'light-theme');
        }
    }, [theme]);

    return <div className={styles.switchTheme}>
        <div className={`${styles.switch} ${theme ? styles.dark : styles.light}`}></div>
        <label className={styles.mainSwitch}>
            <input type="checkbox" onChange={handlerChangeTheme} checked={theme} />
            <span className={`${styles.slider} ${styles.round}`}></span>
        </label>
    </div>
}