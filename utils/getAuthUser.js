import jwt from 'jsonwebtoken';
import prisma from '../prisma/index';

const getAuthUser = async (req) => {
  const token = req.headers['authorization'].replace('Bearer ', '');

  const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);

  const user = await prisma.user.findOne({
    where: {
      id: verifiedToken.id,
    },
    select: {
      id: true,
      username: true,
    },
  });

  return user;
};

export default getAuthUser;
