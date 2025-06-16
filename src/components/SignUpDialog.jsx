import { use, useEffect, useRef, useState } from "react";
import InteractiveInputBox from "./InteractiveInputBox";
import ".././styles/SignUpDialog.css";

const SignUpDialog = ({ openSignUpDialog, toggleOpenSignUpDialog }) => {
  const [inputNickname, setInputNickname] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputFirstPassword, setInputFirstPassword] = useState("");
  const [inputRepeatPassword, setInputRepeatPassword] = useState("");
  const signUpDialogRef = useRef(null);
  const passwordInput = useRef(null);
  const repeatPasswordInput = useRef(null);
  const [passwordWarning, setPasswordWarning] = useState(false);

  useEffect(() => {
    if (!signUpDialogRef) return;

    if (openSignUpDialog) {
      signUpDialogRef.current.showModal();
      console.log(passwordInput);
      console.log(repeatPasswordInput);
    } else {
      signUpDialogRef.current.close();
    }
  }, [openSignUpDialog]);


  useEffect(() => {
    if (!signUpDialogRef) return;

    if (openSignUpDialog) {
      signUpDialogRef.current.showModal();
    } else {
      signUpDialogRef.current.close();
    }
  }, [openSignUpDialog]);

  useEffect(() => {
    const checkRepeatPassword = () => {
      if (passwordInput.current.value !== repeatPasswordInput.current.value) {
        setPasswordWarning(true);
      } else setPasswordWarning(false);
    };
    repeatPasswordInput?.current?.addEventListener("blur", checkRepeatPassword);

    return () =>
      repeatPasswordInput?.current?.removeEventListener(
        "blur",
        checkRepeatPassword
      );
  }, []);

  return (
    <dialog
      ref={signUpDialogRef}
      className="signup-dialog"
      
    >
      <form className="signup-form" id="signup-form">
        <div className="form-headline wrapper">
          <div className="filler"></div>
          <h2 className="form-headline">Sign up</h2>
          <div className="escape flex-center">
            <button className="escape-btn flex-center" onClick={toggleOpenSignUpDialog}>X</button>
          </div>
        </div>
        <div className="form-inputs wrapper">
          <InteractiveInputBox
            id={"signup-nickname"}
            type={"text"}
            placeholder={"Nickname"}
          />
          <InteractiveInputBox
            id={"signup-email"}
            type={"email"}
            placeholder={"Email"}
          />
          <InteractiveInputBox
            id={"password"}
            type={"password"}
            placeholder={"Password"}
            ref={passwordInput}
          />
          <InteractiveInputBox
            id={"repeat-password"}
            type={"password"}
            placeholder={"Password"}
            ref={repeatPasswordInput}
          />
          {passwordWarning && <span>Passwords don't match</span>}
          <button type="button">Sign up</button>
        </div>
      </form>
    </dialog>
  );
};

export default SignUpDialog;
