import { BudgetData } from "../../types/Budget";
import { useState, useEffect } from "react";

type SetBudgetHandler = (BudgetDataList: [BudgetData]) => void;

interface BudgetStatus {
  budgetExceeded: boolean;
}

const isBroken = async () => {
  return false;
};
export const getBudgetData = async (
  setBudgetDataList: SetBudgetHandler
): Promise<boolean> => {
  try {
    const response = await fetch("http://localhost:5000/budget/all", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log("data.budget_lifdhst");

    if (response.ok) {
      const data = await response.json();
      setBudgetDataList(data.budget_list as [BudgetData]);
      console.log("data.budget_list", data.budget_list);
      return true;
    } else {
      console.log("error");
      return await isBroken();
    }
  } catch (err) {
    return await isBroken();
  }
};
export const deleteBudgetData = async (_id: string): Promise<boolean> => {
  try {
    console.log("sdadsd", _id);
    const response = await fetch(`http://localhost:5000/budget/delete/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.ok) {
      console.log("success");
      return true;
    } else {
      console.log("error");
      return await isBroken();
    }
  } catch (error) {
    return await isBroken();
  }
};

export const postBudgetData = async (
  budgetData: BudgetData
): Promise<boolean> => {
  try {
    const response = await fetch("http://localhost:5000/budget/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(budgetData),
    });
    if (response.ok) {
      console.log("success");
      return true;
    } else {
      console.log("error");
      return await isBroken();
    }
  } catch (error) {
    return await isBroken();
  }
};

export const updateBudgetData = async (
  budgetData: BudgetData
): Promise<boolean> => {
  try {
    console.log("sdadsd", budgetData._id);
    const response = await fetch(
      `http://localhost:5000/budget/update/${budgetData._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ ...budgetData, object_id: budgetData._id }),
      }
    );
    if (response.ok) {
      console.log("success");
      return true;
    } else {
      console.log("error");
      return await isBroken();
    }
  } catch (error) {
    return await isBroken();
  }
};

export const useBudgetLimitFetch = () => {
  const [budgetStatus, setBudgetStatus] = useState<boolean>(false);

  const fetchBudgetLimit = async (): Promise<void> => {
    try {
      const response = await fetch("http://localhost:8000/budget/limit", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.ok) {
        const data: BudgetStatus = await response.json();
        setBudgetStatus(data.budgetExceeded);
      }
    } catch (err) {}
  };

  useEffect(() => {
    fetchBudgetLimit();
  }, []);
  return { budgetStatus, setBudgetStatus };
};
