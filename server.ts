import { app } from "./app";

const startServer = () => {
  const port = process.env.PORT || 3000;

  app.listen(port, () => {
    console.log(`Listening on Port ${port}`);
  });
};

startServer();
console.log("Welcome to eBook Apis");
