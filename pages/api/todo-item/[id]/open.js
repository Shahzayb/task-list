import prisma from '../../../../prisma';
import getAuthUser from '../../../../utils/getAuthUser';
import validator from 'validator';

export default async (req, res) => {
  const {
    query: { id },
  } = req;

  if (req.method === 'POST') {
    const user = await getAuthUser(req);
    if (!user) {
      return res.status(401).end();
    }

    // you can change status of your own item/shared item
    const count = await prisma.todo_item.count({
      where: {
        id: validator.toInt(id),
        OR: [
          {
            user: {
              id: user.id,
            },
          },
          {
            shared_with: user.id,
          },
        ],
      },
    });

    if (count === 0) {
      return res.status(403).end();
    }

    await prisma.todo_item.update({
      where: {
        id: validator.toInt(id),
      },
      data: {
        status: 'open',
      },
    });

    return res.end();
  } else {
    return res.status(404).end();
  }
};
