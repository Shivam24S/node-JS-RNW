const users = [];

const addUser = ({ id, username, room }) => {
  username = username.trim().toLowerCase();

  room = room.trim().toLowerCase();

  if (!username || !room) {
    return {
      error: "username and room data is required",
    };
  }

  //   existing user

  const existingUser = users.find(
    (user) => user.username === username && user.room === room
  );

  if (existingUser) {
    return {
      error: "user already exist with this id",
    };
  }

  const user = { id, username, room };

  users.push(user);

  return { user };
};

const getUser = (id) => {
  const user = users.find((user) => user.id === id);

  return user;
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

const getUserInChatRoom = (room) => {
  const userList = users.filter((user) => user.room === room);
  return userList;
};

export { addUser, getUser, removeUser, getUserInChatRoom };
