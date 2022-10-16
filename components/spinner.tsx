import React, { FunctionComponent } from "react";
import styles from "../styles/spinner.module.css";

type SpinnerProps = {
    [types: string]: string
}

export const Spinner: FunctionComponent<SpinnerProps> = ({}) => <div className={styles.spinner}></div>