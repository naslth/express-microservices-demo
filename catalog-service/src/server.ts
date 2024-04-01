import expressApp from "./expressApp";
const port = process.env.PORT || 8000;
export const StartServer = async () => {
  expressApp.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
  process.on("unCaughtException", (error) => {
    console.log(`[server]: Uncaught Exception ${error}`);
    process.exit(1);
  });
};

StartServer().then(() => {
  console.log("Server Started");
});
