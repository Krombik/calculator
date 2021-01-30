import React, { VFC } from "react";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";

const Spinner: VFC = () => (
  <Grid item container justify="center">
    <CircularProgress />
  </Grid>
);

export default Spinner;
