import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link';
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Convert from '../components/convert';
import { useUser } from '@auth0/nextjs-auth0';
import { Logbutton } from  '../components/logbutton';

const prefix = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const Home: NextPage = () => {
    const { user, error, isLoading } = useUser();
    const loginlogout = <Logbutton status={user ? true : false }/>
    return (
        <div className={styles.container}>
            <Head>
                <title>Exchange</title>
                <meta name="description" content="Post content" />
                <link rel="icon" href={`${prefix}/exchange.ico`} />
            </Head>
            
            <header>
                { loginlogout }
            </header>
            <main className={styles.main}>
               
                <Convert user={ user } />
            </main>
        </div>
    )
}

export default Home;