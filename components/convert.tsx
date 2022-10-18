import React from "react";
import Rate from './rate';
import styles from '../styles/convert.module.css';
import axios from 'axios';
import { currenciesRate } from '../pages/api/checkRate';
import { Spinner } from '../components/spinner';
import { Alert } from '../components/alert';

interface IProps {
    [index: string]: any;
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
    constructor (props: IProps) {
        super(props);
        this.state = {
            'amount': undefined,
            'rateUSD': undefined,
            'rateTRY': undefined,
            'rateEUR': undefined,
            'rateKZT': undefined,
            'USDTRY': 18, //продаю доллары в обменнике за TRY
            'TRYUSD': 18.71, //покупаю доллары в обменнике за TRY
            'KZTTRY': 25.62, //покупаю лиры за тенге
            'KZTUSD': 476.10, //покупаю доллары за тенге
            'percentage': 2,
            'counting': 'TRY',
            'spinner': 0 // 0 - rate is loading, 1 - rate was load, 2 - rate is saving, 3 - rate didn't save (error), 4 - rate was save 
        }
        this.handlerValueAmount = this.handlerValueAmount.bind(this);
        this.handlerValueUSD = this.handlerValueUSD.bind(this);
        this.handlerValueTRY = this.handlerValueTRY.bind(this);
        this.handlerValueKZT = this.handlerValueKZT.bind(this);
        this.handlerValueEUR = this.handlerValueEUR.bind(this);
        this.handlerUSDTRY = this.handlerUSDTRY.bind(this);
        this.handlerTRYUSD = this.handlerTRYUSD.bind(this);
        this.handlerKZTTRY = this.handlerKZTTRY.bind(this);
        this.handlerKZTUSD = this.handlerKZTUSD.bind(this);
        this.handlerPercentage = this.handlerPercentage.bind(this);
        this.handlerExchange = this.handlerExchange.bind(this);
        this.handlerSaveRate = this.handlerSaveRate.bind(this);
    }
    
    componentDidMount(): void {
        this.setState({spinner: 0});
        axios.get<currenciesRate>(`api/checkRate`)
        .then(res => this.setState({...res?.data, spinner: 1}))
        .catch( (error: any) => {
            console.info(error);
            this.setState({spinner: 1});
        });
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
    handlerUSDTRY(value: Value): void {
        this.setState({'USDTRY': value});
    }
    handlerTRYUSD(value: Value): void {
        this.setState({'TRYUSD': value});
    }
    handlerKZTTRY(value: Value): void {
        this.setState({'KZTTRY': value});
    }
    handlerKZTUSD(value: Value): void {
        this.setState({'KZTUSD': value});
    }
    handlerPercentage(value: Value): void {
        this.setState({'percentage': value});
    }
    handlerExchange(event: any): void {
        this.setState({'counting' : event.target.value});
    }
    handlerSaveRate(event: any): void {
        this.setState({spinner: 2});
        axios.post('api/saverate', {data: this.state, id: this.props.user.sub.split('|')[1]})
        .then( () => this.setState({spinner: 4}), () => {
            this.setState({spinner: 3});//visible alert
        })
        .catch(error => {
            console.info(error);
            this.setState({spinner: 3}); //visible alert
        })
        setTimeout( () => this.setState({spinner: 1}), 3.5 * 1000); //hidden alert 
    }
    render () {
        const state = this.state;
        const {amount, rateUSD, rateTRY, rateKZT, rateEUR, USDTRY, TRYUSD, KZTTRY, KZTUSD, percentage, counting, spinner} = state;
        let buttonSaveRate;
        if (this.props.user) {
            buttonSaveRate = <button 
                name="Save rates" 
                className={`${styles.button}`} 
                onClick={this.handlerSaveRate}
                disabled={[0, 3, 4].indexOf(Number(spinner)) !== -1}
            >
                {spinner === 2 ? <Spinner /> : 'Save rates'}
            </button>
        }
        
        return (
            <div className={styles.convert}>
                <Alert status={''+spinner}/>
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
                    <Rate name="USD to TRY" handler={this.handlerUSDTRY} value={USDTRY} spinner={Number(spinner)}/>
                    <Rate name="TRY to USD" handler={this.handlerTRYUSD} value={TRYUSD} spinner={Number(spinner)}/>
                    <Rate name="Percentage" handler={this.handlerPercentage} value={percentage} spinner={Number(spinner)}/>
                </div>
                <div className={styles.sellbuyUSD}>
                    <Rate name="KZT to USD" handler={this.handlerKZTUSD} value={KZTUSD} spinner={Number(spinner)}/>
                    <Rate name="KZT to TRY" handler={this.handlerKZTTRY} value={KZTTRY} spinner={Number(spinner)}/>
                </div>
                <Rate name="USD rate KoronaPay" value={rateUSD} handler={this.handlerValueUSD} total={totalConvert(state, "usd")} counting={counting} spinner={Number(spinner)}/>
                <Rate name="TRY rate KoronaPay" value={rateTRY} handler={this.handlerValueTRY} total={totalConvert(state, "try")} counting={counting} spinner={Number(spinner)}/>
                <Rate name="KZT rate KoronaPay" value={rateKZT} handler={this.handlerValueKZT} total={totalConvert(state, "kzt")} counting={counting} spinner={Number(spinner)}/>
                <Rate name="EUR rate KoronaPay" value={rateEUR} handler={this.handlerValueEUR} total={totalConvert(state, "eur")} counting={counting} spinner={Number(spinner)}/>
                
                { buttonSaveRate }
                
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
        total *= +(state?.USDTRY ?? 0) / (counting === "TRY" ? 1 : +(state?.TRYUSD ?? 1));
    }

    if (currency === "try") {
        total = (!state?.amount || !state?.rateTRY) ? 0 : (+state?.amount / +state?.rateTRY);
        total *= ( 1 - ( +(state?.percentage ?? 0) / 100) ) / (counting === "TRY" ? 1 : +(state?.TRYUSD ?? 1)) ;
    }

    if (currency === "kzt") {
        total = (!state?.amount || !state?.rateKZT) ? 0 : (+state?.amount / +state?.rateKZT);
        total *= 1 / (counting === "TRY" ? +(state?.KZTTRY ?? 1) : +(state?.KZTUSD ?? 1)) ;
        
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

