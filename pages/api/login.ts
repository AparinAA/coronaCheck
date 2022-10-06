// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    name: string
    user?: any
}

export default withApiAuthRequired(
    async function myApiRoute(
        req: NextApiRequest,
        res: NextApiResponse<Data>
    ) {
    const data = getSession(req, res);
    const [auth, id] = data?.user?.sub?.split('|');
    const admin = id === '63341415c7df7dab21de2b2b';
    const {...user} = data?.user;
    user['admin'] = admin;
    
    console.info(user);
    
    res.json({ name: 'user', user });
  });
