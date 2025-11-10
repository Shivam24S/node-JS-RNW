const users = [];

const addUser = ({ id, username, room }) => {
  username = username.trim().toLowerCase();

  room = username.trim().toLowerCase();

  if (!username || !room) {
    return alert("username and room data is required");
  }

  //   existing user

  const existingUser = users.find(
    (user) => user.username === username && user.room === room
  );

  if (existingUser) {
    return alert("user already exist with this id");
  }

  const user = { id, username, room };

  users.push(user);

  return { users };
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
