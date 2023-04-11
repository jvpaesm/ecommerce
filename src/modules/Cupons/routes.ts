import {Router} from "express";
import CupomController from "./cupom.controller";
import Auth from "../../middlewares/authToken";
import CupomValidation from "./validations";

const cuponsRoutes = Router();


cuponsRoutes.get("/cupons",Auth.verifyAdmin ,CupomController.getAll);
cuponsRoutes.get("/cupons/:id",Auth.verifyAdmin,CupomValidation.getOne,CupomController.getOne);
cuponsRoutes.post("/cupons", Auth.verifyAdmin,CupomValidation.create, CupomController.create);
cuponsRoutes.put("/cupons/:id",Auth.verifyAdmin,CupomValidation.update,CupomController.update);

export default cuponsRoutes;