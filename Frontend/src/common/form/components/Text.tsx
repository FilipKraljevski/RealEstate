import { Box, InputAdornment, TextField } from "@mui/material";
import { getErrorsLength, useFieldContext } from "..";
import FieldError from "./FieldError";
import { useTranslation } from "react-i18next";

interface Props {
    required?: boolean,
    fullWidth?: boolean
    type?: string,
    placeholder?: string,
    adornment?: string,
    label?: string,
    onChange?: (e?: any) => void
}

const Adornment = (value: string) => {
    return <InputAdornment position="end">{value}</InputAdornment>
}

export default function Text(props: Props) {
    const field = useFieldContext()
    const { t } = useTranslation()

    const isRequired = props.required ?? true
    const fullWidth = props.fullWidth ?? false
    const type = props.type ?? 'text'
    const adornment = props.adornment ?? ''
    const label = props.label ?? undefined

    const handleOnChange = (e: any) => {
        if(props.onChange){
            props.onChange(e)
        } else {
            field.handleChange(e.target.value)
        }
    }

    return (
        <Box>
            <TextField id={field.name} required={isRequired} label={label || t(`form.${field.name}`)} value={field.state.value} fullWidth={fullWidth}
                type={type} margin='normal' placeholder={props.placeholder} onChange={(e) => handleOnChange(e)} 
                error={getErrorsLength(field.state.meta)} slotProps={{ input: {endAdornment: Adornment(adornment)}}}/>
            <FieldError meta={field.state.meta} />
        </Box>
    )
}