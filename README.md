## Setup

To setup the express application on the backend, here’s what you want:

### Installing Tools

---

- NodeJS
  Install Nodejs from the [official website](https://nodejs.org). After you’re done installing validate the installation by the following command:
  ```bash
  node -v
  // and
  npm -v
  ```
  These should output some version no. like 1.0.0 or something similar

## Creating the project

### Initialize the project

---

So everything in a node is a package or it has to be to install or use other available package (other than the default ones). So we first have to initialize our project folder as package.

```bash
// creating the folder
mkdir nodejs-express
// initializing the project
npm init -y
```

> 💡 We added a `-y` flag in there to avoid all those questions and edit the config in the editor.

Now that you’ve created a folder and initialized it let’s open it in your favorite code-editor.

### Installing Packages

---

So we’re going to install the most essential package i.e. `express` required in the project, we may need more as we’re developing the application but these are like the bare bones one so we’re going to install them in the start.

```bash
cd nodejs-express
npm install express
```

### Creating the basic API

---

- Create a new file in the folder called `main.js`, you can call it anything you want, just don’t go crazy with names!
- Paste the following code in the file:

  ```jsx
  const express = require("express");

  const app = express();

  app.get("/", function (req, res) {
    return res.send({ message: "Hello World!!!!!!!!!!" });
  });

  app.listen(8000, () => console.log("The server started at port 8000"));
  ```

- Here’s the explanation for the above code
  - In the first line, we `require` the project into the file, so that we can use it. We do this by using the built in `require` function and passing in the name of the package, i.e. `express` in this case. We store the result of the function that’s the `express object`in a constant named `express` for simplicity.
  - Then we create an instance of the express application by calling the `express()`function and storing that in the `app` variable.
  - Now, that we have our app crated, we need to create some routes to send some data to the user when called. So we define this `app.get()`function which corelates to the `GET` http request. We pass in two arguments, first is the route, i.e. `“/”` the root route, and then we pass in a function to handle that request.
  - The function has two arguments that has to be given to it, `req` and `res`. They are the Request and Response objects respectively.
  - Then, inside the function body we return `res.send()`which sends some data to the user. It can be anything, a string, an object, or a static file.
  - Now at the end, we make the app listen to a specific port, i.e. `8000` and also pass a callback function to indicate that the app is listening.

### Running the App

---

Now we can run the application as:

```bash
node ./main.js
```

Or we can write a script for it in the `package.json` file and run it like `npm run start`

```json
// package.json
{
	...
	scripts: {
		start: "node ./main.js"
	}
	...
}
```

### Adding `nodemon`

---

You may have noticed that the current setup is not much developer friendly, every time you change something in the application, you have to rerun the `start` command to reflect those changes.

This is very tiring so what we can do is use a package like `nodemon` that watches the files in the project and rerun the server for us every time the files change.

So here’s how you install

```bash
npm install nodemon --save-dev
```

> 💡 We added the `--save-dev` flag in the above install command to save the package as a developer dependency. `nodemon` is a developer dependency because we only need it while developing the project, once the application is deployed I think we’re not going to use it.

> And saving it as a developer dependency, it won’t get installed in the deployment process which will speed up the installation.

and you can create a sperate script for running it in development as

```json
// package.json
{
	...
	scripts: {
		"start": "node ./main.js",
		"dev": "nodemon ./main.js",
	}
	...
}
```
