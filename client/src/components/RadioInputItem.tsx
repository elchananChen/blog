import { Label } from "@radix-ui/react-label";
import { RadioGroupItem } from "@radix-ui/react-radio-group";

function RadioInputItem() {
  return (
    <div>
      <RadioGroupItem className="mx-2" value="IL" id="IL" />
      <Label htmlFor="IL">IL</Label>
    </div>
  );
}

export default RadioInputItem;
