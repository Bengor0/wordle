import { useEffect, useRef } from "react";
import InteractiveInputBox from "./InteractiveInputBox";
import { useFormState } from "react-dom";
import ".././styles/LogInDialog.css";

const LogInDialog = ({
  openLogInDialog,
  toggleOpenLogInDialog,
  toggleOpenSignUpDialog,
}) => {
  const logInDialogRef = useRef(null);

  useEffect(() => {
    if (!logInDialogRef) return;

    if (openLogInDialog) {
      logInDialogRef.current.showModal();
    } else {
      logInDialogRef.current.close();
    }
  }, [openLogInDialog]);

  const handleBackDropClick = (e) => {
    if (e.target === logInDialogRef.current) {
      toggleOpenLogInDialog();
    }
  };

  return (
    <dialog
      ref={logInDialogRef}
      className="login-dialog"
      onClick={(e) => handleBackDropClick(e)}
    >
      <form action="submit" className="login-form flex-center" id="login-form">
        <div className="form-headline wrapper">
          <div className="filler"></div>
          <h2 className="flex-center">Log in</h2>
          <div className="escape flex-center">
            <button className="escape-btn flex-center" onClick={toggleOpenLogInDialog}>X</button>
          </div>
        </div>
        <div className="form-inputs wrapper">
          <InteractiveInputBox
            id={"login-nickname"}
            type={"text"}
            placeholder={"Nickname"}
          />
          <InteractiveInputBox
            id={"login-password"}
            type={"password"}
            placeholder={"Password"}
          />
          <button className="submit-button" type="submit">
            Log in
          </button>
        </div>
        <div className="delimiter"></div>
        <div className="form-signup-option wrapper">
          <p>Don't have account yet?</p>
          <button
            onClick={() => {
              toggleOpenLogInDialog();
              toggleOpenSignUpDialog();
            }}
          >
            Sign up
          </button>
        </div>
      </form>
    </dialog>
  );
};

export default LogInDialog;
