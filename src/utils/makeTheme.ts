import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

const headerHeight = "72px";

const makeTheme = (dark: boolean) =>
  responsiveFontSizes(
    createMuiTheme({
      palette: {
        type: dark ? "dark" : "light",
        secondary: { main: dark ? "#a50000" : "#00468b" },
        primary: { main: "#008000" },
      },
      typography: {
        fontFamily: "OpenSans",
        h5: {
          fontWeight: "bold",
        },
        h2: {
          fontWeight: "bold",
        },
        h1: {
          fontWeight: "bold",
        },
      },
      overrides: {
        MuiContainer: {
          root: {
            display: undefined,
            width: undefined,
            marginLeft: undefined,
            marginRight: undefined,
          },
        },
        MuiAppBar: {
          root: {
            flexDirection: undefined,
            justifyContent: "center",
            height: headerHeight,
          },
        },
        MuiTableCell: {
          head: {
            fontWeight: 600,
          },
        },
        MuiButton: {
          root: {
            fontWeight: 600,
          },
        },
        MuiTabs: {
          root: {
            height: headerHeight,
          },
          scroller: {
            height: "100%",
            display: "inline-flex",
          },
        },
      },
    })
  );

export default makeTheme;
