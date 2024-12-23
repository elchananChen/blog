import { LoginForm } from "@/components/login-form";
import BlogForm from "./BlogForm";
import SignUpForm from "@/components/signUpForm";

function Home() {
  return (
    <div>
      {/* <LoginForm></LoginForm> */}
      <SignUpForm></SignUpForm>
      {/* <BlogForm isEdit={false} ></BlogForm> */}
    </div>
  );
}

export default Home;
