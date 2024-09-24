const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0//P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

const Users = [
  {
    id: 101,
    name: 'John Doe',
    email: 'john@gmail.com',
    password: '123456',
    entries: 0,
    joined: new Date(),
  },
  {
    id: 102,
    name: 'Sally Doe',
    email: 'sally@gmail.com',
    password: '123456',
    entries: 0,
    joined: new Date(),
  },
];

function findByEmail(email) {
  return Users.find((user) => user.email === email);
}

function findById(id) {
  return Users.find((user) => user.id === id);
}

async function register(name, email, password) {
  const user = findByEmail(email);
  if (user) return 'User already exists';
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = {
    id: Users.length + 101,
    name,
    email,
    password: hashedPassword,
    entries: 0,
    joined: new Date(),
  };
  Users.push(newUser);
  return newUser;
}

function updateEntries(id) {
  const user = findById(id);
  if (!user) return 'User not found';
  user.entries++;
  return user;
}

function signin(email, password) {
  const user = findByEmail(email);
  if (!user) return { result: 'User not found', status: 404 };
  const result = bcrypt.compare(password, user.password);
  if (!result) return { result: 'Wrong credentials', status: 400 };
  return { result: user, status: 200 };
}

module.exports = {
  Users,
  findByEmail,
  findById,
  register,
  updateEntries,
  signin,
};
