import React from "react";
import Rate from './rate';
import styles from '../styles/convert.module.css';

interface IProps {
}

interface IState {
  [type: string]: number;
}

class Convert extends React.Component<IProps, IState> {
    constructor (props: IProps) {
        super(props);
        this.state = {
            'amount': 0,
            'rateUSD': 0,
            'rateTRY': 0,
            'rateEUR': 0,
            'sellUSD': 18.65,
            'buyUSD': 18.2,
            'commissionPercent': 2,
        }
        this.handlerValueAmount = this.handlerValueAmount.bind(this);
        this.handlerValueUSD = this.handlerValueUSD.bind(this);
        this.handlerValueTRY = this.handlerValueTRY.bind(this);
        this.handlerValueEUR = this.handlerValueEUR.bind(this);
    }
    
    handlerValueAmount(value: number): void {
        this.setState({'amount': value})
    }
    handlerValueUSD(value: number): void {
        this.setState({'rateUSD': value})
    }
    handlerValueTRY(value: number): void {
        this.setState({'rateTRY': value})
    }
    handlerValueEUR(value: number): void {
        this.setState({'rateEUR': value})
    }

    render () {
        const {amount, rateUSD, rateTRY, rateEUR} = this.state;
        const state = this.state;
        return (
            <div className={styles.convert}>
                <h2>Convert KoronaPay</h2>
                <Rate name="Amount convert" value={amount} handler={this.handlerValueAmount} />
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
        total = (!state?.amount || !state?.rateUSD) ? 0 : state?.amount / state?.rateUSD
        total *= state?.sellUSD / state?.buyUSD;
    }

    if (currency === "try") {
        total = (!state?.amount || !state?.rateTRY) ? 0 : state?.amount / state?.rateTRY
        total *= ( 1 - (state?.commissionPercent / 100) ) / state?.buyUSD ;
    }

    if (currency === "eur") {
        total = (!state?.amount || !state?.rateEUR) ? 0 : state?.amount / state?.rateEUR;
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