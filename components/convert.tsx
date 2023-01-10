import React, { MouseEvent } from "react";
import Rate from './rate';
import styles from '../styles/convert.module.css';
import axios from 'axios';
import { totalConvert, truncated } from '../lib/helper';
import { currenciesRate } from '../pages/api/checkRate';
import { Alert } from '../components/alert';
import { ButtonSave } from '../components/buttonsave';

interface IProps {
    user: any;
}


interface Rate {
    name: string,
    rate: number | string | undefined
}

type Value = string | number | undefined;

interface IState {
    [type: string]: Value;
}


class Convert extends React.Component<IProps, IState, Value> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            'amount': undefined,
            'rateUSD': undefined,
            'rateTRY': undefined,
            'rateEUR': undefined,
            'rateKZT': undefined,
            'USDTRY': 18, //продаю доллары в обменнике за TRY
            'EURTRY': 18.7, //продаю евро в обменнике за TRY
            'TRYUSD': 18.71, //покупаю доллары в обменнике за TRY
            'KZTTRY': 25.62, //покупаю лиры за тенге
            'KZTUSD': 476.10, //покупаю доллары за тенге
            'USDTTRY': 18.8,
            'RUBUSDT': 71,
            'percentage': 2,
            'counting': 'TRY',
            'spinner': 0, // 0 - rate is loading, 1 - rate was load, 2 - rate is saving, 3 - rate didn't save (error), 4 - rate was save
        }
        this.handlerExchange = this.handlerExchange.bind(this);
        this.handlerSaveRate = this.handlerSaveRate.bind(this);
        this.handlerConvert = this.handlerConvert.bind(this);
    }

    componentDidMount(): void {
        this.setState({ spinner: 0 });
        axios.get<currenciesRate>(`api/checkRate`)
            .then(res => this.setState({ ...res?.data, spinner: 1 }))
            .catch((error: any) => {
                console.info(error);
                this.setState({ spinner: 1 });
            });
    }

    handlerConvert(obj: { [name: string]: Value }): void {
        this.setState(obj);
    }

    handlerExchange(event: any): void {
        this.setState({ 'counting': event.target.value });
    }
    handlerSaveRate(event: MouseEvent<HTMLButtonElement>): void {
        event.preventDefault();
        this.setState({ spinner: 2 });
        axios.post('api/saverate', { data: this.state, id: this.props.user.sub.split('|')[1] })
            .then(() => this.setState({ spinner: 4 }), () => this.setState({ spinner: 3 })) //visible alert
            .then(() => setTimeout(() => this.setState({ spinner: 1 }), 3.1 * 1000)) //hidden alert
            .catch(() => {
                this.setState({ spinner: 3 }); //visible alert
                setTimeout(() => this.setState({ spinner: 1 }), 3.1 * 1000); //hidden alert 
            })
    }
    render() {
        const state = this.state;
        const { amount, rateUSD, rateTRY, rateKZT, rateEUR, USDTRY, TRYUSD, EURTRY, KZTTRY, KZTUSD, USDTTRY, RUBUSDT, percentage, counting, spinner } = state;

        const rateBTRY = truncated(+(RUBUSDT || 0) / +(USDTTRY || 1), 4);
        let buttonSaveRate = this.props.user && <ButtonSave handler={this.handlerSaveRate} spinner={Number(spinner)} />

        return (
            <div className={styles.convert}>
                <Alert status={'' + spinner} />
                <h1 className={styles.header}>Convert</h1>

                <div className={styles.sellbuyUSD}>
                    <Rate name="Amount RUB convert" keyName="amount" value={amount} handler={this.handlerConvert} />
                    <input value="USD" className={styles.radioExch1} id="exchUSD" name="exchange" type="radio" checked={this.state.counting === 'USD'} onChange={this.handlerExchange} />
                    <label htmlFor="exchUSD" className={`${styles.labelExchCom} ${styles.labelExch1}`}>
                        <span>USD</span>
                    </label>

                    <input value="TRY" className={styles.radioExch2} id="exchTRY" name="exchange" type="radio" checked={this.state.counting === 'TRY'} onChange={this.handlerExchange} />
                    <label htmlFor="exchTRY" className={`${styles.labelExchCom} ${styles.labelExch2}`}>
                        <span>TRY</span>
                    </label>


                </div>

                <div className={styles.sellbuyUSD}>
                    <Rate name="USD to TRY" keyName="USDTRY" handler={this.handlerConvert} value={USDTRY} spinner={Number(spinner)} />
                    <Rate name="TRY to USD" keyName="TRYUSD" handler={this.handlerConvert} value={TRYUSD} spinner={Number(spinner)} />
                    <Rate name="Percentage" keyName="percentage" handler={this.handlerConvert} value={percentage} spinner={Number(spinner)} />
                </div>

                <div className={styles.sellbuyUSD}>
                    <Rate name="EUR to TRY" keyName="EURTRY" handler={this.handlerConvert} value={EURTRY} spinner={Number(spinner)} />
                    <Rate name="KZT to USD" keyName="KZTUSD" handler={this.handlerConvert} value={KZTUSD} spinner={Number(spinner)} />
                    <Rate name="KZT to TRY" keyName="KZTTRY" handler={this.handlerConvert} value={KZTTRY} spinner={Number(spinner)} />
                </div>

                <div className={styles.sellbuyUSD}>
                    <Rate name="RUB to USDT" keyName="RUBUSDT" handler={this.handlerConvert} value={RUBUSDT} spinner={Number(spinner)} />
                    <Rate name="USDT to TRY" keyName="USDTTRY" handler={this.handlerConvert} value={USDTTRY} spinner={Number(spinner)} />
                </div>

                <Rate name="TRY rate Binance to Papara" keyName="rateBTRY" value={rateBTRY} handler={this.handlerConvert} total={totalConvert(state, "btry")} counting={counting} spinner={Number(spinner)} />
                <Rate name="USD rate KoronaPay" keyName="rateUSD" value={rateUSD} handler={this.handlerConvert} total={totalConvert(state, "usd")} counting={counting} spinner={Number(spinner)} />
                <Rate name="TRY rate KoronaPay" keyName="rateTRY" value={rateTRY} handler={this.handlerConvert} total={totalConvert(state, "try")} counting={counting} spinner={Number(spinner)} />
                <Rate name="KZT rate KoronaPay" keyName="rateKZT" value={rateKZT} handler={this.handlerConvert} total={totalConvert(state, "kzt")} counting={counting} spinner={Number(spinner)} />
                <Rate name="EUR rate KoronaPay" keyName="rateEUR" value={rateEUR} handler={this.handlerConvert} total={totalConvert(state, "eur")} counting={counting} spinner={Number(spinner)} />

                {buttonSaveRate}

            </div>
        );
    }
}

export default Convert;
