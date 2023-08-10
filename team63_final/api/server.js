const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcryptjs');
const messages = [];


const app = express();

app.use(express.static(path.join(__dirname, 'client')));
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/react-todo', {
	useNewUrlParser: true,
	useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB")).catch(console.error);

// Models
const Todo = require('./models/Todo');
const User = require('./models/User');
const Message = mongoose.model('Message', new mongoose.Schema({
	message: String,
  }));


app.get('/messages', async (req, res) => {
	try {
	  const messages = await Message.find();
	  res.json(messages);
	} catch (error) {
	  console.error('Error fetching messages:', error);
	  res.status(500).json({ message: 'Internal server error' });
	}
  });
  
  app.post('/messages', async (req, res) => {
	const { message } = req.body;
	try {
	  const newMessage = new Message({ message });
	  await newMessage.save();
	  res.json({ success: true });
	} catch (error) {
	  console.error('Error saving message:', error);
	  res.status(500).json({ message: 'Internal server error' });
	}
  });


// User Registration
app.post('/register', async (req, res) => {
	const { username, password } = req.body;
	try {
		// Check if the user already exists
		const existingUser = await User.findOne({ username });
		if (existingUser) {
			return res.status(400).json({ message: 'Username already exists' });
		}

		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create a new user
		const newUser = new User({ username, password: hashedPassword });
		await newUser.save();

		res.status(200).json({ message: 'Registration successful' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Internal server error' });
	}
});

// User Login
app.post('/login', async (req, res) => {
	const { username, password } = req.body;
	try {
		// Find the user
		const user = await User.findOne({ username });
		if (!user) {
			return res.status(400).json({ message: 'Invalid username or password' });
		}

		// Compare passwords
		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return res.status(400).json({ message: 'Invalid username or password' });
		}

		res.status(200).json({ message: 'Login successful' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Internal server error' });
	}
});


app.get('/todos', async (req, res) => {
	const todos = await Todo.find();

	res.json(todos);
});

app.post('/todo/new', (req, res) => {
	const todo = new Todo({
		text: req.body.text
	})

	todo.save();

	res.json(todo);
});

app.delete('/todo/delete/:id', async (req, res) => {
	const result = await Todo.findByIdAndDelete(req.params.id);

	res.json({ result });
});

app.get('/todo/complete/:id', async (req, res) => {
	try {
	  const todo = await Todo.findById(req.params.id);
  
	  if (!todo) {
		return res.status(404).json({ message: 'Todo not found' });
	  }
  
	  todo.complete = !todo.complete;
  
	  await todo.save();
  
	  res.json(todo);
	} catch (error) {
	  console.error(error);
	  res.status(500).json({ message: 'Internal server error' });
	}
  });
  

app.put('/todo/update/:id', async (req, res) => {
	const todo = await Todo.findById(req.params.id);

	todo.text = req.body.text;

	todo.save();

	res.json(todo);
});

app.listen(3001);