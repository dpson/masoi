const express = require('express');
const db = require('./config/db');
const cors = require('cors');

const app = express();

const { PORT = 3002, LOCAL_ADDRESS = '0.0.0.0' } = process.env

app.use(cors());
app.use(express.json());

// Route to get all posts
app.get("/api/roles/get", (req, res) => {

	db.query("SELECT * FROM Turns ORDER BY ID DESC LIMIT 1", (err, result) => {
		if (err) {
			throw (err);
		}
		res.json({ roles: result[0].roles });
	});
});


app.post("/api/roles/create", (req, res) => {
	var roles = req.body.roles;
	roles = roles.replace(
		/[&"'<>]/g,
		(char) => ({
			"&": '&amp;',
			"\"": '&quot;',
			"'": '&#39;',
			"<": '&lt;',
			">": '&gt;',
		})[char]
	);

	roles = roles.split(",");
	if (!roles.length) {
		throw {
			"code": 0,
			"message": "error"
		}
	};

	var real_roles = [];
	for (let i = 0; i < roles.length; i++) {
		real_roles.push({
			"name": roles[i],
			"player": null,
			"gain": 0
		})
	}

	db.query("INSERT INTO Turns (roles, name) VALUES (" + "'" + JSON.stringify(real_roles) + "'" + ", 'Random game')", (err, result) => {
		if (err) {
			throw err;
		}
		res.send(result)
	});
});


// Route for creating the post
app.post('/api/role/get', (req, res) => {
	let player_name = req.body.name;
	if (!player_name) {

		res.status(500);
		res.json({ empty_result: 1 });
	}

	player_name = player_name.replace(
		/[&"'<>]/g,
		(char) => ({
			"&": '&amp;',
			"\"": '&quot;',
			"'": '&#39;',
			"<": '&lt;',
			">": '&gt;',
		})[char]
	)

	db.query("SELECT * FROM Turns ORDER BY ID DESC LIMIT 1", (err, result) => {
		if (err) {
			throw err;
		}

		if (result.length) {
			let roles = JSON.parse(result[0].roles);

			let has_roles = false;
			let my_role = null;
			let rd_array = [];
			for (let i = 0; i < roles.length; i++) {
				roles[i]["index"] = i;
				if (!roles[i].gain) {
					rd_array.push(roles[i]);
				}

				if (roles[i].player == player_name) {
					has_roles = true;
					my_role = roles[i].name
					break;
				}
			}

			if (has_roles) {
				res.status(200);
				return res.json({ my_role: my_role, empty_result: 0 });
			}


			if (!rd_array.length) {
				res.status(200);
				return res.json({ my_role: null, empty_result: 1 });
			}

			var rd_number = Math.floor(Math.random() * rd_array.length);
			console.log("rd number " + rd_number);


			if (roles[rd_array[rd_number].index]) {
				roles[rd_array[rd_number].index].gain = 1;
				roles[rd_array[rd_number].index].player = player_name;
				my_role = roles[rd_array[rd_number].index].name;

				db.query("UPDATE Turns SET roles=" + "'" + JSON.stringify(roles) + "'" + " WHERE id=" + result[0].id, (err, result) => {
					if (err) {
						throw err;
					}
				});

				res.status(200);
				return res.json({ my_role: my_role, empty_result: 0 });
			}

		}
	})
})

app.listen(PORT, LOCAL_ADDRESS, () => {
	const address = server.address();
	console.log('server listening at', address);
})