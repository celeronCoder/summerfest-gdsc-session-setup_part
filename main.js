const express = require("express");
const { router, prisma } = require("./todo");

const app = express();

app.use(express.json());

app.use("/todos", router);

app.get("/", function (req, res) {
  return res.send({ message: "Welcome to the todo API!" });
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
