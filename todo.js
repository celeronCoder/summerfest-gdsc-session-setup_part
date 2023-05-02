const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = require("express").Router();

// GET ALL TODOS
router.get("/", async (req, res) => {
  const todos = await prisma.todo.findMany({});
  return res.send(todos);
});

// CREATE A TODO
router.post("/", async (req, res) => {
  const { title, completed } = req.body;
  if (!title) {
    res.send({ message: "Title is required to create a todo" });
  } else {
    const todo = await prisma.todo.create({ data: { title, completed } });
    res.send(todo);
  }
});

// GET TODO BY ID
router.get("/:id", async (req, res) => {
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

router.put("/:id", async (req, res) => {
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

router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  if (!id) {
    return res.send({ message: "ID is required to delete a todo" });
  } else {
    const todo = await prisma.todo.delete({ where: { id } });
    return res.send({ todo, message: "Todo Deleted Successfully!" });
  }
});

module.exports = {
  router,
  prisma,
};
