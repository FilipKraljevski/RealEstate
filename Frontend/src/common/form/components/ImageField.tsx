import { Box, InputLabel } from "@mui/material";
import { useFieldContext } from "..";
import FieldError from "./FieldError";
import { useTranslation } from "react-i18next";

interface Props {
    multiple?: boolean,
    hidden?: boolean,
    hideName?: boolean
}

export default function ImageField(props: Props) {
    const field = useFieldContext()
    const { t } = useTranslation()

    const canMultiple = props.multiple ?? true
    const isHidden = props.hidden ?? false
    const hideName = props.hideName ?? false

    return (
        <Box>
            <InputLabel id='image-label'>{!hideName && t(`form.${field.name}`)}</InputLabel>
            <input type="file" accept='image/*' multiple={canMultiple} hidden={isHidden} onChange={(e) => field.handleChange([...(e.target.files ?? [])])} />
            <FieldError meta={field.state.meta} />
        </Box>
    )
}