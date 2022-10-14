import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link';
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useUser } from '@auth0/nextjs-auth0';
import Convert from '../components/convert';
import axios from 'axios';
import {useEffect} from 'react';

const prefix = process.env.NEXT_PUBLIC_BASE_PATH || '';
console.info(process.env.NEXT_PUBLIC_BASE_PATH, process.env.NEXT_PABLIC_HOST);

const Home: NextPage = () => {
    const { user, error, isLoading } = useUser();

    { isLoading && <div>Loading...</div> }
    { error && <div>{error.message}</div> }

    return (
        <div className={styles.container}>
            <Head>
                <title>Exchange</title>
                <meta name="description" content="Post content" />
                <link rel="icon" href={`${prefix}/exchange.ico`} />
            </Head>
            
            <main className={styles.main}>
                { 
                    user ? 
                    <>
                        <span>{user?.name}</span>
                        <Image src={''+user?.picture} alt="avatar" width={100} height={100}/>
                        <Link href={`${prefix}/api/auth/logout`}><a className={styles.logout}>Logout</a></Link>
                        <Link href={`${prefix}/users`}><a className={styles.start}>Push me</a></Link>
                        
                    </> :
                    <Link href={`${prefix}/api/auth/login`}><a className={styles.login}>Login</a></Link>
                }
                <Convert />
            </main>
        </div>
    )
}

export default Home;