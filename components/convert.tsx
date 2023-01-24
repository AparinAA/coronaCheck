import React, { MouseEvent } from "react";
import Rate from './rate';
import styles from '../styles/convert.module.css';
import axios from 'axios';
import { totalConvert, truncated } from '../lib/helper';
import { currenciesRate } from '../pages/api/korona';
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

type spinner = {
    [type: string]: number
}

interface IState {
    [type: string]: Value | spinner;
    spinner: spinner
}

const dictRate = {
    'rateUSD': new URLSearchParams({ 'id': '840' }).toString(),
    'rateTRY': new URLSearchParams({ 'id': '949' }).toString(),
    'rateEUR': new URLSearchParams({ 'id': '978' }).toString(),
    'rateKZT': new URLSearchParams({ 'id': '398', 'name': 'KAZ' }).toString()
};

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
            'spinner': {
                "rateUSD": 1,
                "rateTRY": 1,
                "rateEUR": 1,
                "rateKZT": 1,
                "USDTRY": 1,
                "TRYUSD": 1,
                "USDTTRY": 1,
                "RUBUSDT": 1
            }, // 0 - rate is loading, 1 - rate was load, 2 - rate is saving, 3 - rate didn't save (error), 4 - rate was save
        }
        this.handlerExchange = this.handlerExchange.bind(this);
        // this.handlerSaveRate = this.handlerSaveRate.bind(this);
        this.handlerConvert = this.handlerConvert.bind(this);
    }

    componentDidMount(): void {
        this.setState(state => {
            return {
                spinner: {
                    ...state.spinner,
                    "rateUSD": 0,
                    "rateTRY": 0,
                    "rateEUR": 0,
                    "rateKZT": 0,
                    "USDTRY": 0,
                    "TRYUSD": 0,
                    "EURTRY": 0,
                    "USDTTRY": 0,
                    "RUBUSDT": 0
                }
            }
        });

        //check rate TRY - USD/EUR into Turkey
        axios.get<currenciesRate>(`api/ratetry`)
            .then(res => {
                this.setState(state => {
                    return { ...res?.data, spinner: { ...state.spinner, "USDTRY": 1, "TRYUSD": 1, "EURTRY": 1 } }
                });
            })
            .catch((error: any) => {
                console.info(error);
                this.setState(state => {
                    return { spinner: { ...state.spinner, "USDTRY": 1, "TRYUSD": 1, "EURTRY": 1 } }
                });
            });

        //check rate binance USDT by RUB
        axios.get<currenciesRate>(`api/binance`)
            .then(res => {
                this.setState(state => {
                    return { ...res?.data, spinner: { ...state.spinner, "RUBUSDT": 1, "USDTTRY": 1 } }
                });
            })
            .catch((error: any) => {
                console.info(error);
                this.setState(state => {
                    return { spinner: { ...state.spinner, "RUBUSDT": 1, "USDTTRY": 1 } }
                });
            });

        //check rate USD
        axios.get<currenciesRate>(`api/korona?${dictRate['rateUSD']}`)
            .then(res => {
                this.setState(state => {
                    return { ...res?.data, spinner: { ...state.spinner, "rateUSD": 1 } }
                });
            })
            .catch((error: any) => {
                console.info(error);
                this.setState(state => {
                    return { spinner: { ...state.spinner, "rateUSD": 1 } }
                });
            });

        //check rate TRY
        axios.get<currenciesRate>(`api/korona?${dictRate['rateTRY']}`)
            .then(res => {
                this.setState(state => {
                    return { ...res?.data, spinner: { ...state.spinner, "rateTRY": 1 } }
                });
            })
            .catch((error: any) => {
                console.info(error);
                this.setState(state => {
                    return { spinner: { ...state.spinner, "rateTRY": 1 } }
                });
            });

        //check rate EUR
        axios.get<currenciesRate>(`api/korona?${dictRate['rateEUR']}`)
            .then(res => {
                this.setState(state => {
                    return { ...res?.data, spinner: { ...state.spinner, "rateEUR": 1 } }
                });
            })
            .catch((error: any) => {
                console.info(error);
                this.setState(state => {
                    return { spinner: { ...state.spinner, "rateEUR": 1 } }
                });
            });

        //check rate KZT
        axios.get<currenciesRate>(`api/korona?${dictRate['rateKZT']}`)
            .then(res => {
                this.setState(state => {
                    return { ...res?.data, spinner: { ...state.spinner, "rateKZT": 1 } }
                });
            })
            .catch((error: any) => {
                console.info(error);
                this.setState(state => {
                    return { spinner: { ...state.spinner, "rateKZT": 1 } }
                });
            });
    }

    handlerConvert(obj: { [name: string]: Value }): void {
        this.setState(obj);
    }

    handlerExchange(event: any): void {
        this.setState({ 'counting': event.target.value });
    }

    /*handlerSaveRate(event: MouseEvent<HTMLButtonElement>): void {
        event.preventDefault();
        this.setState({ spinner: 2 });
        axios.post('api/saverate', { data: this.state, id: this.props.user.sub.split('|')[1] })
            .then(() => this.setState({ spinner: 4 }), () => this.setState({ spinner: 3 })) //visible alert
            .then(() => setTimeout(() => this.setState({ spinner: 1 }), 3.1 * 1000)) //hidden alert
            .catch(() => {
                this.setState({ spinner: 3 }); //visible alert
                setTimeout(() => this.setState({ spinner: 1 }), 3.1 * 1000); //hidden alert 
            })
    }*/
    render() {
        const state = this.state;
        const { amount, rateUSD, rateTRY, rateKZT, rateEUR, USDTRY, TRYUSD, EURTRY, KZTTRY, KZTUSD, USDTTRY, RUBUSDT, percentage, counting, spinner } = state;

        const rateBTRY = truncated(+(RUBUSDT || 0) / +(USDTTRY || 1), 4);
        // let buttonSaveRate = this.props.user && <ButtonSave handler={this.handlerSaveRate} spinner={Number(spinner)} />

        return (
            <div className={styles.convert}>
                <Alert status={'' + spinner} />
                <h2 className={styles.header}>Convert</h2>

                <div className={styles.sellbuyUSD}>
                    <Rate name="Amount RUB convert" keyName="amount" value={amount as Value} handler={this.handlerConvert} />
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
                    <Rate name="USD to TRY" keyName="USDTRY" handler={this.handlerConvert} value={USDTRY as Value} spinner={Number(spinner['USDTRY'])} />
                    <Rate name="TRY to USD" keyName="TRYUSD" handler={this.handlerConvert} value={TRYUSD as Value} spinner={Number(spinner['TRYUSD'])} />
                    <Rate name="Percentage" keyName="percentage" handler={this.handlerConvert} value={percentage as Value} spinner={Number(spinner)} />
                </div>

                <div className={styles.sellbuyUSD}>
                    <Rate name="EUR to TRY" keyName="EURTRY" handler={this.handlerConvert} value={EURTRY as Value} spinner={Number(spinner['EURTRY'])} />
                    <Rate name="KZT to USD" keyName="KZTUSD" handler={this.handlerConvert} value={KZTUSD as Value} spinner={Number(spinner)} />
                    <Rate name="KZT to TRY" keyName="KZTTRY" handler={this.handlerConvert} value={KZTTRY as Value} spinner={Number(spinner)} />
                </div>

                <div className={styles.sellbuyUSD}>
                    <Rate name="RUB to USDT" keyName="RUBUSDT" handler={this.handlerConvert} value={RUBUSDT as Value} spinner={Number(spinner['RUBUSDT'])} />
                    <Rate name="USDT to TRY" keyName="USDTTRY" handler={this.handlerConvert} value={USDTTRY as Value} spinner={Number(spinner['USDTTRY'])} />
                </div>

                <Rate name="TRY rate Binance to Papara" keyName="rateBTRY" value={rateBTRY} handler={this.handlerConvert} total={totalConvert(state, "btry")} counting={counting as Value} spinner={Number(spinner['RUBUSDT'])} />
                <Rate name="USD rate KoronaPay" keyName="rateUSD" value={rateUSD as Value} handler={this.handlerConvert} total={totalConvert(state, "usd")} counting={counting as Value} spinner={Number(spinner['rateUSD'])} />
                <Rate name="TRY rate KoronaPay" keyName="rateTRY" value={rateTRY as Value} handler={this.handlerConvert} total={totalConvert(state, "try")} counting={counting as Value} spinner={Number(spinner['rateTRY'])} />
                <Rate name="KZT rate KoronaPay" keyName="rateKZT" value={rateKZT as Value} handler={this.handlerConvert} total={totalConvert(state, "kzt")} counting={counting as Value} spinner={Number(spinner['rateKZT'])} />
                <Rate name="EUR rate KoronaPay" keyName="rateEUR" value={rateEUR as Value} handler={this.handlerConvert} total={totalConvert(state, "eur")} counting={counting as Value} spinner={Number(spinner['rateEUR'])} />

                {/* {buttonSaveRate} */}

            </div>
        );
    }
}

export default Convert;
