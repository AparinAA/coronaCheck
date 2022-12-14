import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Convert from '../components/convert';
import { useUser } from '@auth0/nextjs-auth0';
// import { HeaderMenu } from '../components/header';

const prefix = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const Home: NextPage = () => {
    const { user, error, isLoading } = useUser();

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