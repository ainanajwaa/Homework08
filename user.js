const bcrypt = require("bcrypt");
let users;

class User {
	static async injectDB(conn) {
		users = await conn.db("my-database-name").collection("users")
	}

	static async register(username, password, phone) {
		// TODO: Check if username exists
		let usersearch = await users.find({ username: username }).toArray()
		    if (usersearch.length > 0) {
			    const message = "User can login now "
			    return
		    } else {
		
		// TODO: Hash password
		    let Hashpass = await bcrypt.hash(userData.password, 15);
		    userData.password = Hashpass;
		
		// TODO: Save user to database
		    await users.insertOne({ username: username, password: password });
		}
		return users.find({ username: username }).toArray();
	}

	static async login(username, password) {
		// TODO: Check if username exists
		let search = await users.find({ username: username }).toArray();
			if (search.length == 0) {
				return
			}

		// TODO: Validate password
		let key = await bcrypt.compare(password, search[0].password)

		// TODO: Return user object
		if (key) {
			return search
		} else {
			return {
				key: false
			};
		}
	}
}

module.exports = User;