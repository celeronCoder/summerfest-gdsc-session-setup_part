const express = require("express");
const { router, prisma } = require("./todo");
const apiSpec = require("./api.json");

const app = express();

app.use(express.json());

app.use("/todos", router);

app.get("/", (_req, res) => {
  return res.send({ message: "Welcome to the todo API!" });
});

app.get("/api", (_req, res) => {
  return res.send(apiSpec);
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
