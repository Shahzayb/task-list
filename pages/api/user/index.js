const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
import validator from 'validator';
import prisma from '../../../prisma/index';
import getAuthUser from '../../../utils/getAuthUser';

export default async (req, res) => {
  //   create user
  if (req.method === 'POST') {
    const errors = [];
    const username = req.body.username && req.body.username.trim();
    const password = req.body.password;
    let hashPassword = null;

    // validate username
    if (!username) {
      errors.push({
        param: 'username',
        msg: 'username is required',
      });
    }
    // check if username is not email
    else if (validator.isEmail(username)) {
      errors.push({
        param: 'username',
        msg: 'username cannot be an email address',
      });
    }
    // check if username does not contains any spaces ^[0-9a-zA-Z]*$
    else if (!validator.isAlphanumeric(username)) {
      errors.push({
        param: 'username',
        msg: 'username can only be alpha numeric',
      });
    }
    // check if username is unique
    else {
      const count = await prisma.user.count({
        where: {
          username: username,
        },
      });

      if (count !== 0) {
        errors.push({
          param: 'username',
          msg: 'username is already taken',
        });
      }
    }
    // validate password
    if (!password) {
      errors.push({
        param: 'password',
        msg: 'password is required',
      });
    } else if (password.length < 8) {
      errors.push({
        param: 'password',
        msg: 'password is too short. should be at least 8 character',
      });
    } else {
      // hash the password
      hashPassword = await bcrypt.hash(password, 8);
    }

    if (errors.length !== 0) {
      return res.status(422).json({ errors });
    }

    //  create user
    const user = await prisma.user.create({
      data: {
        username,
        password: hashPassword,
        todo_item: {
          create: {
            description: 'My first item',
          },
        },
      },
      select: {
        id: true,
        username: true,
      },
    });

    // create token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

    return res.status(201).json({ user, token });
  }
  //   get all users
  else if (req.method === 'GET') {
    const user = await getAuthUser(req);
    if (!user) {
      return res.status(401).end();
    }
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
      },
      where: {
        id: {
          not: user.id,
        },
      },
    });

    return res.status(200).json(users);
  } else {
    return res.status(404).end();
  }
};
