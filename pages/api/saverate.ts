// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import excuteQuery from '../../lib/db';

export interface currenciesRate {
    [index: string]: string | undefined,
}

export default async function select(
        req: NextApiRequest,
        res: NextApiResponse<currenciesRate>
    ) {

        if (req?.method?.toUpperCase() === 'POST') {
            const body = req?.body?.data ?? {};
            const listCurrencies = ['USDTRY', 'TRYUSD', 'KZTTRY', 'KZTUSD', 'percentage', 'rateUSD', 'rateTRY', 'rateEUR', 'rateKZT'];
            const values = listCurrencies.map( (cur: string) => {
                return [body[cur], cur];
            })
            
            try {
                const result: unknown = await excuteQuery({
                    query: `INSERT INTO rates (rate, pairCurrency) VALUES ? ON DUPLICATE KEY UPDATE rate=VALUES(rate)`,
                    values: [values],
                });
        
                res.status(200).json({'message': 'insert ok'});

            } catch {
                const error = 'Invalid'
                res.status(404).json({error})
            }
        }
        
        
}

//check 'unknown' var 
function isArrayCurrenciesRate (obj: unknown): boolean {
    return Array.isArray(obj) && obj.every(isCurrenciesRate);
}

function isCurrenciesRate (obj: unknown): boolean {
    return obj != null;
}