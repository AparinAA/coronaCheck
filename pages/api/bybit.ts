import type { NextApiRequest, NextApiResponse } from "next";

interface currenciesRate {
    [index: string]: string | undefined;
}

type reponseBybit = {
    ret_code: number;
    ret_msg: string;
    result: {
        count: number;
        items: {
            [index: string]: string;
        }[];
    };
    ext_code: string;
    ext_info: any;
    time_now: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<currenciesRate>
) {
    try {
        if (req.method?.toUpperCase() === "GET") {
            const { type } = req.query;

            const dataBUYtoP2PBybit = {
                userId: "",
                tokenId: "USDT",
                currencyId: "RUB",
                payment: ["581"],
                side: "1",
                size: "10",
                page: "1",
                amount: "",
                authMaker: false,
                canTrade: false,
            };

            const dataSELLtoP2PBybit = {
                userId: "",
                tokenId: "USDT",
                currencyId: "TRY",
                payment: ["114"],
                side: "0",
                size: "10",
                page: "1",
                amount: "",
                authMaker: false,
                canTrade: false,
            };

            const responseBuy = await fetch(
                "https://api2.bybit.com/fiat/otc/item/online",
                {
                    method: "POST",
                    body: JSON.stringify(dataBUYtoP2PBybit),
                }
            );

            const responseSell = await fetch(
                "https://api2.bybit.com/fiat/otc/item/online",
                {
                    method: "POST",
                    body: JSON.stringify(dataSELLtoP2PBybit),
                }
            );

            if (!responseBuy.ok || !responseSell.ok) {
                throw Error("404. Not found");
            }

            const RUBUSDT =
                (await responseBuy.json())?.result?.items?.[0]?.price ?? "";
            const USDTTRY =
                (await responseSell.json())?.result?.items?.[0]?.price ?? "";

            let buf: any = {};
            if (responseBuy && responseSell) {
                if (type === "buy") {
                    buf = { ...buf, RUBUSDT };
                } else if (type === "sell") {
                    buf = { ...buf, USDTTRY };
                } else {
                    buf = { ...buf, RUBUSDT, USDTTRY };
                }
            } else {
                throw Error("Unknown error");
            }

            res.status(200).json(buf);
        } else {
            throw Error("Just GET request");
        }
    } catch (error) {
        res.status(400).json({ error } as currenciesRate);
    }
}
