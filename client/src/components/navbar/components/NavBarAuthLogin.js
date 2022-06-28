//NavBar Login component

import { useState } from "react";

import {
  logInWithEmailAndPassword,
  signInWithGoogle,
} from "../../../utility/firebase";
import NavBarAuthCard from "./NavBarAuthCard";

import NavBarAuthHeadline from "./NavBarAuthHeadline";
import NavBarButton from "./NavBarButton";
import NavBarInput from "./NavBarInput";
import NavBarLink from "./NavBarLink";

function NavBarAuthLogin({ setLogin, setRegister, setReset }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    logInWithEmailAndPassword(email, password);
    setLogin(false);
  };

  const handleGoogle = () => {
    signInWithGoogle();
    setLogin(false);
  };

  const handleReset = () => {
    setLogin(false);
    setReset(true);
  };

  const handleRegister = () => {
    setLogin(false);
    setRegister(true);
  };

  return (
    <NavBarAuthCard>
      <NavBarAuthHeadline headline="Login" />
      <NavBarInput
        type="email"
        value={email}
        set={setEmail}
        placeholder="E-mail Address"
      />
      <div className="flex flex-col space-y-10 items-center">
        <NavBarInput
          type="password"
          value={password}
          set={setPassword}
          placeholder="Password"
        />
        <NavBarButton handler={handleLogin} text="Login" />
      </div>
      <p className="flex flex-row">
        <span className="mr-1">Login with </span>
        <NavBarLink
          text="Google"
          handler={handleGoogle}
          label="login with Google"
        />
        .
      </p>
      <p className="flex flex-col gap-1">
        Forgot Password? Click
        <span>
          <NavBarLink
            text="here"
            label="click for reseting password"
            handler={handleReset}
          />
          .
        </span>
      </p>
      <div>
        Don't have an account?{" "}
        <NavBarLink
          text="Register"
          labe="Register with email"
          handler={handleRegister}
        />{" "}
        now.
      </div>
    </NavBarAuthCard>
  );
}

export default NavBarAuthLogin;
