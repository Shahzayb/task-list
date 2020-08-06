import getAuthUser from '../../../utils/getAuthUser';
import prisma from '../../../prisma';
import validator from 'validator';

export default async (req, res) => {
  if (req.method === 'POST') {
    const user = await getAuthUser(req);
    if (!user) {
      return res.status(401).end();
    }

    const todoItem = await prisma.todo_item.create({
      data: {
        description: req.body.description,
        user: {
          connect: {
            id: user.id,
          },
        },
        due_date: req.body.due_date ? new Date(req.body.due_date) : undefined,
        reminder_time: req.body.reminder_time
          ? new Date(req.body.reminder_time)
          : undefined,
        shared_with: validator.isInt(req.body.shared_with)
          ? validator.toInt(req.body.shared_with)
          : undefined,
        category: validator.isInt(req.body.shared_with) ? 'shared' : undefined,
      },
    });

    return res.json(todoItem);
  } else {
    return res.status(404).end();
  }
};
