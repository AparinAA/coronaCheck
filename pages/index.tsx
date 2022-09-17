import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link';
import Image from 'next/image'
import styles from '../styles/Home.module.css'


const Home: NextPage = () => {

    return (
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Post content" />
                <link rel="icon" href="/favicon.ico" />
                <title>Index</title>
            </Head>

            <main className={styles.main}>
                <Link href={'/users'}><a className={styles.start}>Push me</a></Link>
            </main>
        </div>
    )
}

export default Home
