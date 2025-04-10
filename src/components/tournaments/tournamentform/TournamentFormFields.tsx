import { Field, ErrorMessage, useField } from "formik";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface FormFieldsProps {
  continents: string[];
  tiers: number[];
}

// Custom Formik-compatible Select component
const FormikSelect = ({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: (string | number)[];
}) => {
  const [field, meta, helpers] = useField(name);

  return (
    <div>
      <Label htmlFor={name} className="block mb-2">
        {label}
      </Label>
      <Select
        onValueChange={(value) => helpers.setValue(value)}
        value={field.value || ""}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt} value={opt.toString()}>
              {typeof opt === "number" ? `Tier ${opt}` : opt}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {meta.touched && meta.error && (
        <div className="text-red-500 text-sm mt-1">{meta.error}</div>
      )}
    </div>
  );
};

export default function TournamentFormFields({
  continents,
  tiers,
}: FormFieldsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Tournament Name */}
      <div>
        <Label htmlFor="name" className="block mb-2">
          Tournament Name
        </Label>
        <Field as={Input} type="text" id="name" name="name" />
        <ErrorMessage
          name="name"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>

      {/* Organizer */}
      <div>
        <Label htmlFor="Organizer" className="block mb-2">
          Organizer
        </Label>
        <Field as={Input} type="text" id="Organizer" name="Organizer" />
        <ErrorMessage
          name="Organizer"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>

      {/* Location */}
      <div>
        <Label htmlFor="location" className="block mb-2">
          Venue/Location
        </Label>
        <Field
          as={Input}
          type="text"
          id="location"
          name="location"
          placeholder="e.g., Madison Square Garden"
        />
        <ErrorMessage
          name="location"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>

      {/* Country */}
      <div>
        <Label htmlFor="country" className="block mb-2">
          Country
        </Label>
        <Field as={Input} type="text" id="country" name="country" />
        <ErrorMessage
          name="country"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>

      {/* Continent Dropdown */}
      <FormikSelect label="Continent" name="Continent" options={continents} />

      {/* Tier Dropdown */}
      <FormikSelect label="Tier" name="Tier" options={tiers} />

      {/* Start Date */}
      <div>
        <Label htmlFor="startDate" className="block mb-2">
          Start Date
        </Label>
        <Field as={Input} type="date" id="startDate" name="startDate" />
        <ErrorMessage
          name="startDate"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>

      {/* End Date */}
      <div>
        <Label htmlFor="endDate" className="block mb-2">
          End Date
        </Label>
        <Field as={Input} type="date" id="endDate" name="endDate" />
        <ErrorMessage
          name="endDate"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>
    </div>
  );
}
