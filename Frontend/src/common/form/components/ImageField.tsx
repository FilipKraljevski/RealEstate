import { Box, InputLabel } from "@mui/material";
import { useFieldContext } from "..";
import FieldError from "./FieldError";
import { useTranslation } from "react-i18next";

export default function ImageField() {
    const field = useFieldContext()
    const { t } = useTranslation()

    return (
        <Box>
            <InputLabel id='image-label'>{t(`form.${field.name}`)}</InputLabel>
            <input type="file" accept='image/*' multiple onChange={(e) => field.handleChange([...(e.target.files ?? [])])} />
            <FieldError meta={field.state.meta} />
        </Box>
    )
}