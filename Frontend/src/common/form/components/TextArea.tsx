import { Box, TextField } from "@mui/material";
import { getErrorsLength, useFieldContext } from "..";
import FieldError from "./FieldError";
import { useTranslation } from "react-i18next";

interface Props {
    required?: boolean
}

export default function TextArea(props: Props) {
    const field = useFieldContext()
    const { t } = useTranslation()

    const isRequired = props.required ?? true

    return (
        <Box>
            <TextField id={field.name} required={isRequired} label={t(`form.${field.name}`)} value={field.state.value} multiline margin='normal' 
                minRows={5} fullWidth onChange={(e) => field.handleChange(e.target.value)} error={getErrorsLength(field.state.meta)}/>
            <FieldError meta={field.state.meta} />
        </Box>
    )
}