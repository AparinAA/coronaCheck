import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Convert from "../components/convert";
import { useEffect, useState } from "react";
import { SwitchTheme } from "../components";
// import { HeaderMenu } from '../components/header';

const prefix = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const Home: NextPage = () => {
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

					<SwitchTheme />

					<Convert user="" />
				</main>
			</div>
			<footer className={styles.footer}>
				<div>
					Powered by{" "}
					<a
						href="https://aparinaleksandr.site"
						rel="noreferrer"
						target="_blank"
					>
						Aleksandr Aparin
					</a>
				</div>
			</footer>
		</div>
	);
};

export default Home;
