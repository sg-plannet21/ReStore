import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

interface Props {
  options: { value: string; label: string }[];
  selectedValue: string;
  onChange: (event: any) => void;
}

export default function RadioButtonGroup({
  options,
  selectedValue,
  onChange,
}: Props) {
  return (
    <FormControl>
      <RadioGroup>
        {options.map((option) => (
          <FormControlLabel
            key={option.label}
            checked={option.value === selectedValue}
            value={option.value}
            control={<Radio />}
            label={option.label}
            onChange={onChange}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
