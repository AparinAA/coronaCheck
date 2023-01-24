// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { checkKoronaAPI } from '../../lib/helper';

export interface currenciesRate {
    [index: string]: string | undefined,
}

//API is downloading rate RUB-USD|TRY|KZT|EUR from KoronaPay
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<currenciesRate>
) {

    if (req.method?.toUpperCase() === "GET") {
        //default receiving TUR and rate - RUB-USD
        const { id = "840", name = "TUR" } = req.query;

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

        const params = { ...paramsGeneral, "receivingCurrencyId": "" + id, "receivingCountryId": "" + name };
        const url = 'https://koronapay.com/transfers/online/api/transfers/tariffs';
        const resp = await checkKoronaAPI({ url, params });

        if (resp.error) {
            const error = resp.error as string;
            res.status(400).json({ error });
        } else {
            res.status(200).json(resp.data);
        }
    } else {
        const error = "Just GET request";
        res.status(400).json({ error })
    }
}