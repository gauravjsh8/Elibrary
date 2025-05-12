import { app } from "./src/app";
import { configuration } from "./src/config/config";
import { connectDb } from "./src/config/db";

const startServer = async () => {
  await connectDb();
  //const port = process.env.PORT || 3000;
  const port = configuration.port || 3000;

  app.listen(port, () => {
    console.log(`Listening on Port ${port}`);
  });
};

startServer();
console.log("Welcome to eBook Apis");
