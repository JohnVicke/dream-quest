import { createServer } from "./create-server";

const PORT = 3000 || process.env.PORT;

const server = createServer();

server.listen(PORT, () => {
  console.log(`\n\n🚀 Server is running on port ${PORT}!\n\n`);
});
