import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      light: "#af52bf",
      main: "#9c27b0",
      dark: "#6d1b7b",
      contrastText: "#fff",
    },
  },
  typography: {
    fontFamily: "Nunito, sans-serif",
    allVariants: {
      fontWeight: 700,
      lineHeight: 1,
    },
    h4: {
      color: "#3D3D3D",
    },
    body2: {
      color: "#6c757d",
    },
  },
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: "#9c27b0",
          color: "#fff",
        },
        arrow: {
          color: "#9c27b0",
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          // borderCollapse: "collapse", // Убираем стандартное поведение с разделением ячеек
          boxShadow: "none",
          border: "none",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          border: "none",
          paddingLeft: "0px",
          paddingRight: "0px",
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          borderBottom: "1px solid rgba(156, 39, 176, 0.25)",
        },
      },
    },
    // MuiSvgIcon: {
    //   styleOverrides: {
    //     root: {
    //       color: "#3D3D3D",
    //     },
    //   },
    // },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "6px",
          "&:hover": {
            backgroundColor: "#9c27b0",
            boxShadow: "0px 5px 10px 0px rgba(109, 27, 123, 0.7)",
            color: "#fff",
          },
          textTransform: "none",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          borderRadius: "6px",
          border: "1px solid rgba(156, 39, 176, 0.25)",
          transition: "0.3s ease-in-out",
          "&:hover": {
            boxShadow: "0px 5px 10px 0px rgba(109, 27, 123, 0.7)",
          },
        },
      },
    },

    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: "#9c27b0",
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          border: "1px solid rgba(156, 39, 176, 0.25)",
          boxShadow: "none",
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          transition: "transform 0.2s ease-in-out",
          "&:hover": {
            color: "#9c27b0",
          },
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          paddingTop: 0,
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          paddingTop: 0,
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: "6px",
          border: "none",
          transition: "transform 0.2s ease-in-out",
          "&:hover": {
            transform: "scale(1.05)",
            color: "#9c27b0",
          },
          "&.Mui-selected": {
            backgroundColor: "rgba(156, 39, 176, 0.08)",
            color: "#9c27b0",
          },
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          transition: "color 0.2s ease-in-out",
          paddingTop: 0,
          paddingBottom: 0,
          "&:hover .MuiTypography-root": {
            color: "#9c27b0",
          },
        },
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "none",
        },
      },
    },
  },
});

export default theme;
