import { useParams } from "react-router-dom";
import Chat from "../../components/chatbot/chat";
import styles from "../../styles/chat.module.scss";
import { useState } from "react";
import { Mode } from "@cloudscape-design/global-styles";
import { StorageHelper } from "../../common/helpers/storage-helper";

export default function ApplicationChat() {
  const { applicationId, sessionId } = useParams();
  const [theme, setTheme] = useState<Mode>(StorageHelper.getTheme());

  const onChangeThemeClick = () => {
    if (theme === Mode.Dark) {
      setTheme(StorageHelper.applyTheme(Mode.Light));
    } else {
      setTheme(StorageHelper.applyTheme(Mode.Dark));
    }
  };

  return (
    <div>
      <div 
        style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          right: 0, 
          backgroundColor: '#ef4b26', 
          zIndex: 1000,
          height: '56px',
          display: 'flex',
          alignItems: 'center',
          padding: '0 20px'
        }}
      >
        <img 
          src="/images/logo.png" 
          alt="Dana Logo" 
          style={{ 
            height: '40px', 
            maxWidth: '200px' 
          }} 
        />
        <div style={{ marginLeft: 'auto' }}>
          <button 
            onClick={onChangeThemeClick}
            style={{ 
              backgroundColor: 'transparent', 
              color: 'white', 
              border: 'none', 
              cursor: 'pointer' 
            }}
          >
            {theme === Mode.Dark ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </div>
      <div 
        className={styles.appChatContainer}
        data-locator="chatbot-ai-container"
        style={{ paddingTop: '56px' }}
      >
        <Chat sessionId={sessionId} applicationId={applicationId} />
      </div>
    </div>
  );
}