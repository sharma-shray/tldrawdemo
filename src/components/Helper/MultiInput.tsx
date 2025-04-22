// Taken and modified from https://zhengyan.blog/article/frontend/multi-input-in-MUI

import { Chip, TextField } from "@mui/material";
import { FC, SetStateAction, useState } from "react";
import { ImageTypeRequest } from "./ImageConsts";

interface MultiInputProps {
  values: ImageTypeRequest;
  setValues: (value: SetStateAction<ImageTypeRequest>) => void;
}

export const MultiInput: FC<MultiInputProps> = ({ values, setValues }) => {
  const keyWords = values.keywords;
  const [value, setValue] = useState<string>("");

  const handleEnter = (e: { key: string }) => {
    if (e.key === "Enter" && value !== "" && !keyWords.includes(value)) {
      setValues({
        ...values,
        keywords: [...keyWords, value],
      });
      setValue("");
    }
  };

  const handleValueChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setValue(e.target.value);
  };

  const handleValueDelete = (item: string) => {
    setValues({
      ...values,
      keywords: keyWords.filter((v: string) => v !== item),
    });
  };

  return (
    <div className="flex justify-center mt-12">
      <div className="w-72">
        <TextField
          label="Keywords"
          size="small"
          fullWidth
          onKeyDown={handleEnter}
          value={value}
          onChange={handleValueChange}
          InputProps={{
            // add component showing inputed values
            startAdornment:
              keyWords.length === 0 ? null : (
                <div className="flex pt-3 gap-x-2">
                  {keyWords.map((v) => {
                    return (
                      <Chip
                        key={v}
                        label={v}
                        variant="outlined"
                        onDelete={() => {
                          handleValueDelete(v);
                        }}
                      />
                    );
                  })}
                </div>
              ),
            // customize the style within the TextField
            style:
              keyWords.length === 0
                ? {}
                : {
                    display: "grid",
                    gridTemplateColumns: "1fr",
                    gridTemplateRows: "1fr 38px",
                  },
          }}
        />
      </div>
    </div>
  );
};
