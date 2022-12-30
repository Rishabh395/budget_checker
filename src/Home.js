import React from "react";
import MainGrid from "./MainGrid";
import { BudgetProvider } from "../BudgetContext";
// import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
// import Menu from "./Menu";
import Base from "./Base";
const useStyles = makeStyles({
  headingStyle: {
    padding: "1rem",
    fontWeight: 400,
  },
});

export default function Home() {
  const classes = useStyles();

  return (
    <BudgetProvider>
      <Base title="Budget App">
        <MainGrid />
      </Base>
    </BudgetProvider>
  );
}
