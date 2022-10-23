type Value = string | number | undefined;

interface IState {
  [type: string]: Value;
}

//we are counting total value
export function totalConvert(state: IState, currency: string): number {
    let total = 0;
    const counting = state.counting;
    switch (currency) {
        case "usd":
            total = (!state?.amount || !state?.rateUSD) ? 0 : (+state?.amount / +state?.rateUSD);
            total *= +(state?.USDTRY ?? 0) / (counting === "TRY" ? 1 : +(state?.TRYUSD ?? 1));
            break;

        case "try":
            total = (!state?.amount || !state?.rateTRY) ? 0 : (+state?.amount / +state?.rateTRY);
            total *= ( 1 - ( +(state?.percentage ?? 0) / 100) ) / (counting === "TRY" ? 1 : +(state?.TRYUSD ?? 1));
            break;
    
        case "kzt":
            total = (!state?.amount || !state?.rateKZT) ? 0 : (+state?.amount / +state?.rateKZT);
            total *= 1 / (counting === "TRY" ? +(state?.KZTTRY ?? 1) : +(state?.KZTUSD ?? 1));
            break;
    
        case "eur":
            total = (!state?.amount || !state?.rateEUR) ? 0 : (+state?.amount / +state?.rateEUR);
            break;
    }
    
    return truncated(total, 2);
    
}

//we are truncating 'num' to 'decimalPlaces' sign after dot
export function truncated(num: number, decimalPlaces: number) {
    const numPowerConverter = Math.pow(10, decimalPlaces); 
    return (!positiveNumber(num) || !positiveNumber(decimalPlaces)) ? 0 : ~~(num * numPowerConverter)/numPowerConverter;
}

//we are checking number, is it positive ?
export function positiveNumber(number: number) {
    return typeof number === 'string' ? +number > 0.00000000000000001 : number > 0.00000000000000001;
}
