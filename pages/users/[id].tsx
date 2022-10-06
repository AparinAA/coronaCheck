import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next';
import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import styles from '../../styles/Home.module.css'
import { withPageAuthRequired } from '@auth0/nextjs-auth0';


export default withPageAuthRequired(

    function User ({user} : any) {
    
        let empty = false;
        if( user && Object.keys(user).length < 1 ) {
            empty = true;
        }
        const title = 'User ' + (empty ? 'empty' : `No ${user?.id}`);
        return (
            <>
                <Head>
                    <title>{title}</title>
                </Head>
                <div>
                    <Link href='/api/auth/logout'>
                        <a className={styles.logout}>Logout</a>
                    </Link>
                </div>
                <div className={styles.profile}>
                    {
                        empty ? 
                            <h1>Empty Profile</h1> : 
                            <div>
                                <h2>Profile</h2>
                                <Image src={user?.avatar} width={150} height={150} alt="Picture of the user"/>
                                <p><b>Name:</b> {user?.first_name}</p>
                                <p><b>Last name:</b> {user?.last_name}</p>
                                <p><b>email:</b> {user?.email}</p>
                            </div>
                    }
    
                </div>
                <Link href={'/users'}><a className={styles.button}>Back to list</a></Link>
            </>
        );
    }
);

export const getStaticPaths: GetStaticPaths = async () => {
    const res = await fetch('https://reqres.in/api/users?page=2');
    const users = await res.json();

    const paths = users.data.map((user: any) => ({
        params: { id: '' + user.id },
    }));
    return { paths, fallback: false };
}

export const getStaticProps: GetStaticProps = async ({params} : any) => {
    const res = await fetch(`https://reqres.in/api/users/${params.id}`);
    const user = (await res.json())?.data;
    
    return {props: {user} }; 
}

//export default User;