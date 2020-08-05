import getAuthUser from '../../../utils/getAuthUser';

export default async (req, res) => {
  if (req.method === 'GET') {
    const user = await getAuthUser(req);
    if (!user) {
      return res.status(401).end();
    }

    return res.json(user);
  } else {
    return res.status(404).end();
  }
};
