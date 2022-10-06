import type { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';
import styles from '../../styles/Home.module.css'
import { GetStaticProps } from 'next';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

const Users: NextPage = ({users}: any) => {
    const listLink = users?.map((item : any) => {
        return <li key={item.id}><Link href={`users/${item.id}`}><a>{item.first_name}</a></Link></li>
    })
    
    return (
        <>
            <Head>
                <title>Posts</title>
            </Head>
            
            <a className={styles.logout} href='/api/auth/logout'>Logout</a>
            
            <div>
                <ul className={styles.list}>
                    {listLink}
                </ul>
                <Link href={'/'}><a className={styles.button}>Back to main</a></Link>
            </div>
        </>
    );
}


export const getServerSideProps: GetServerSideProps = withPageAuthRequired({
    returnTo: '/',
    async getServerSideProps() {
        // access the user session
        const res = await fetch('https://reqres.in/api/users?page=2');
        const users = await res.json();
        if (!users) {
            return {
                redirect: {
                    destination: '/',
                    permanent: false,
                }
            };
        }

        return {props: { users: users.data.map((user: any) => ({'id': user.id, 'first_name': user.first_name}))} };
    }
});

/*
export async function getStaticProps(params : any) {
    const res = await fetch('https://reqres.in/api/users?page=2');
    const posts = await res.json();

    return {props: { users: posts.data.map((user: any) => ({'id': user.id, 'first_name': user.first_name}))} };
}
*/

export default Users;