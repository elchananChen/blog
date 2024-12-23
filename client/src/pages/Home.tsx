import { LoginForm } from "@/components/login-form";
import BlogForm from "./BlogForm";
import SignUpForm from "@/components/signUpForm";
import { Outlet } from "react-router-dom";

function Home() {
  return (
    <div>
      {/* <LoginForm></LoginForm> */}
      <Outlet></Outlet>

      {/* <BlogForm isEdit={false} ></BlogForm> */}
    </div>
  );
}

export default Home;
