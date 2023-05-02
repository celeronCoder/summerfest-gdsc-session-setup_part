const express = require("express");
/** @type {import('@prisma/client').PrismaClient}*/
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.get("/", function (req, res) {
  return res.send({ message: "Welcome to the todo API!" });
});

// GET ALL TODOS
app.get("/todos", async (req, res) => {
  const todos = await prisma.todo.findMany({});
  return res.send(todos);
});

// CREATE A TODO
app.post("/todos/create", async (req, res) => {
  const { title, completed } = req.body;
  if (!title) {
    res.send({ message: "Title is required to create a todo" });
  } else {
    const todo = await prisma.todo.create({ data: { title, completed } });
    res.send(todo);
  }
});

// GET TODO BY ID
app.get("/todos/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  if (id) {
    const todo = await prisma.todo.findUnique({ where: { id } });
    if (todo) {
      return res.send(todo);
    } else return res.send({ message: "todo doesn't exist" });
  } else {
    return res.send({ message: "id param has to be a number" });
  }
});

app.put("/todos/:id", async (req, res) => {
  const { title, completed } = req.body;
  const id = parseInt(req.params.id);
  if (!id) {
    res.send({ message: "ID is required to update a todo" });
  } else {
    const todo = await prisma.todo.update({
      where: { id },
      data: { title, completed },
    });
    res.send(todo);
  }
});

app.delete("/todos/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  if (!id) {
    return res.send({ message: "ID is required to delete a todo" });
  } else {
    const todo = await prisma.todo.delete({ where: { id } });
    return res.send({ todo, message: "Todo Deleted Successfully!" });
  }
});

async function main() {
  app.listen(8000, () => console.log("The server started at port 8000"));
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
