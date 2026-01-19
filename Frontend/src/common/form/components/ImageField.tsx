import { Box, InputLabel } from "@mui/material";
import { useFieldContext } from "..";
import FieldError from "./FieldError";
import { useTranslation } from "react-i18next";

interface Props {
    multiple?: boolean,
    hidden?: boolean,
    hideName?: boolean,
    onChange?: (e?: any) => void
}

export default function ImageField(props: Props) {
    const field = useFieldContext()
    const { t } = useTranslation()

    const canMultiple = props.multiple ?? true
    const isHidden = props.hidden ?? false
    const hideName = props.hideName ?? false

    const handleOnChange = (e: any) => {
        if(props.onChange){
            props.onChange(e)
        } else {
            const files = [...(e.target.files ?? [])]; 
            field.handleChange(files);
        }
    }

    return (
        <Box>
            <InputLabel id='image-label'>{!hideName && t(`form.${field.name}`)}</InputLabel>
            <input type="file" accept='image/*' multiple={canMultiple} hidden={isHidden} onChange={(e) => handleOnChange(e)} />
            <FieldError meta={field.state.meta} />
        </Box>
    )
}