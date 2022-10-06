import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link';
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useUser } from '@auth0/nextjs-auth0';
import Convert from '../components/convert';

const Home: NextPage = () => {
    const { user, error, isLoading } = useUser();

    console.info(user, isLoading);
    { isLoading && <div>Loading...</div> }
    { error && <div>{error.message}</div> }

    return (
        <div className={styles.container}>
            <Head>
                <title>Index</title>
                <meta name="description" content="Post content" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            
            <main className={styles.main}>
                { 
                    user ? 
                    <>
                        <span>{user?.name}</span>
                        <img src={''+user?.picture} alt="avatar" width={100} height={100}/>
                        <Link href='api/auth/logout'><a className={styles.logout}>Logout</a></Link>
                        <Link href={'/users'}><a className={styles.start}>Push me</a></Link>
                        
                    </> :
                    <Link href="api/auth/login"><a className={styles.login}>Login</a></Link>
                }
                <Convert />
            </main>
        </div>
    )
}

export default Home;