import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Convert from '../components/convert';
import { useUser } from '@auth0/nextjs-auth0';
import { useEffect, useState } from 'react';
import { SwitchTheme } from '../components';
// import { HeaderMenu } from '../components/header';

const prefix = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const Home: NextPage = () => {
    const { user, error, isLoading } = useUser();
    const [theme, setTheme] = useState<'light-theme' | 'dark-theme'>('light-theme');

    const handlerChangeTheme = (e: any) => {
        setTheme(e.target.checked ? 'dark-theme' : 'light-theme');
    }

    useEffect(() => {
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        if (prefersDarkScheme.matches) {
            document.body.classList.toggle("light-theme");
        } else {
            document.body.classList.toggle("dark-theme");
        }
    }, [theme]);

    return (
        <div className={styles.con}>
            <div className={styles.container}>
                <Head>
                    <title>Calculator</title>
                    <meta name="description" content="Calculator" />
                    <link rel="icon" href={`${prefix}/exchange.ico`} />
                </Head>


                <main className={styles.main}>
                    {/* <HeaderMenu status={user ? true : false} isLoading={isLoading} /> */}

                    <SwitchTheme onChange={handlerChangeTheme} theme={theme} />

                    <Convert user={user} />
                </main>
            </div>
            <footer className={styles.footer}>
                <div>Powered by <a href='https://www.aleksandraparin.site' rel="noreferrer" target="_blank">Aleksandr Aparin</a></div>
            </footer>
        </div>
    )
}

export default Home;