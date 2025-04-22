import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Input,
  Box,
} from "@mui/material";
import { FC, useState } from "react";
import { ImageTypeRequest } from "./Helper/ImageConsts";
import { MultiInput } from "./Helper/MultiInput";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { AddImage } from "./Helper/Api";

interface FormProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const Form: FC<FormProps> = ({ open, setOpen }) => {
  const [value, setValue] = useState<ImageTypeRequest>({
    title: "",
    image: "",
    keywords: [],
    uploadDate: new Date(),
  });
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    AddImage(value);
    location.reload();
  };

  return (
    <>
      <Button variant="contained" color="secondary" onClick={handleClickOpen}>
        Add Image
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Submit an Image</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill in the form to submit an image.
          </DialogContentText>
          <Box display={"flex"} flexDirection={"column"}>
            <Box padding="20px">
              <Input
                id="Title"
                placeholder="Title"
                onChange={(input) =>
                  setValue({
                    ...value,
                    title: input.target.value,
                  })
                }
              />
            </Box>
            <Box padding={"20px"}>
              <Input
                id="Url"
                placeholder="Url"
                onChange={(input) =>
                  setValue({
                    ...value,
                    image: input.target.value,
                  })
                }
              />
            </Box>
            <Box padding={"20px"}>
              <MultiInput values={value} setValues={setValue} />
            </Box>
            <Box padding={"20px"}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date"
                  value={dayjs(value.uploadDate)}
                  onChange={(newDate) =>
                    setValue({
                      ...value,
                      uploadDate: newDate?.toDate() || new Date(),
                    })
                  }
                />
              </LocalizationProvider>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
