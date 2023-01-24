import type { NextApiRequest, NextApiResponse } from 'next';

import { fetchRateP2PBinance } from '../../lib/helper';

interface currenciesRate {
    [index: string]: string | undefined,
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<currenciesRate>,
) {

    try {
        if (req.method?.toUpperCase() === 'GET') {
            const { type } = req.query;

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

            const responseBuy = await fetchRateP2PBinance(dataBUYtoP2PBinance);

            const responseSell = await fetchRateP2PBinance(dataSELLtoP2PBinance);

            const buf: any = {};
            if (responseBuy?.type && responseSell?.type) {
                if (type === 'buy') {
                    buf[`${responseBuy.from}${responseBuy.to}`] = responseBuy.rate;
                } else if (type === 'sell') {
                    buf[`${responseSell.from}${responseSell.to}`] = responseSell.rate;
                } else {
                    buf[`${responseBuy.from}${responseBuy.to}`] = responseBuy.rate;
                    buf[`${responseSell.from}${responseSell.to}`] = responseSell.rate;
                }
            } else {
                throw Error("Unknown error");
            }

            res.status(200).json(buf)
        } else {
            throw Error("Just GET request");
        }
    } catch (error) {
        res.status(400).json({ error } as currenciesRate);
    }
}