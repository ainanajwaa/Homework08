const MongoClient = require("mongodb").MongoClient;
const User = require("./user");

MongoClient.connect(
	// TODO: Connection
	"mongodb+srv://m001-student:m001-mongodb-basics@sandbox.bitzd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
	{ useNewUrlParser: true },
).catch(err => {
	console.error(err.stack)
	process.exit(1)
}).then(async client => {
	console.log('Connected to MongoDB');
	User.injectDB(client);
})

const express = require('express')
const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
	res.send('Hello World')
})

app.get('/hello', (req, res) => {
	res.send('Hello BENR2423')
})

app.post('/login', async (req, res) => {
	console.log(req.body);

	const user = await User.login(req.body.username, req.body.password);
	if (user != false){
		console.log("Login successful");
		res.status(200).json({
			message: "Login successful",
		})
	}
	else{
		console.log("Error occured. Login failed")
		res.status(401).json({
			message: "Invalid username or password"
		})
	}
})

app.post('/register', async (req, res) => {
	console.log(req.body);

	const user = await User.register(req.body.username, req.body.password);	
	if (user != null){
		console.log("Register successful");
		res.status(200).json({
			message: "Registration success"
		})
	}
	else{
		console.log("Register failed")
		res.status(401).json({
			message: "Username you entered already exists."
		})
	}
})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})