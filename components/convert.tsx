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
            'sellUSD': 18.2, //продаю доллары в обменнике за TRY
            'buyUSD': 18.65, //покупаю доллары в обменнике за TRY
            'percentage': 2,
            'countingUSD': 1,
        }
        this.handlerValueAmount = this.handlerValueAmount.bind(this);
        this.handlerValueUSD = this.handlerValueUSD.bind(this);
        this.handlerValueTRY = this.handlerValueTRY.bind(this);
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
    handlerSellUSD(value: Value): void {
        this.setState({'sellUSD': value});
    }
    handlerBuyUSD(value: Value): void {
        this.setState({'buyUSD': value});
    }
    handlerPercentage(value: Value): void {
        this.setState({'percentage': value});
    }
    handlerExchange(event: any): void {
        this.setState({'countingUSD' : event.target.value === 'USD' ? 1 : 0});
    }
    render () {
        const {amount, rateUSD, rateTRY, rateEUR, sellUSD, buyUSD, percentage} = this.state;
        const state = this.state;

        return (
            <div className={styles.convert}>
                <h2 className={styles.header}>Convert KoronaPay</h2>
                <div className={styles.sellbuyUSD}>
                    <Rate name="Amount convert" value={amount} handler={this.handlerValueAmount}/>
                        
                    <input value="USD" className={styles.radioExch1} id="exchUSD" name="exchange" type="radio" checked={(''+ this.state.countingUSD) === '1'} onChange={this.handlerExchange}/>
                    <label htmlFor="exchUSD" className={`${styles.labelExchCom} ${styles.labelExch1}`}>
                        <span>USD</span>
                    </label>
                    
                    <input value="TRY" className={styles.radioExch2} id="exchTRY" name="exchange" type="radio" checked={(''+ this.state.countingUSD) !== '1'} onChange={this.handlerExchange}/>
                    <label htmlFor="exchTRY" className={`${styles.labelExchCom} ${styles.labelExch2}`}>
                        <span>TRY</span>
                    </label>
                        
                </div>
                <div className={styles.sellbuyUSD}>
                    <Rate name="Sell USD" handler={this.handlerSellUSD} value={sellUSD}/>
                    <Rate name="Buy USD" handler={this.handlerBuyUSD} value={buyUSD}/>
                    <Rate name="Percentage" handler={this.handlerPercentage} value={percentage}/>
                </div>
                <Rate name="USD rate" value={rateUSD} handler={this.handlerValueUSD} total={totalConvert(state, "usd")}/>
                <Rate name="TRY rate" value={rateTRY} handler={this.handlerValueTRY} total={totalConvert(state, "try")}/>
                <Rate name="EUR rate" value={rateEUR} handler={this.handlerValueEUR} total={totalConvert(state, "eur")}/>
            </div>
        );
    }
}

export default Convert;

function totalConvert(state: IState, currency: string): number {
    let total = 0;
    if (currency === "usd") {
        total = (!state?.amount || !state?.rateUSD) ? 0 : (+state?.amount / +state?.rateUSD);
        total *= +(state?.sellUSD ?? 0) / +(state?.buyUSD ?? 1);
    }

    if (currency === "try") {
        total = (!state?.amount || !state?.rateTRY) ? 0 : (+state?.amount / +state?.rateTRY);
        total *= ( 1 - ( +(state?.percentage ?? 0) / 100) ) / +(state?.buyUSD ?? 1) ;
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