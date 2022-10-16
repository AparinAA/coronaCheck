import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link';
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Convert from '../components/convert';

const prefix = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const Home: NextPage = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Exchange</title>
                <meta name="description" content="Post content" />
                <link rel="icon" href={`${prefix}/exchange.ico`} />
            </Head>
            
            <main className={styles.main}>
               
                <Convert />
            </main>
        </div>
    )
}

export default Home;