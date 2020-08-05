import prisma from '../../../prisma/index';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export default async (req, res) => {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    const user = await prisma.user.findOne({
      where: {
        username,
      },
    });

    if (!user) {
      return res.status(401).send('invalid username or password');
    }

    const isEqual = await bcrypt.compare(password, user.password);

    if (!isEqual) {
      res.status(401).send('invalid username or password');
    }

    const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET);

    res.json({
      user: {
        id: user.id,
        username: user.username,
      },
      token,
    });
  } else {
    return res.status(404).end();
  }
};
