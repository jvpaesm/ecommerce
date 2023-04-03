import {Router} from "express";
import CategoriaController from "./categoria.controller";
import Auth from "../../middlewares/authToken";
import VerifyUser from "../../middlewares/authUserType";
import CategoriaValidation from "./validations";

const categoriaRoutes = Router();


categoriaRoutes.get("/categorias", CategoriaController.getAll);
categoriaRoutes.get("/categorias/:id",VerifyUser.verifyUser,CategoriaValidation.getOne,CategoriaController.getOne);
categoriaRoutes.post("/categorias", VerifyUser.verifyUser,CategoriaValidation.create, CategoriaController.create);
categoriaRoutes.put("/categorias/:id",VerifyUser.verifyUser,CategoriaValidation.update,CategoriaController.update);

export default categoriaRoutes;