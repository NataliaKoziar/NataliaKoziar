import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker, DateRange } from '@mui/x-date-pickers-pro/DateRangePicker';
import {UseFormRegister} from "react-hook-form"
import {IEducation} from "../../redux/models"

interface PickerProps{
    period:{
        start:string|null
        end:string|null
    } | null
    register:UseFormRegister<IEducation>
}

export const BasicDateRangePicker = ({period, register}:PickerProps)=> {

const StartValue = (period!== null && period.start !== null)? dayjs(dayjs(period.start, 'DD/MM/YYYY').format("YYYY-MM-DD")):null
const EndValue = (period!== null && period.end !== null)? dayjs(dayjs(period.end, 'DD/MM/YYYY').format("YYYY-MM-DD")):null    
  const [value, setValue] = React.useState<DateRange<Dayjs>>([StartValue, EndValue]);

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      localeText={{ start: 'Start date', end: 'End date (or expected)' }}
    >
      <DateRangePicker
        value={value}
        inputFormat="DD/MM/YYYY"
        onChange={(newValue:any) => {
          setValue(newValue);
        }}
        renderInput={(startProps, endProps) => (
          <React.Fragment>
            <TextField {...startProps}
            //@ts-ignore
            {...register("start", {
                required: true,
            })} />
            <Box sx={{ mx: 2 }}> to </Box>
            <TextField {...endProps}
             //@ts-ignore
            {...register("end", {
                required: true,
            })} />
          </React.Fragment>
        )}
      />
    </LocalizationProvider>
  );
}
