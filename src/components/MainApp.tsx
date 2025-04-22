import {
  Box,
  FormControl,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Input,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { ImageType, getImageKeywords } from "./Helper/ImageConsts";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Header from "./Header";
import dayjs, { Dayjs } from "dayjs";
import { Form } from "./Form";
import { GetAllImages } from "./Helper/Api";

export const MainApp: FC = () => {
  //Filtered images
  const [listOfImages, setListOfImages] = useState<ImageType[]>([]);
  const [search, setSearch] = useState<string>("");
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs(new Date()));
  const [selectedNames, setSelectedNames] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [imageKeywords, setImageKeywords] = useState<string[]>([]);

  //All images
  const [images, setImages] = useState<ImageType[]>([]);

  useEffect(() => {
    GetAllImages()
      .then((json) => {
        setImages(json);
        setListOfImages(json);
        setImageKeywords(getImageKeywords(json));
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    setListOfImages(
      images.filter((image) => {
        return (
          image.Title.toLowerCase().includes(search.toLowerCase()) &&
          (!startDate || dayjs(image.UploadDate).isAfter(startDate)) &&
          (!endDate || dayjs(image.UploadDate).isBefore(endDate)) &&
          (selectedNames.length === 0 ||
            selectedNames.every((name) => image.Keywords.includes(name)))
        );
      })
    );
  }, [search, startDate, endDate, selectedNames, images]);

  return (
    <>
      <Header>
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifySelf={"center"}
          paddingBottom={"40px"}
        >
          <Box>
            <Typography variant="h2">Image Gallery</Typography>
          </Box>
          <Box marginTop="40px" marginLeft="120px">
            <Form open={open} setOpen={setOpen}></Form>
          </Box>
        </Box>

        <Box
          display={"flex"}
          justifyContent={"center"}
          alignContent={"center"}
          padding={"20px"}
        >
          <Box padding={"20px"}>
            <Input
              id="input"
              placeholder="Search"
              onChange={(input) => setSearch(input.target.value)}
            />
          </Box>
          <Box display="flex" padding={"20px"}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Box display={"flex"} justifyContent={"flex-end"}>
                <Box paddingRight="10px">
                  <DatePicker
                    label="Start Date"
                    value={startDate}
                    onChange={(newDate) => setStartDate(newDate)}
                  />
                </Box>
                <Box>
                  <DatePicker
                    label="End Date"
                    value={endDate}
                    onChange={(newDate) => setEndDate(newDate)}
                  />
                </Box>
              </Box>
            </LocalizationProvider>
          </Box>
          <Box padding={"12px"} display={"flex"}>
            <Typography paddingTop={"20px"} variant="subtitle1">
              Filter:
            </Typography>

            <FormControl sx={{ m: 1, width: 100 }}>
              <Select
                fullWidth
                multiple
                label="Keyword"
                value={selectedNames}
                onChange={(e) => setSelectedNames(e.target.value as string[])}
                input={<OutlinedInput label="Keywords" />}
              >
                {imageKeywords.map((keyword) => (
                  <MenuItem key={keyword} value={keyword}>
                    {keyword}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Header>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <ImageList cols={4} gap={30}>
          {listOfImages.map((item) => {
            return (
              <ImageListItem key={item.Id}>
                <img
                  srcSet={`${item.Image}`}
                  src={`${item.Image}`}
                  alt={item.Keywords.join(", ")}
                  loading="lazy"
                />
                <ImageListItemBar
                  position="below"
                  title={item.Title}
                  subtitle={`keywords: ${item.Keywords}`}
                />
              </ImageListItem>
            );
          })}
        </ImageList>
      </Box>
    </>
  );
};
