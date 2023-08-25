import { Response, Request, NextFunction } from "express";
import BudgetModel, { IBudget } from "../models/Budget";
import { auth } from "../middlewares/auth";
import mongoose from "mongoose";

interface ReqUser {
  id: string;
}

interface CustomRequest extends Request {
  token?: ReqUser;
}

export const budgetGet = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  BudgetModel.find({ user: (req.token as ReqUser).id })
    .then((docs) => {
      res.status(200).json({
        success: true,
        budget_list: docs,
      });
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(400).send("Bad request: Invalid data");
      } else {
        res.status(500).send("Internal server error");
      }
      next(error);
    });
};

export const budgetAdd = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const budgetData = {
    _id: new mongoose.Types.ObjectId(),
    transaction_name: req.body.transaction_name,
    transaction_date: new Date(req.body.transaction_date),
    price: req.body.price,
    user: (req.token as ReqUser).id,
  };
  BudgetModel.create(budgetData)
    .then(() => {
      res.status(201).json({ success: true });
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(400).send("Bad request: Invalid data");
      } else {
        res.status(500).send("Internal server error");
      }
      next(error);
    });
};

export const budgetDelete = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const budgetId = req.params.id; // Assuming the route has a parameter named budgetId

  BudgetModel.findByIdAndRemove(budgetId)
    .then((deletedBudget) => {
      if (!deletedBudget) {
        return res.status(404).json({ message: "Budget not found" });
      }
      res
        .status(200)
        .json({ success: true, message: "Budget deleted successfully" });
    })
    .catch((error) => {
      res.status(500).send("Internal server error");
      next(error);
    });
};

export const budgetUpdate = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const budgetId = req.params.id; // Assuming the route has a parameter named budgetId

  const updateFields = {
    transaction_name: req.body.transaction_name,
    // transaction_date: new Date(req.body.transaction_date),
    price: req.body.price,
    user: (req.token as ReqUser).id,
  };

  BudgetModel.findByIdAndUpdate(budgetId, updateFields, { new: true })
    .then((updatedBudget) => {
      if (!updatedBudget) {
        return res.status(404).json({ message: "Budget not found" });
      }
      res.status(200).json({ success: true, updatedBudget });
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(400).send("Bad request: Invalid data");
      } else {
        res.status(500).send("Internal server error");
      }
      next(error);
    });
};
