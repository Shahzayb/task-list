import getAuthUser from '../../../utils/getAuthUser';
import prisma from '../../../prisma';

export default async (req, res) => {
  if (req.method === 'GET') {
    const user = await getAuthUser(req);
    if (!user) {
      return res.status(401).end();
    }

    const todoItems = await prisma.todo_item.findMany({
      where: {
        user: {
          id: user.id,
        },
        category: 'shared',
      },
      include: {
        user: true,
      },
    });

    return res.json(todoItems);
  } else {
    return res.status(404).end();
  }
};
