import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { useState } from "react";

interface Props {
  checked?: string[];
  items: string[];
  onChange: (items: string[]) => void;
}

export default function CheckboxButtons({ items, checked, onChange }: Props) {
  const [checkedItems, setCheckedItems] = useState(checked || []);
  function handleChecked(value: string) {
    let newArray = [];
    const currentIndex = checkedItems.findIndex((item) => item === value);
    if (currentIndex === -1) newArray = checkedItems.concat(value);
    else newArray = checkedItems.filter((item) => item !== value);
    setCheckedItems(newArray);
    onChange(newArray);
  }

  return (
    <FormGroup>
      {items.map((item) => (
        <FormControlLabel
          key={item}
          label={item}
          control={
            <Checkbox
              checked={checkedItems.indexOf(item) !== -1}
              onClick={() => handleChecked(item)}
            />
          }
        />
      ))}
    </FormGroup>
  );
}
