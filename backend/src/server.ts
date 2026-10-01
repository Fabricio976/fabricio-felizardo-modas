import { AppDataSource } from "./config/data-source";
import { app } from "./app";

AppDataSource.initialize()
  .then(() => {
    console.log("Banco de dados conectado!");
    
    app.listen(3000, () => {
      console.log("Server rodando na porta 3000");
    });
  })
  .catch((error) => console.log(error));