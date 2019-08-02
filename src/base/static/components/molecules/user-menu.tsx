/** @jsx jsx */
import * as React from "react";
import { jsx, css, InterpolationWithTheme } from "@emotion/core";
import { useTranslation } from "react-i18next";
import { UserAvatar } from "../atoms/imagery";
import { connect } from "react-redux";
import {
  InternalLink,
  ExternalLink,
  SmallText,
  RegularText,
} from "../atoms/typography";
import { Button } from "../atoms/buttons";
import OfflineDownloadMenu from "../organisms/offline-download-menu";
import styled from "@emotion/styled";

import { Mixpanel } from "../../utils/mixpanel";
import {
  DashboardsConfig,
  dashboardConfigSelector,
} from "../../state/ducks/dashboard-config";

import {
  userSelector,
  userPropType,
  hasAdminAbilities,
} from "../../state/ducks/user";
import { OfflineConfig, offlineConfigSelector } from "../../state/ducks/map";

import mq from "../../../../media-queries";
import { AppConfig, LoginProvider } from "../../state/ducks/app-config";

type MenuContainerProps = {
  isMobileEnabled: boolean;
};
const MenuContainer = styled("nav")<MenuContainerProps>(props => ({
  marginLeft: "auto",
  marginRight: "10px",

  [mq[0]]: {
    display: props.isMobileEnabled ? "block" : "none",
    marginLeft: "auto",
    marginRight: "auto",
  },
  [mq[1]]: {
    display: "block",
  },
}));

const menuStyles = ({
  isMenuOpen,
  isLoggedIn,
}: {
  isMenuOpen: boolean;
  isLoggedIn: boolean;
  // using 'any' for Theme type, until our theme.js is ported over to TS:
}): InterpolationWithTheme<any> => ({
  textAlign: "center",
  float: "left",
  width: "100%",
  margin: "0.5em 0",
  padding: "0",
  display: isMenuOpen ? "grid" : "none",
  gridRowGap: "16px",
  listStyle: "none",

  [mq[1]]: {
    backgroundColor: "#fff",
    borderRadius: "3px",
    boxShadow: "-0.25em 0.25em 0 rgba(0, 0, 0, 0.2)",
    width: "18em",
    margin: "0",
    padding: "1em 0.875em 1.125em 0.875em",
    position: "absolute",
    top: "4.125em",
    right: "1em",
    zIndex: 2,

    "&:before": {
      content: '""',
      height: "0",
      width: "0",
      border: "1em solid transparent",
      borderBottomColor: "#666",
      borderTop: "0",
      position: "absolute",
      bottom: "100%",
      right: isLoggedIn ? "0.5em" : "1.5em",
    },
  },
});

const MenuItem = styled("li")(({ theme }) => ({
  float: "left",
  width: "100%",
  fontFamily: theme.text.navBarFontFamily,
}));

const SocialLoginButton: React.FunctionComponent<{
  loginProvider: LoginProvider;
  apiRoot: string;
}> = ({ loginProvider, apiRoot }) => {
  let backgroundColor: string;
  switch (loginProvider.name) {
    case "twitter":
      backgroundColor = "#4099ff";
      break;
    case "facebook":
      backgroundColor = "#3b5998";
      break;
    case "google":
      backgroundColor = "#e8433a";
      break;
    case "discourse":
      backgroundColor = "green";
      break;
  }
  return (
    <ExternalLink
      css={theme => ({
        display: "block",
        padding: "0.5em",
        boxShadow: theme.boxShadow,
        color: "#fff !important",
        backgroundColor,
      })}
      href={`${apiRoot}users/login/${loginProvider.provider}/`}
      onClick={() =>
        Mixpanel.track("Clicked login button", {
          service: loginProvider.provider,
        })
      }
    >
      {/* capitalize the first letter of the provider name: */}
      {loginProvider.name.charAt(0).toUpperCase() +
        loginProvider.name.substring(1)}
    </ExternalLink>
  );
};

type StateProps = {
  currentUser: userPropType;

  hasAdminAbilities: Function;
  offlineBoundingBox: OfflineConfig;
  dashboardConfig: DashboardsConfig;
};

type Props = {
  pathname: string;
  appConfig: AppConfig;
  isMobileEnabled: boolean;
  isInMobileMode: boolean;
} & StateProps;

const UserMenu: React.FunctionComponent<Props> = props => {
  const [isMenuToggled, setIsMenuToggled] = React.useState<boolean>(false);
  const isMenuOpen = isMenuToggled || props.isInMobileMode;

  const [t, _] = useTranslation();
  if (props.currentUser.isAuthenticated) {
    // If user is logged in
    const isDashboard = props.pathname === "/dashboard";
    return (
      <MenuContainer role="article" isMobileEnabled={props.isMobileEnabled}>
        {/* TODO: Fix this to use UserAvatar: */}
        {!props.isInMobileMode && (
          <UserAvatar
            css={{
              float: "right",
              width: "2.7em",
              height: "2.6em",
              maxWidth: "none",
              cursor: "pointer",

              fontSize: "1em",
              padding: "0",
              outline: "0",

              [mq[0]]: {
                display: "none",
              },

              [mq[1]]: {
                zIndex: 1,
              },
            }}
            alt="profile picture"
            onClick={() => setIsMenuToggled(isMenuOpen => !isMenuOpen)}
            src={props.currentUser.avatar_url}
          />
        )}
        <ul css={menuStyles({ isMenuOpen, isLoggedIn: true })}>
          {!!props.dashboardConfig.length &&
            props.hasAdminAbilities(props.dashboardConfig[0].datasetSlug) && (
              <MenuItem
                onClick={() => setIsMenuToggled(isMenuOpen => !isMenuOpen)}
              >
                <InternalLink href={isDashboard ? "/" : "/dashboard"}>
                  {isDashboard ? "back to map" : `go to dashboard`}
                </InternalLink>
              </MenuItem>
            )}
          {props.offlineBoundingBox && (
            <MenuItem>
              <OfflineDownloadMenu
                offlineBoundingBox={props.offlineBoundingBox}
              />
            </MenuItem>
          )}
          <MenuItem>
            <div>
              <SmallText>{t("signedInAs", "Signed in as")}</SmallText>{" "}
              {props.currentUser.name}
            </div>
            <ExternalLink
              css={{
                fontSize: "0.875em",
                fontWeight: "normal",
                textDecoration: "none",
                textTransform: "uppercase",
                width: "100%",
              }}
              href={`${props.appConfig.api_root}users/logout/`}
              onClick={() => Mixpanel.track("Clicked logout button")}
            >
              {t("logOut", "Log out")}
            </ExternalLink>
          </MenuItem>
        </ul>
      </MenuContainer>
    );
  } else {
    // If no user is logged in
    return (
      <MenuContainer role="article" isMobileEnabled={props.isMobileEnabled}>
        {props.isInMobileMode ? (
          <div
            css={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <RegularText
              color="tertiary"
              height="24px"
              weight="bold"
              textTransform="uppercase"
            >{`Sign In:`}</RegularText>
          </div>
        ) : (
          <Button
            color="primary"
            onClick={() => setIsMenuToggled(isMenuOpen => !isMenuOpen)}
            css={theme => ({
              fontFamily: theme.text.navBarFontFamily,
              fontSize: "0.75em",
              textAlign: "center",
              textDecoration: "none",
              lineHeight: "3.25",
              display: "block",
              padding: "0 0.5em",
              height: "100%",
              cursor: "pointer",

              [mq[0]]: {
                display: "none",
              },

              [mq[1]]: {
                fontSize: "1em",
                textDecoration: "none",
                lineHeight: "1.5",
                padding: "0.5em",
                position: "relative",
                zIndex: 3,
              },
            })}
          >
            {t("signIn", "Sign In")}
          </Button>
        )}
        <ul css={menuStyles({ isMenuOpen, isLoggedIn: false })}>
          <MenuItem
            css={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gridRowGap: "8px",
              gridColumnGap: "8px",
            }}
          >
            {props.appConfig.loginProviders.map(loginProvider => (
              <SocialLoginButton
                key={loginProvider.provider}
                loginProvider={loginProvider}
                apiRoot={props.appConfig.api_root}
              />
            ))}
          </MenuItem>
        </ul>
      </MenuContainer>
    );
  }
};

const mapStateToProps = (state: any): StateProps => ({
  currentUser: userSelector(state),
  hasAdminAbilities: datasetSlug => hasAdminAbilities(state, datasetSlug),
  offlineBoundingBox: offlineConfigSelector(state),
  dashboardConfig: dashboardConfigSelector(state),
});

export default connect(mapStateToProps)(UserMenu);
