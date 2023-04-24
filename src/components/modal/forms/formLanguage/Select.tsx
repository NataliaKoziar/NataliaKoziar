import FormControl from '@mui/material/FormControl';
import InputLabel from "@mui/material/InputLabel"
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { ILanguage } from "../../../../redux/models";
import { UseFormRegister } from "react-hook-form"
import s from "./formLan.module.scss"

interface SelectProps {
    item?: ILanguage
    index?: number
    register: UseFormRegister<FormValues>
    remove?: any
}
type FormValues = {
    data: ILanguage[] | [];
};

export const SelectGroup = ({ item, index, register, remove }: SelectProps) => {

    return (
        <>
            <hr />
            <div className={s.row}>

                <FormControl sx={{ m: 1, minWidth: 200 }}>
                    <InputLabel id={item ? `label1${index || 0}` : "label1"}>Language</InputLabel>
                    <Select
                        labelId={item ? `label1${index || 0}` : "label1"}
                        id={item ? `select1${index || 0}` : "select1"}
                        defaultValue={item?.language || ""}
                        label="Language"
                        //@ts-ignore
                        {...register(`data[${index || 0}.language]`)}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value="Ukrainian">Ukrainian</MenuItem>
                        <MenuItem value="English">English</MenuItem>
                        <MenuItem value="German">German</MenuItem>
                        <MenuItem value="Polish">Polish</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 200 }}>
                    <InputLabel id={item ? `label2${index || 0}` : "label2"}>Level</InputLabel>
                    <Select
                        labelId={item ? `label2${index || 0}` : "label2"}
                        id={item ? `select2${index || 0}` : "select2"}
                        defaultValue={item?.level || ""}
                        label="Level"
                        //@ts-ignore
                        {...register(`data[${index || 0}].level]`)}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value="elementary">elementary</MenuItem>
                        <MenuItem value="pre-intermediate">pre-intermediate</MenuItem>
                        <MenuItem value="intermediate">intermediate</MenuItem>
                        <MenuItem value="upper-intermediate">upper-intermediate</MenuItem>
                        <MenuItem value="advanced">advanced</MenuItem>
                        <MenuItem value="native">native</MenuItem>
                    </Select>
                </FormControl>
                {item && <HighlightOffIcon sx={{position:"absolute", top:"0px", right:"0px"}} onClick={() => remove(index)} />}

            </div>
        </>
    )
}