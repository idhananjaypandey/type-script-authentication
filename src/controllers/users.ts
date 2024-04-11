import express from "express";

import { deleteUserById, getUserById, getUsers } from "../db/users";

export const getAllUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const users = await getUsers();
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const deleteUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.sendStatus(422); // 422 Unprocessable Entity
    }

    const deletedUser = await deleteUserById(id);
    return res.json(deletedUser);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500); // 500 Internal Server Error
  }
};


export const updateUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const { username } = req.body;

    if (!username || !id) {
      return res.sendStatus(422); // 422 Unprocessable Entity
    }

    const user = await getUserById(id);

    if (!user) {
      return res.sendStatus(404); // 404 Not Found
    }

    user.username = username;
    await user.save();
    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(500); // 500 Internal Server Error
  }
};
