import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const countries = [
  { initials: "IL", country: "Israel" },
  { initials: "HU", country: "Hungary" },
  { initials: "RO", country: "Romania" },
  { initials: "US", country: "United States" },
  { initials: "RU", country: "Russia" },
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
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
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
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
          </div>
          <Input id="password" type="password" required />
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
        <a href="#" className="underline underline-offset-4">
          Sign up
        </a>
        <span> Or continue as </span>
        <a href="#" className="underline underline-offset-4">
          Guest
        </a>
      </div>
    </form>
  );
}

export default SignUpForm;
