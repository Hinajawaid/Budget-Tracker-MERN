"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.budgetUpdate = exports.budgetDelete = exports.budgetAdd = exports.budgetGet = void 0;
const Budget_1 = __importDefault(require("../models/Budget"));
const mongoose_1 = __importDefault(require("mongoose"));
const budgetGet = (req, res, next) => {
    Budget_1.default.find({ user: req.token.id })
        .then((docs) => {
        res.status(200).json({
            success: true,
            budget_list: docs,
        });
    })
        .catch((error) => {
        if (error instanceof mongoose_1.default.Error.ValidationError) {
            res.status(400).send("Bad request: Invalid data");
        }
        else {
            res.status(500).send("Internal server error");
        }
        next(error);
    });
};
exports.budgetGet = budgetGet;
const budgetAdd = (req, res, next) => {
    const budgetData = {
        _id: new mongoose_1.default.Types.ObjectId(),
        transaction_name: req.body.transaction_name,
        transaction_date: new Date(req.body.transaction_date),
        price: req.body.price,
        user: req.token.id,
    };
    Budget_1.default.create(budgetData)
        .then(() => {
        res.status(201).json({ success: true });
    })
        .catch((error) => {
        if (error instanceof mongoose_1.default.Error.ValidationError) {
            res.status(400).send("Bad request: Invalid data");
        }
        else {
            res.status(500).send("Internal server error");
        }
        next(error);
    });
};
exports.budgetAdd = budgetAdd;
const budgetDelete = (req, res, next) => {
    const budgetId = req.params.id; // Assuming the route has a parameter named budgetId
    Budget_1.default.findByIdAndRemove(budgetId)
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
exports.budgetDelete = budgetDelete;
const budgetUpdate = (req, res, next) => {
    const budgetId = req.params.id; // Assuming the route has a parameter named budgetId
    const updateFields = {
        transaction_name: req.body.transaction_name,
        // transaction_date: new Date(req.body.transaction_date),
        price: req.body.price,
        user: req.token.id,
    };
    Budget_1.default.findByIdAndUpdate(budgetId, updateFields, { new: true })
        .then((updatedBudget) => {
        if (!updatedBudget) {
            return res.status(404).json({ message: "Budget not found" });
        }
        res.status(200).json({ success: true, updatedBudget });
    })
        .catch((error) => {
        if (error instanceof mongoose_1.default.Error.ValidationError) {
            res.status(400).send("Bad request: Invalid data");
        }
        else {
            res.status(500).send("Internal server error");
        }
        next(error);
    });
};
exports.budgetUpdate = budgetUpdate;
