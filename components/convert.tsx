import React from "react";
import Rate from './rate';
import styles from '../styles/convert.module.css';
import { string } from "yup";

interface IProps {
}

type Value = string | number | undefined;

interface IState {
  [type: string]: Value;
}


class Convert extends React.Component<IProps, IState, Value> {
    constructor (props: IProps) {
        super(props);
        this.state = {
            'amount': undefined,
            'rateUSD': undefined,
            'rateTRY': undefined,
            'rateEUR': undefined,
            'rateKZT': undefined,
            'sellUSD': 18, //продаю доллары в обменнике за TRY
            'buyUSD': 18.695, //покупаю доллары в обменнике за TRY
            'sellKZT': 25.76,
            'percentage': 2,
            'counting': 'TRY',
        }
        this.handlerValueAmount = this.handlerValueAmount.bind(this);
        this.handlerValueUSD = this.handlerValueUSD.bind(this);
        this.handlerValueTRY = this.handlerValueTRY.bind(this);
        this.handlerValueKZT = this.handlerValueKZT.bind(this);
        this.handlerValueEUR = this.handlerValueEUR.bind(this);
        this.handlerSellUSD = this.handlerSellUSD.bind(this);
        this.handlerBuyUSD = this.handlerBuyUSD.bind(this);
        this.handlerPercentage = this.handlerPercentage.bind(this);
        this.handlerExchange = this.handlerExchange.bind(this);
    }
    

    handlerValueAmount(value: Value): void {
        this.setState({'amount': value});
    }
    handlerValueUSD(value: Value): void {
        this.setState({'rateUSD': value});
    }
    handlerValueTRY(value: Value): void {
        this.setState({'rateTRY': value});
    }
    handlerValueEUR(value: Value): void {
        this.setState({'rateEUR': value});
    }
    handlerValueKZT(value: Value): void {
        this.setState({'rateKZT': value});
    }
    handlerSellUSD(value: Value): void {
        this.setState({'sellUSD': value});
    }
    handlerBuyUSD(value: Value): void {
        this.setState({'buyUSD': value});
    }
    handlerSellKZT(value: Value): void {
        this.setState({'sellKZT': value});
    }
    handlerPercentage(value: Value): void {
        this.setState({'percentage': value});
    }
    handlerExchange(event: any): void {
        this.setState({'counting' : event.target.value});
    }

    render () {
        const {amount, rateUSD, rateTRY, rateKZT, rateEUR, sellUSD, buyUSD, sellKZT, percentage, counting} = this.state;
        const state = this.state;

        return (
            <div className={styles.convert}>
                <h2 className={styles.header}>Convert KoronaPay</h2>
                <div className={styles.sellbuyUSD}>
                    <Rate name="Amount RUB convert" value={amount} handler={this.handlerValueAmount}/>
                    <input value="USD" className={styles.radioExch1} id="exchUSD" name="exchange" type="radio" checked={this.state.counting === 'USD'} onChange={this.handlerExchange}/>
                    <label htmlFor="exchUSD" className={`${styles.labelExchCom} ${styles.labelExch1}`}>
                        <span>USD</span>
                    </label>
                    
                    <input value="TRY" className={styles.radioExch2} id="exchTRY" name="exchange" type="radio" checked={this.state.counting === 'TRY'} onChange={this.handlerExchange}/>
                    <label htmlFor="exchTRY" className={`${styles.labelExchCom} ${styles.labelExch2}`}>
                        <span>TRY</span>
                    </label>
                    
                    
                </div>
                <div className={styles.sellbuyUSD}>
                    <Rate name="USD to TRY" handler={this.handlerSellUSD} value={sellUSD}/>
                    <Rate name="&#x20a4;/&#x20b8; to USD" handler={this.handlerBuyUSD} value={buyUSD}/>
                    <Rate name="KZT to TRY" handler={this.handlerSellKZT} value={sellKZT}/>
                    <Rate name="Percentage" handler={this.handlerPercentage} value={percentage}/>
                </div>
                <Rate name="USD rate KoronaPay" value={rateUSD} handler={this.handlerValueUSD} total={totalConvert(state, "usd")} counting={counting}/>
                <Rate name="TRY rate KoronaPay" value={rateTRY} handler={this.handlerValueTRY} total={totalConvert(state, "try")} counting={counting}/>
                <Rate name="KZT rate KoronaPay" value={rateKZT} handler={this.handlerValueKZT} total={totalConvert(state, "kzt")} counting={counting}/>
                <Rate name="EUR rate KoronaPay" value={rateEUR} handler={this.handlerValueEUR} total={totalConvert(state, "eur")} counting={counting}/>
            </div>
        );
    }
}

export default Convert;

function totalConvert(state: IState, currency: string): number {
    let total = 0;
    const counting = state.counting;
    if (currency === "usd") {
        total = (!state?.amount || !state?.rateUSD) ? 0 : (+state?.amount / +state?.rateUSD);
        total *= +(state?.sellUSD ?? 0) / (counting === "TRY" ? 1 : +(state?.buyUSD ?? 1));
    }

    if (currency === "try") {
        total = (!state?.amount || !state?.rateTRY) ? 0 : (+state?.amount / +state?.rateTRY);
        total *= ( 1 - ( +(state?.percentage ?? 0) / 100) ) / (counting === "TRY" ? 1 : +(state?.buyUSD ?? 1)) ;
    }

    if (currency === "kzt") {
        total = (!state?.amount || !state?.rateKZT || !state?.sellKZT || !state?.buyUSD) ? 
                0 : (+state?.amount / (+state?.rateKZT * ( counting === "TRY" ? +state?.sellKZT : +state?.buyUSD) ) );
        
    }

    if (currency === "eur") {
        total = (!state?.amount || !state?.rateEUR) ? 0 : (+state?.amount / +state?.rateEUR);
    }
    
    return truncated(total, 2);
    
}

function truncated(num: number, decimalPlaces: number) {
    const numPowerConverter = Math.pow(10, decimalPlaces); 
    return (!positiveNumber(num) || !positiveNumber(decimalPlaces)) ? 0 : ~~(num * numPowerConverter)/numPowerConverter;
}

//check positive number
function positiveNumber(number: number) {
    return typeof number === 'string' ? +number > 0.00000000000000001 : number > 0.00000000000000001;
}