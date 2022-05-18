const bcrypt = require("bcrypt");
let db;

class User {
	static async injectDB(conn) {
		db = await conn.db("Week08").collection("users")
	}

	static async register(username, password) {
		// TODO: Check if username exists
		let find = await db.find({ username: username }).toArray()
		    if (find.length > 0) {
			    const message = "User can login now "
			    return null
		    } else {
            // TODO: Hash password
                let Hashpass = await bcrypt.hash(password, 10);
                password = Hashpass;
            
            // TODO: Save user to database
                await db.insertOne({ username: username, password: password });   
                
		}
        return await db.find({ username: username }).toArray();
		
	}

	static async login(username, password) {
		// TODO: Check if username exists
		let find = await db.find({ username: username }).toArray();
			if (find.length == 0) {
				return false
			}

		// TODO: Validate password
		let pass = await bcrypt.compare(password, find[0].password);

		// TODO: Return user object
		if (pass) {
			return pass
		} else {
			return false
        }
	}
}

module.exports = User;