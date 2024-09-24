const router = require('express').Router();
const {
  findByEmail,
  Users,
  findById,
  register,
  updateEntries,
  signin,
} = require('./users.model');

router.get('/', (req, res) => {
  res.json(Users);
});

router.post('/signin', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json('Incorrect form submission');
  const { result, status } = signin(email, password);
  return res.status(status).json(result);
});

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.json('Incorrect form submission');
  const user = await register(name, email, password);
  if (user === 'User already exists') return res.status(400).json(user);
  res.json(user);
});

router.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  if (!id) return res.json('please provide an id');
  const user = findById(Number(id));
  res.json(user);
});

router.put('/image', (req, res) => {
  const { id } = req.body;
  if (!id) return res.json('please provide an id');
  const result = updateEntries(Number(id));
  res.json(result);
});

module.exports = router;
