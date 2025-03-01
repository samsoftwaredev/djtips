import React from "react";
import { useForm, Controller } from "react-hook-form";
import { RadioGroup, Radio, FormControlLabel } from "@mui/material";

const TipAmountField = () => {
  const { control } = useForm();
  return (
    <Controller
      name="radioGroup"
      control={control}
      defaultValue=""
      render={({ field }) => (
        <RadioGroup {...field}>
          <FormControlLabel value="5" control={<Radio />} label="$5" />
          <FormControlLabel value="3" control={<Radio />} label="$3" />
          <FormControlLabel value="10" control={<Radio />} label="$10" />
        </RadioGroup>
      )}
    />
  );
};

export default TipAmountField;
