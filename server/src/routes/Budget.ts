import { Router } from "express";
import {
  budgetAdd,
  budgetDelete,
  budgetUpdate,
  budgetGet,
} from "../controllers/Budget";
import { auth } from "../middlewares/auth";

const budgetRouter = Router();

budgetRouter.get("/all", budgetGet);
budgetRouter.post("/add", budgetAdd);
budgetRouter.delete("/delete/:id", budgetDelete);
budgetRouter.put("/update/:id", budgetUpdate);

export default budgetRouter;
