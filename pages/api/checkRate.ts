// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';
import { fetchRateP2PBinance } from '../../lib/helper';

export interface currenciesRate {
    [index: string]: string | undefined,
}

export default async function select(
    req: NextApiRequest,
    res: NextApiResponse<currenciesRate>
) {

    try {

        const queryData = req.query;
        const buf: currenciesRate = {};

        const dataBUYtoP2PBinance = {
            "page": 1,
            "rows": 1,
            "asset": "USDT",
            "tradeType": "BUY" as "BUY",
            "fiat": "RUB",
            "merchantCheck": false,
            "payTypes": ["TinkoffNew", "RaiffeisenBank"],
        }

        const dataSELLtoP2PBinance = {
            "page": 1,
            "rows": 1,
            "asset": "USDT",
            "tradeType": "SELL" as "SELL",
            "fiat": "TRY",
            "merchantCheck": false,
            "payTypes": ["Papara"],
        }

        const paramsGeneral = {
            'sendingCountryId': 'RUS',
            'sendingCurrencyId': '810',
            'receivingCountryId': 'TUR',
            'receivingCurrencyId': '',
            'paymentMethod': 'debitCard',
            'receivingAmount': '100000',
            'receivingMethod': 'cash',
            'paidNotificationEnabled': 'false',
        }

        const paramsUSD = { ...paramsGeneral, 'receivingCurrencyId': '840' };
        const paramsTRY = { ...paramsGeneral, 'receivingCurrencyId': '949' };
        const paramsEUR = { ...paramsGeneral, 'receivingCurrencyId': '978' };
        const paramsKZT = { ...paramsGeneral, 'receivingCurrencyId': '398', 'receivingCountryId': 'KAZ' };


        const res1 = await axios.get('https://koronapay.com/transfers/online/api/transfers/tariffs', { params: paramsUSD });
        const res2 = await axios.get('https://koronapay.com/transfers/online/api/transfers/tariffs', { params: paramsTRY });
        const res3 = await axios.get('https://koronapay.com/transfers/online/api/transfers/tariffs', { params: paramsEUR });
        const res4 = await axios.get('https://koronapay.com/transfers/online/api/transfers/tariffs', { params: paramsKZT });
        const res5 = await axios.get('https://www.tolunaylar.com.tr');
        const res6 = await fetchRateP2PBinance(dataBUYtoP2PBinance);
        const res7 = await fetchRateP2PBinance(dataSELLtoP2PBinance);

        (await Promise.all([
            axios.get('https://koronapay.com/transfers/online/api/transfers/tariffs', { params: paramsUSD }),
            axios.get('https://koronapay.com/transfers/online/api/transfers/tariffs', { params: paramsTRY }),
            axios.get('https://koronapay.com/transfers/online/api/transfers/tariffs', { params: paramsEUR }),
            axios.get('https://koronapay.com/transfers/online/api/transfers/tariffs', { params: paramsKZT }),
            // axios.get('https://www.tolunaylar.com.tr'),
            // fetchRateP2PBinance(dataBUYtoP2PBinance),
            // fetchRateP2PBinance(dataSELLtoP2PBinance),
        ]))
            .forEach((resp: any) => {
                const data = resp.data;
                if (typeof data === 'string') {
                    const reg = new RegExp('USD');
                    let d = data?.slice(data.search(reg), data.search(reg) + 500)
                        ?.match(/\d+\,\d+/g)
                        ?.map((number: string) => +(number.replace(',', '.')));

                    if (d?.length === 2) {
                        buf['USDTRY'] = d[0].toString();
                        buf['TRYUSD'] = d[1].toString();
                    }

                    d = data?.slice(data.search(/EUR/g), data.search(/EUR/g) + 500)
                        ?.match(/\d+\,\d+/g)
                        ?.map((number: string) => +(number.replace(',', '.')));

                    if (d?.length === 2) {
                        buf['EURTRY'] = d[0].toString();
                    }

                } else if (data) {
                    buf[`rate${data[0].receivingCurrency.code}`] = data[0].exchangeRate;
                } else if (resp && !resp.error) {
                    buf[`${resp.from}${resp.to}`] = resp.rate;
                }
            });
        res.status(200).json(buf);
    } catch {
        const error = 'Invalid'
        res.status(404).json({ error })
    }
}

//check 'unknown' var
function isArrayCurrenciesRate(obj: unknown): boolean {
    return Array.isArray(obj) && obj.every(isCurrenciesRate);
}

function isCurrenciesRate(obj: unknown): boolean {
    return obj != null;
}