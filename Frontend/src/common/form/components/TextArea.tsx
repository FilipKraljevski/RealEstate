import { Box, TextField } from "@mui/material";
import { getErrorsLength, useFieldContext } from "..";
import FieldError from "./FieldError";
import { useTranslation } from "react-i18next";

export default function TextArea() {
    const field = useFieldContext()
    const { t } = useTranslation()

    return (
        <Box>
            <TextField id={field.name} required label={t(`form.${field.name}`)} value={field.state.value} multiline margin='normal' 
                minRows={5} fullWidth onChange={(e) => field.handleChange(e.target.value)} error={getErrorsLength(field.state.meta)}/>
            <FieldError meta={field.state.meta} />
        </Box>
    )
}