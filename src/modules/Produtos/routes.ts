import {Router} from "express";
import ProdutoController from "./produto.controller";
import ProdutoValidation from "./validations";
import Auth from "../../middlewares/authToken";
import VerifyUser from "../../middlewares/authUserType";

const produtoRoutes = Router();


produtoRoutes.get("/produtos", ProdutoController.getAll);
produtoRoutes.get("/produtos/:id",VerifyUser.verifyUser,ProdutoValidation.getOne,ProdutoController.getOne);
produtoRoutes.post("/produtos",VerifyUser.verifyUser,ProdutoValidation.create, ProdutoController.create);
produtoRoutes.put("/produtos/:id",VerifyUser.verifyUser,ProdutoValidation.update,ProdutoController.update);

export default produtoRoutes;