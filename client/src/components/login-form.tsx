import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

//  zod
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useLogIn } from "@/hook/useAuth";
export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const { mutate: logInMutation } = useLogIn();

  // * Zod schema to validate the inputs
  const formSchema = z.object({
    email: z
      .string()
      .min(1, { message: "This field has to be filled." })
      .email("This is not a valid email."),
    password: z.string(),
  });

  type FormData = z.infer<typeof formSchema>;

  // שימוש ב-useForm עם וולידציה ב-Zod
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema), // מחבר את Zod ל-react-hook-form
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values); // {email: 'sdfs@sdf.coms', password: 'sdfsdf'}
    const res = await logInMutation(values);
    console.log(res); //undefined
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label
            className={cn(errors.email && "text-destructive", className)}
            htmlFor="email"
          >
            Email
          </Label>
          <Input
            {...register("email")}
            id="email"
            type="email"
            placeholder="m@example.com"
            required
          />
          {errors.email && (
            <p className="text-destructive text-[0.8rem] font-medium">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label
              className={cn(errors.password && "text-destructive", className)}
              htmlFor="password"
            >
              Password
            </Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input
            {...register("password")}
            id="password"
            type="password"
            required
          />
          {errors.password && (
            <p className="text-destructive text-[0.8rem] font-medium">
              {errors.password.message}
            </p>
          )}
        </div>
        <Button type="submit" className="w-full">
          Login
        </Button>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or continue as Guest or Sign up
          </span>
        </div>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link to={"/auth/signUp"} className="underline underline-offset-4">
          Sign up
        </Link>
        <span> Or continue as </span>
        <Link to={"/"} className="underline underline-offset-4">
          Guest
        </Link>
      </div>
    </form>
  );
}
