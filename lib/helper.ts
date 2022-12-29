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
            total *= (1 - (+(state?.percentage ?? 0) / 100)) / (counting === "TRY" ? 1 : +(state?.TRYUSD ?? 1));
            break;

        case "btry":
            const rateBTRY = truncated(+(state.RUBUSDT || 0) / +(state.USDTTRY || 1), 4);
            total = (!state?.amount || !rateBTRY) ? 0 : (+state?.amount / rateBTRY);
            total *= 1 / (counting === "TRY" ? 1 : +(state?.TRYUSD ?? 1));
            break;

        case "kzt":
            total = (!state?.amount || !state?.rateKZT) ? 0 : (+state?.amount / +state?.rateKZT);
            total *= 1 / (counting === "TRY" ? +(state?.KZTTRY ?? 1) : +(state?.KZTUSD ?? 1));
            break;

        case "eur":
            total = (!state?.amount || !state?.rateEUR) ? 0 : (+state?.amount / +state?.rateEUR);
            total *= +(state?.EURTRY ?? 0) / (counting === "TRY" ? 1 : +(state?.TRYUSD ?? 1));
            break;
    }

    return truncated(total, 2);

}

//we are truncating 'num' to 'decimalPlaces' sign after dot
export function truncated(num: number, decimalPlaces: number) {
    const numPowerConverter = Math.pow(10, decimalPlaces);
    return (!positiveNumber(num) || !positiveNumber(decimalPlaces)) ? 0 : ~~(num * numPowerConverter) / numPowerConverter;
}

//we are checking number, is it positive ?
export function positiveNumber(number: number) {
    return +number > 0.00000000000000001;
}


interface DataPOST {
    "page": number,
    "rows": number,
    "asset": string,
    "tradeType": "SELL" | "BUY",
    "fiat": string,
    "merchantCheck": boolean,
    "payTypes": string[],
}

interface Error {
    "error": string
}

interface DataRes {
    [index: string]: string
}

export async function fetchRateP2PBinance(data: DataPOST): Promise<DataRes> {
    return fetch(
        'https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(res => res.json())
        .then(result => {
            return {
                "type": data.tradeType,
                "rate": result.data[0].adv.price,
                "from": data.tradeType === "BUY" ? data.fiat : data.asset,
                "to": data.tradeType === "BUY" ? data.asset : data.fiat,
            };
        })
        .catch(() => {
            return { "error": "something went to wrong" };
        })
}



export async function fetchAllRateUSDTfromP2PBinance(dataBUY: DataPOST, dataSELL: DataPOST) {
    Promise.all([
        fetchRateP2PBinance(dataBUY),
        fetchRateP2PBinance(dataSELL)
    ])
        .then(rates => {
            if (rates[0].error || rates[1].error) {
                throw rates[0].error || rates[1].error;
            }

            return {
                ...rates[0],
                ...rates[1]
            }
        })
        .catch((e) => {
            return { "error": e };
        })
}