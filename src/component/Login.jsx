import { useRef, useState } from "react";
import Header from "./Header";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { checkValidate } from "../utils/Validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Bg_url } from "../utils/constants";

function Login() {
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const handleValidation = () => {
    const message = checkValidate(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return;

    if (!isSignInForm) {
      // 🔹 Sign Up form
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(auth.currentUser, {
            displayName: name.current.value,
            photoURL:
              "https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png",
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = user;
              dispatch(addUser({ uid, email, displayName, photoURL }));
            })
            .catch((error) => {
              console.error("Profile update failed:", error);
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          setErrorMessage(error.code + " - " + error.message);
        });
    } else {
      // 🔹 Sign In form
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      ).catch((error) => {
        setErrorMessage(error.code + " - " + error.message);
      });
    }
  };

  return (
    <div>
      <Header />
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-fixed bg-center"
        style={{ backgroundImage: `url(${Bg_url})` }}
      >
        <div className="bg-black/75 p-10 rounded w-full max-w-sm shadow-lg text-white">
          <h1 className="text-3xl font-bold mb-6">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleValidation();
            }}
            className="space-y-6"
          >
            {/* Full name only on SignUp */}
            {!isSignInForm && (
              <div className="relative">
                <input
                  ref={name}
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder=" "
                  className="peer w-full bg-gray-800 text-white rounded border border-gray-600
                             px-3 pt-5 pb-2 placeholder-transparent
                             focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600"
                  aria-label="Full Name"
                />
                <label
                  htmlFor="fullName"
                  className="absolute left-3 top-2 text-xs text-gray-400 transition-all duration-150
                             transform origin-left pointer-events-none
                             peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                             peer-focus:top-2 peer-focus:-translate-y-0 peer-focus:text-xs "
                >
                  Full Name
                </label>
              </div>
            )}

            {/* Email */}
            <div className="relative">
              <input
                ref={email}
                id="email"
                name="email"
                type="email"
                placeholder=" "
                className="peer w-full bg-gray-800 text-white rounded border border-gray-600
                           px-3 pt-5 pb-2 placeholder-transparent
                           focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600"
                aria-label="Email or phone number"
              />
              <label
                htmlFor="email"
                className="absolute left-3 top-2 text-xs text-gray-400 transition-all duration-150
                           transform origin-left pointer-events-none
                           peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                           peer-focus:top-2 peer-focus:-translate-y-0 peer-focus:text-xs "
              >
                Email or phone number
              </label>
            </div>

            {/* Password */}
            <div className="relative">
              <input
                ref={password}
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder=" "
                className="peer w-full bg-gray-800 text-white rounded border border-gray-600
                           px-3 pt-5 pb-2 placeholder-transparent
                           focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600"
                aria-label="Password"
              />
              <label
                htmlFor="password"
                className="absolute left-3 top-2 text-xs text-gray-400 transition-all duration-150
                           transform origin-left pointer-events-none
                           peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                           peer-focus:top-2 peer-focus:-translate-y-0 peer-focus:text-xs"
              >
                Password
              </label>
 
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white cursor-pointer"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
 
            {errorMessage && (
              <p className="text-sm text-red-500 font-medium">{errorMessage}</p>
            )}

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 p-3 rounded font-semibold hover:cursor-pointer"
            >
              {isSignInForm ? "Sign In" : "Sign Up"}
            </button>
          </form>
 
          <div className="flex items-center justify-between text-sm my-6">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" /> Remember me
            </label>
            <a href="#" className="hover:underline">
              Need help?
            </a>
          </div>

          <div className="text-center text-sm">
            <span className="text-gray-400">
              {isSignInForm ? "New to Netflix?" : "Already registered?"}
            </span>{" "}
            <button
              type="button"
              onClick={toggleSignInForm}
              className="text-white hover:underline"
            >
              {isSignInForm ? "Sign up now" : "Sign In now"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
