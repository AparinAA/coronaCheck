import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export interface currenciesRate {
    [index: string]: string | undefined,
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<currenciesRate>
) {

    try {
        if (req.method?.toUpperCase() === "GET") {
            const buf: currenciesRate = {};
            const response = await axios.get('https://www.tolunaylar.com.tr');
            const data = response.data;
            const reg = new RegExp('USD');
            let d = data.slice(data.search(reg), data.search(reg) + 500)
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
            res.status(200).json(buf);
        } else {
            throw Error("Just GET request");
        }
    } catch (error) {
        res.status(400).json({ error } as currenciesRate);
    }
}