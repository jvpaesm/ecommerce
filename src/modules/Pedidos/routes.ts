import {Router} from "express";
import Auth from "../../middlewares/authToken";
import PedidoController from "./pedido.controller";
import PedidoValidation from "./validations";

const pedidosRoutes = Router();


pedidosRoutes.get("/pedidos",Auth.verifyAdmin, PedidoController.getAll);
pedidosRoutes.get("/pedidos/:id",Auth.verifyUser,PedidoValidation.getOne,PedidoController.getOne);
pedidosRoutes.post("/pedidos",Auth.verifyUser,PedidoValidation.create, PedidoController.create);
pedidosRoutes.put("/pedidos/:id",Auth.verifyAdmin,PedidoValidation.update,PedidoController.update);

export default pedidosRoutes;