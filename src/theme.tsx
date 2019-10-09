import { css } from "@emotion/core";

import { lighten, darken, getReadableColor } from "./base/static/utils/color";

// Add font faces and other global styles:
export const globalStyles = theme => css`
  // We support five fonts that can be used throughout Mapseed flavors.
  @font-face {
    font-family: "Raleway-Light";
    src: url("https://s3-us-west-2.amazonaws.com/assets.mapseed.org/fonts/Raleway-Light.ttf");
  }
  @font-face {
    font-family: "Raleway-Regular";
    src: url("https://s3-us-west-2.amazonaws.com/assets.mapseed.org/fonts/Raleway-Regular.ttf");
  }
  @font-face {
    font-family: "Raleway-ExtraBold";
    src: url("https://s3-us-west-2.amazonaws.com/assets.mapseed.org/fonts/Raleway-ExtraBold.ttf");
  }
  @font-face {
    font-family: "PTSans-Regular";
    src: url("https://s3-us-west-2.amazonaws.com/assets.mapseed.org/fonts/PTSans-Regular.ttf");
  }
  @font-face {
    font-family: "PTSans-Bold";
    src: url("https://s3-us-west-2.amazonaws.com/assets.mapseed.org/fonts/PTSans-Bold.ttf");
  }
  // These styles are intended to mimic the styling of our Atoms on custom
  // pages.
  #mapseed-custom-page-container {
    height: 100%;

    h1 {
      font-family: ${theme.text.titleFontFamily};
      font-size: 2rem;
      margin: 0 0 16px 0;
    }
    h2 {
      font-family: ${theme.text.titleFontFamily};
      font-size: 1.8rem;
      margin: 0 0 16px 0;
    }
    h3 {
      font-family: ${theme.text.titleFontFamily};
      font-size: 1.5rem;
      margin: 0 0 16px 0;
    }
    h4 {
      font-family: ${theme.text.titleFontFamily};
      font-size: 1.1rem;
      margin: 0 0 16px 0;
    }
    h5 {
      font-family: ${theme.text.titleFontFamily};
      font-size: 1rem;
      margin: 0 0 16px 0;
    }
    h6 {
      font-family: ${theme.text.titleFontFamily};
      font-size: 1rem;
      margin: 0 0 16px 0;
    }
    img {
      width: 100%;
      max-width: 100%;
      margin: 0 0 10px 0;
    }
    a {
      font-family: ${theme.text.bodyFontFamily};
      text-decoration: none;
    }
    p,
    strong,
    em {
      font-family: ${theme.text.bodyFontFamily};
      font-size: 1.15rem;
      line-height: 1.4rem;
      margin: 0 0 16px 0;
    }
    &:after {
      content: " ";
      display: block;
      height: 0;
      clear: both;
    }
  }
`;

// This `theme` module should not be imported directly. Instead, it
// should be imported and used with emotion-theming's ThemeProvider:
//
//  ```
//  <ThemeProvider theme={theme}>
//    <MyPage/>
//  </ThemeProvider>,
//  ```
//
// Then we can access the theme directly within an emotion component:
//
// ```
// const Headline = styled('h1')(props => {
//   color: ${props => props.theme.brand.primary};
//   font: 20px/1.5 sans-serif;
// })
// ```
//
// https://github.com/emotion-js/emotion/tree/8537adc317edfbe5068b91a0e2685a4aa5822309/packages/emotion-theming#usage
//
// Or we can access the theme from our own components using the withTheme HOC:
//
// ```
// import { withTheme } from "emotion-theming"
// const MyComponent = props => {
//   console.log(props.theme.brand.primary) // this will print out "#007fbf"
// }
// export default withTheme(MyComponent)
// ```
//
// https://github.com/emotion-js/emotion/tree/8537adc317edfbe5068b91a0e2685a4aa5822309/packages/emotion-theming#withthemecomponent-reactcomponent-function

// TODO: We should start using the 'muiTheme' schema, and consolidate 'theme'
// into 'muiTheme' for our Emotion themes and config themes. Longer-term, we
// should only use MuiThemes and sunset Emotion as a theme provider.
const theme: Theme = {
  brand: {
    accent: "#0af",
    primary: "#007fbf",
    secondary: "#a3c7d9",
  },
  bg: {
    default: "#fff",
    light: "#a3c7d9",
    highlighted: "#007fbf",
  },
  input: {
    border: "0.25em solid #a3c7d9",
    padding: "0.5em",
    autofillBgColor: "#ffffe0",
    defaultBgColor: "#ffffff",
  },
  text: {
    primary: "#36454f",
    secondary: "#fff",
    tertiary: "#fff",
    highlighted: "#fff",
    headerFontFamily: "Raleway-Regular,sans-serif",
    bodyFontFamily: "Raleway-Light,sans-serif",
    navBarFontFamily: "Raleway-Regular,sans-serif",
    textTransform: "uppercase",
    titleColor: "#aaa",
    titleFontFamily: "Raleway-Regular,sans-serif",
  },
  map: {
    addPlaceButtonBackgroundColor: "rgba(242,82,24,0.89)",
    addPlaceButtonHoverBackgroundColor: "#ff8b61",
  },
  boxShadow: "-0.25em 0.25em 0 rgba(0, 0, 0, 0.1)",
};

export type Theme = {
  brand: {
    accent: string;
    primary: string;
    secondary: string;
  };
  bg: {
    default: string;
    light: string;
    highlighted: string;
  };
  input: {
    border: string;
    padding: string;
    autofillBgColor: string;
    defaultBgColor: string;
  };
  text: {
    primary: string;
    secondary: string;
    tertiary: string;
    highlighted: string;
    headerFontFamily: string;
    bodyFontFamily: string;
    navBarFontFamily: string;
    textTransform: string;
    titleColor: string;
    titleFontFamily: string;
  };
  map: {
    addPlaceButtonBackgroundColor: string;
    addPlaceButtonHoverBackgroundColor: string;
  };
  boxShadow: string;
};

export const baseMuiTheme = {
  // TODO: Start using this schema in our Config and our Emotion
  // theme provider
  palette: {
    primary: {
      main: "#007fbf",
      light: lighten("#007fbf", 10),
      dark: darken("#007fbf", 10),
      contrastText: getReadableColor("#007fbf"),
    },
    secondary: {
      main: "#a3c7d9",
      light: lighten("#a3c7d9", 10),
      dark: darken("#a3c7d9", 10),
      contrastText: getReadableColor("#a3c7d9"),
    },
    accent: {
      main: "#0af",
      light: lighten("#0af", 10),
      dark: darken("#0af", 10),
      contrastText: getReadableColor("#0af"),
    },
    error: {
      main: "#dc3545",
      light: lighten("#dc3545", 10),
      dark: darken("#dc3545", 10),
      contrastText: getReadableColor("#dc3545"),
    },
  },
  typography: {
    // Fonts configured like so:
    // https://material-ui.com/customization/typography/#font-family
    fontFamily: "PTSansi-Regular,sans-serif",
    // Fonts, font sizes, etc, can be configured here:
    // https://material-ui.com/customization/typography/#font-size
    h1: {
      fontFamily: "Raleway-ExtraBold,sans-serif",
      fontSize: "2rem",
    },
    h2: {
      fontFamily: "Raleway-ExtraBold,sans-serif",
      fontSize: "1.8rem",
    },
    h3: {
      fontFamily: "Raleway-ExtraBold,sans-serif",
      fontSize: "1.5rem",
    },
    h4: {
      fontFamily: "Raleway-ExtraBold,sans-serif",
      fontSize: "1.2rem",
    },
    h5: {
      fontFamily: "Raleway-Regular,sans-serif",
      fontSize: "1.2rem",
    },
    h6: {
      fontFamily: "Raleway-Regular,sans-serif",
      fontSize: "1.2rem",
    },
    body1: {
      fontFamily: "PTSans-Regular,sans-serif",
      fontSize: "1.1rem",
    },
    body2: {
      fontFamily: "PTSans-Regular,sans-serif",
      fontSize: "1rem",
    },
    strong: {
      fontFamily: "PTSans-Bold,sans-serif",
    },
  },
};

export interface MuiTheme {
  palette: {
    primary: {
      main: string;
    };
    secondary: {
      light: string;
      main: string;
      contrastText: string;
    };
  };
  typography: {
    h1: {
      fontFamily: string;
      fontSize: string;
    };
    h2: {
      fontFamily: string;
      fontSize: string;
    };
    h3: {
      fontFamily: string;
      fontSize: string;
    };
    h4: {
      fontFamily: string;
      fontSize: string;
    };
    h5: {
      fontFamily: string;
      fontSize: string;
    };
    h6: {
      fontFamily: string;
      fontSize: string;
    };
    body1: {
      fontFamily: string;
      fontSize: string;
    };
    body2: {
      fontFamily: string;
      fontSize: string;
    };
    fontFamily: string;
  };
}

export default theme;
