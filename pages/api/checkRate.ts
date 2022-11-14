// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import excuteQuery from '../../lib/db';
import axios from 'axios';

export interface currenciesRate {
    [index: string]: string | undefined,
}

export default async function select(
        req: NextApiRequest,
        res: NextApiResponse<currenciesRate>
    ) {

        try {
            

            const result: unknown = await excuteQuery({
                query: `SELECT * FROM rates`,
                values: [],
            });
    
            if (!isArrayCurrenciesRate(result)) {
                const error = 'Received malformed products API response';
                res.status(500).json({error});
            }
            
            const buf: currenciesRate = {};
            (result as currenciesRate[]).forEach( (item: currenciesRate) => {
                if (item?.pairCurrency) {
                    buf[item.pairCurrency] = item?.rate;
                }
            })

            
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

            const paramsUSD = {...paramsGeneral, 'receivingCurrencyId': '840'};
            const paramsTRY = {...paramsGeneral, 'receivingCurrencyId': '949'};
            const paramsEUR = {...paramsGeneral, 'receivingCurrencyId': '978'};
            const paramsKZT = {...paramsGeneral, 'receivingCurrencyId': '398', 'receivingCountryId': 'KAZ'};


            (await Promise.all([
                axios.get('https://koronapay.com/transfers/online/api/transfers/tariffs', { params: paramsUSD }),
                axios.get('https://koronapay.com/transfers/online/api/transfers/tariffs', { params: paramsTRY }),
                axios.get('https://koronapay.com/transfers/online/api/transfers/tariffs', { params: paramsEUR }),
                axios.get('https://koronapay.com/transfers/online/api/transfers/tariffs', { params: paramsKZT })
            ]))
            .forEach( (resp: any) => {
                const data = resp.data[0];
                buf[`rate${data.receivingCurrency.code}`] = data.exchangeRate;
            });

            res.status(200).json(buf);
        } catch {
            const error = 'Invalid'
            res.status(404).json({error})
        }
}

//check 'unknown' var 
function isArrayCurrenciesRate (obj: unknown): boolean {
    return Array.isArray(obj) && obj.every(isCurrenciesRate);
}

function isCurrenciesRate (obj: unknown): boolean {
    return obj != null;
}