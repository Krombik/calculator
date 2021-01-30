import React, { useMemo, VFC } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import {
  StylesProvider,
  ThemeProvider as MuiThemeProvider,
} from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { State } from "types";
import makeTheme from "utils/makeTheme";
import GlobalStyle from "components/common/GlobalStyle";
import Layout from "components/common/Layout";
import { ThemeProvider } from "styled-components";
import Home from "containers/home/Home";

const selectData = createSelector(
  (state: State) => state.common.dark,
  (dark) => ({ dark })
);

const App: VFC = () => {
  const { dark } = useSelector(selectData);

  const theme = useMemo(() => makeTheme(dark), [dark]);

  return (
    <StylesProvider injectFirst>
      <MuiThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <CssBaseline />
          <Layout>
            <Home />
          </Layout>
        </ThemeProvider>
      </MuiThemeProvider>
    </StylesProvider>
  );
};

export default App;
