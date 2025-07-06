import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { getErrorsLength, useFieldContext } from "..";
import { useTranslation } from "react-i18next";
import FieldError from "./FieldError";

interface Props {
    data: Item[],
    required?: boolean,
    defaultValue?: boolean
}

interface Item {
    value: any,
    label: string
}

export default function SelectField(props: Props) {
    const field = useFieldContext()
    const { t } = useTranslation()

    const isRequired = props.required ?? true
    const data = props.data
    const defaultValue = props.defaultValue

    return (
        <FormControl sx={{mt: '16px', mb: '8px'}} fullWidth>
            <InputLabel id='select-label'>{t(`form.${field.name}`)}{isRequired ? '*' : ''}</InputLabel>
            <Select id={field.name} required={isRequired} value={field.state.value} labelId="select-label" label={t(`form.${field.name}`)}
                onChange={(e) => field.handleChange(e.target.value)} error={getErrorsLength(field.state.meta)}>
                    {defaultValue || 
                        <MenuItem value='0'>{t(`option.Select`)}</MenuItem>
                    }
                    {data.map((item: Item, index: number) => {
                        return (
                            <MenuItem key={index} value={item.value}>{t(`option.${item.label}`)}</MenuItem>
                        )
                    })}
            </Select>
            <FieldError meta={field.state.meta} />
        </FormControl>
    )
}