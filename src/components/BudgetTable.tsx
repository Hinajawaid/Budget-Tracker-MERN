import React, { useState, useEffect } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Button,
  Modal,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import TextFieldCustom from "./TextField";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import {
  getBudgetData,
  postBudgetData,
  updateBudgetData,
  deleteBudgetData,
} from "../utils/api/budgetFetch";

import { BudgetData } from "../types/Budget";

export default function BudgetTable() {
  const [budgets, setBudgets] = useState<BudgetData[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [filterDate, setFilterDate] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editBudget, setEditBudget] = useState("");

  const [newBudgetName, setNewBudgetName] = useState("");
  const [newBudgetPrice, setNewBudgetPrice] = useState(0);
  const [newBudgetDate, setNewBudgetDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      getBudgetData(setBudgets);
    }
  }, [setBudgets, navigate]);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleFilterChange = () => {
    // const newFilterDate = event.target.value; // Make sure this value is correct

    console.log("New Filter Date:", filterDate);

    const filteredRows = budgets.filter(
      (budget) => formatDate(budget.transaction_date) == filterDate
    );

    console.log("Filtered Rows:", filteredRows);

    setBudgets(filteredRows);
    // setFilterDate(newFilterDate); // Update the filterDate state
    setPage(0);
  };

  const handleAddBudget = async () => {
    const success = await postBudgetData({
      transaction_name: newBudgetName,
      transaction_date: newBudgetDate?.toString(),
      price: newBudgetPrice,
    } as BudgetData);

    if (success) {
      getBudgetData(setBudgets);
      setModalOpen(false);
      setEditing(false);
      setNewBudgetName("");
      setNewBudgetPrice(0);
      setNewBudgetDate("");
    } else {
    }
  };

  const updateBudget = async () => {
    const success = await updateBudgetData({
      _id: editBudget,
      transaction_name: newBudgetName,
      transaction_date: newBudgetDate?.toString(),
      price: newBudgetPrice,
    } as BudgetData);

    if (success) {
      getBudgetData(setBudgets);
      setModalOpen(false);
      setEditing(false);
      setNewBudgetName("");
      setNewBudgetPrice(0);
      setNewBudgetDate("");
    } else {
    }
  };

  const deleteBudget = async (id: string) => {
    const success = await deleteBudgetData(id);

    if (success) {
      getBudgetData(setBudgets);
    } else {
    }
  };

  const handleUpdateBudget = async (
    _id: string,
    name: string,
    price: number,
    date: string
  ) => {
    setNewBudgetName(name);
    setNewBudgetPrice(price);
    setNewBudgetDate(date);
    setEditing(true);
    setModalOpen(true);
    setEditBudget(_id);
  };

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Month is zero-based
    const day = date.getDate();
    return `${year}-${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <Paper sx={{ width: "80%", maxHeight: "80vh" }}>
      <div
        style={{
          padding: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TextFieldCustom
            label=""
            type="date"
            value={filterDate}
            onChange={setFilterDate}
            shrink={true}
            style={{ top: "-17px" }}
          />
          <Button
            variant="contained"
            style={{
              backgroundColor: "#FDC414",
              color: "black",
              height: "50px",
              marginLeft: "10px",
            }}
            onClick={handleFilterChange}
          >
            Filter Records
          </Button>
        </Box>
        <Button
          variant="contained"
          style={{ backgroundColor: "black", height: "50px" }}
          onClick={handleOpenModal}
        >
          Add Budget
        </Button>
      </div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {budgets
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((budget) => (
                <TableRow key={budget._id}>
                  <TableCell>{budget.transaction_name}</TableCell>
                  <TableCell>{budget.price}</TableCell>
                  <TableCell>{formatDate(budget.transaction_date)}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() =>
                        handleUpdateBudget(
                          budget._id,
                          budget.transaction_name,
                          budget.price,
                          formatDate(budget.transaction_date)
                        )
                      }
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => deleteBudget(budget._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={budgets.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 550,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 1,
            height: 330,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "10px",
            }}
          >
            <Typography variant="h6" gutterBottom>
              {editing ? "Update Budget" : "Add New Budget"}
            </Typography>
            <Box>
              <IconButton
                aria-label="close"
                onClick={() => setModalOpen(false)} // <-- Add this line
              >
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
          <Divider sx={{ marginY: 1 }} />

          {editing ? (
            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
              }}
            >
              <TextFieldCustom
                style={{ width: "100%" }}
                shrink={false}
                type="text"
                label="Name"
                value={newBudgetName}
                onChange={setNewBudgetName}
              />
              <TextFieldCustom
                style={{ width: "100%" }}
                shrink={true}
                label="Price"
                type="number"
                value={newBudgetPrice}
                onChange={setNewBudgetPrice}
              />
              <TextFieldCustom
                style={{ width: "100%" }}
                shrink={false}
                label=""
                type="date"
                value={newBudgetDate}
                onChange={setNewBudgetDate}
              />
              <Button
                style={{
                  marginTop: "30px",
                  backgroundColor: "black",
                  width: "200px",
                }}
                variant="contained"
                color="primary"
                onClick={updateBudget}
              >
                Edit Budget
              </Button>
            </Box>
          ) : (
            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
              }}
            >
              <TextFieldCustom
                style={{ width: "100%" }}
                shrink={false}
                type="text"
                label="Name"
                value={newBudgetName}
                onChange={setNewBudgetName}
              />
              <TextFieldCustom
                style={{ width: "100%" }}
                shrink={true}
                label="Price"
                type="number"
                value={newBudgetPrice}
                onChange={setNewBudgetPrice}
              />
              <TextFieldCustom
                style={{ width: "100%" }}
                shrink={false}
                label=""
                type="date"
                value={newBudgetDate}
                onChange={setNewBudgetDate}
              />
              <Button
                style={{
                  marginTop: "30px",
                  backgroundColor: "black",
                  width: "200px",
                }}
                variant="contained"
                color="primary"
                onClick={handleAddBudget}
              >
                Add Budget
              </Button>
            </Box>
          )}
        </Box>
      </Modal>
    </Paper>
  );
}
