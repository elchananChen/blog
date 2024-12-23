import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

const countries = [
  { initials: "IL", country: "Israel" },
  { initials: "RU", country: "Russia" },
  { initials: "US", country: "United States" },
  { initials: "HU", country: "Hungary" },
  { initials: "RO", country: "Romania" },
];

function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="firstName">first Name:</Label>
          <Input
            id="firstName"
            type="text"
            placeholder="will display to others"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="lastName">last Name:</Label>
          <Input
            id="lastName"
            type="text"
            placeholder="will display to others"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="will display only by your permition"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="phone">phone</Label>
          <Input
            id="phone"
            type="phone"
            placeholder="will display only by your permition"
            required
          />
        </div>
        <RadioGroup>
          <div className="grid  gap-2">
            <Label>country:</Label>
            {countries.map((country) => {
              return (
                <div>
                  <RadioGroupItem
                    className="mx-2"
                    value={country.initials}
                    id={country.initials}
                  />
                  <Label htmlFor={country.initials}>{country.country}</Label>
                </div>
              );
            })}
          </div>
        </RadioGroup>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
          </div>
          <Input id="password" type="password" required />
        </div>
        <Button type="submit" className="w-full">
          SignUp
        </Button>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or continue as Guest or Sign up
          </span>
        </div>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link to={"/auth/logIn"} className="underline underline-offset-4">
          Log In
        </Link>
        <span> Or continue as </span>
        <Link to={"/"} className="underline underline-offset-4">
          Guest
        </Link>
      </div>
    </form>
  );
}

export default SignUpForm;
