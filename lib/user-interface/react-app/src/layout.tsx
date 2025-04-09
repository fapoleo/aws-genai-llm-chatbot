import React from "react";
import { TopNavigation } from "@cloudscape-design/components";
import { Auth } from "aws-amplify";
import { Mode } from "@cloudscape-design/global-styles";
import { useState } from "react";
import { StorageHelper } from "./common/helpers/storage-helper";
import useOnFollow from "./common/hooks/use-on-follow";
import { CHATBOT_NAME } from "./common/constants";

interface LayoutProps {
  children: React.ReactNode;
  showHeader: boolean;
}

function Layout({ children, showHeader }: LayoutProps) {
  const onFollow = useOnFollow();
  const [theme, setTheme] = useState<Mode>(StorageHelper.getTheme());

  const onChangeThemeClick = () => {
    if (theme === Mode.Dark) {
      setTheme(StorageHelper.applyTheme(Mode.Light));
    } else {
      setTheme(StorageHelper.applyTheme(Mode.Dark));
    }
  };

  const onUserProfileClick = ({
    detail,
  }: {
    detail: { id: string };
  }) => {
    if (detail.id === "signout") {
      Auth.signOut();
    }
  };

  return (
    <>
      {showHeader && (
        <div
          style={{ 
            zIndex: 1002, 
            top: 0, 
            left: 0, 
            right: 0, 
            position: "fixed",
            backgroundColor: "#ef4b26"
          }}
          id="awsui-top-navigation"
        >
          <TopNavigation
            identity={{
              href: "/",
              logo: { 
                src: "https://tools.danaconnect.com/emailsecurity/assets/images/DANA-logo-horizontal-blanco.png", 
                alt: "Dana Logo" 
              },
            }}
            utilities={[
              {
                type: "button",
                text: theme === Mode.Dark ? "Light Mode" : "Dark Mode",
                onClick: onChangeThemeClick,
              },
              {
                type: "button",
                text: "GitHub",
                href: "https://github.com/aws-samples/aws-genai-llm-chatbot",
                external: true,
                externalIconAriaLabel: " (opens in a new tab)",
              },
            ]}
          />
        </div>
      )}
      <div style={{ paddingTop: showHeader ? "56px" : "0" }}>
        {children}
      </div>
    </>
  );
}

export default Layout;