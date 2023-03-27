import { type } from 'os';
import React, { useEffect, useRef } from 'react';

type Handler = Function;

function ThemeDefault(handler: Handler) {
    const handlerRef = useRef<Function>();

    useEffect(() => {
        handlerRef.current = handler;
    }, [handler]);

    useEffect(() => {
        console.info(localStorage.getItem('theme'))
        if (localStorage.getItem('theme')) {
            const checkLocalStorage = localStorage.getItem('theme') === 'true';
            document.body.classList.add(checkLocalStorage ? 'dark-theme' : 'light-theme');
            handlerRef.current?.(checkLocalStorage);
        } else {
            const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
            document.body.classList.add(prefersDarkScheme.matches ? 'dark-theme' : 'light-theme');
            handlerRef.current?.(prefersDarkScheme.matches);
        }
    }, []);
}

export { ThemeDefault };