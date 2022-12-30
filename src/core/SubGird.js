import React, { useState, useEffect, useContext } from "react";

import ItemCard from "./ItemCard";


import { isAuthenticated } from "../auth";
import { addItem, getData } from "./coreapicalls";
import { BudgetContext } from "../BudgetContext";




const SubGrid = ({ name }) => {
  var data;
  const classes = useStyles();
  const userId = isAuthenticated() && isAuthenticated().user.id;

  const { income, expense, sUpdate } = useContext(BudgetContext);
  const [incomeData, setIncomeData] = income;
  const [expenseData, setExpenseData] = expense;

  //To check whether you have to recall the API
  const [shouldUpdate, setShouldUpdate] = sUpdate;

  const [localData, setLocalData] = useState(0);
  const [showAddItem, setShowAddItem] = useState(false);
  const [newItemData, setNewItemData] = useState({
    name: "",
    amount: "",
    itemType: name.toLowerCase(),
    user: userId,
  });

  const { month } = useContext(BudgetContext);
  const [curMonth, setCurMonth] = month;
  const [loading, setLoading] = useState(false);

  

  if (name === "Income") {
    data = incomeData;
  } else {
    data = expenseData;
  }

  const handleChange = (name) => (event) => {
    setNewItemData({
      ...newItemData,
      [name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    setLoading(true);
    event.preventDefault();
    setNewItemData({ ...newItemData });
    setShowAddItem(false);
    addItem(newItemData);
    setLoading(false);
    setShouldUpdate(!shouldUpdate);
  };

  // //Calc the sum of income and expense
  const getlocalData = () => {
    let temp = 0;
    data.map((i) => {
      temp = temp + i.amount;
    });
    setLocalData(temp);
  };

  useEffect(() => {
    getlocalData();
  }, [data]);

  useEffect(() => {
    if (curMonth !== "all") {
      getData().then((data) => {
        var fData = data.filter(
          (item) =>
            item.user === userId &&
            item.itemType === "income" &&
            item.date.split("-")[1] === curMonth
        );
        setIncomeData(fData.reverse());
        fData = data.filter(
          (item) =>
            item.user === userId &&
            item.itemType === "expense" &&
            item.date.split("-")[1] === curMonth
        );
        setExpenseData(fData.reverse());
      });
    } else {
      getData().then((data) => {
        var fData;
        fData = data.filter(
          (item) => item.user === userId && item.itemType === "income"
        );
        setIncomeData(fData.reverse());
        fData = data.filter(
          (item) => item.user === userId && item.itemType === "expense"
        );
        setExpenseData(fData.reverse());
      });
    }
    //Refreshing data from the API
  }, [shouldUpdate, curMonth]);

  return (
    <div>
      <div>
        <div>
          <div>
            {name}
          </div>
          <div>
            {name === "Income" ? (
              <div>
                Total :<span > ₹{localData}</span>
              </div>
            ) : (
              <div>
                Total :<span > ₹{localData}</span>
              </div>
            )}
          </div>
          <br />
          <button
            size="medium"
            onClick={() => {
              setShowAddItem(!showAddItem);
            }}
          >
            Add Item
          </button>
          <br />
          {showAddItem ? (
            <div>
              <form>
                <input
                  id="name"
                  label="Enter Name"
                 
                  onChange={handleChange("name")}
                />
                <input
                  id="amount"
                  label="Amount"
                  type="number"
                
                
                  onChange={handleChange("amount")}
                 
                />
              
                <button
                  size="small"
                  
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </form>
            </div>
          ) : (
            ""
          )}
          <br />
          {loading ? (
            <div>
              Loading...
            </div>
          ) : (
            <div>
              {data.map((i) => {
                return (
                  <ItemCard
                    name={name}
                    key={i.id}
                    id={i.id}
                    title={i.name}
                    amount={i.amount}
                    date={i.date}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default SubGrid;
