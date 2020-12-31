import app from "./app";

app.listen(app.get("port"), () => {
  console.log("server on ", app.get("port"));
});