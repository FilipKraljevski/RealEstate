import { Box, TextField } from "@mui/material";
import { getErrorsLength, useFieldContext } from "..";
import FieldError from "./FieldError";
import { useTranslation } from "react-i18next";

interface Props {
    required?: boolean,
    fullWidth?: boolean
    type?: string,
    placeholder?: string
}

export default function Text(props: Props) {
    const field = useFieldContext()
    const { t } = useTranslation()

    const isRequired = props.required ?? true
    const fullWidth = props.fullWidth ?? false
    const type = props.type ?? 'text'

    return (
        <Box>
            <TextField id={field.name} required={isRequired} label={t(`form.${field.name}`)} value={field.state.value} fullWidth={fullWidth}
                type={type} margin='normal' placeholder={props.placeholder} onChange={(e) => field.handleChange(e.target.value)} 
                error={getErrorsLength(field.state.meta)} />
            <FieldError meta={field.state.meta} />
        </Box>
    )
}