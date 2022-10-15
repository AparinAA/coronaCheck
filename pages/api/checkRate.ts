// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
import type { NextApiRequest, NextApiResponse } from 'next'
import excuteQuery from '../../lib/db';

export interface currenciesRate {
    [index: string]: string | undefined,
}

export default async function select(
        req: NextApiRequest,
        res: NextApiResponse<currenciesRate>
    ) {
        res.status(200).json({});
        /*
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
    
            res.status(200).json(buf);
        } catch {
            const error = 'Problem request';
            res.status(200).json({error});
        }
        */
}

//check 'unknown' var 
function isArrayCurrenciesRate (obj: unknown): boolean {
    return Array.isArray(obj) && obj.every(isCurrenciesRate);
}

function isCurrenciesRate (obj: unknown): boolean {
    return obj != null;
}