import { Typography } from "@mui/material";
import { ZodError } from "zod";


export default function FieldError( {meta} : any) {
    return meta.errors.map(({ message } : ZodError, index: any) => (
        <Typography key={index} color="error">{message}</Typography>
    ))
}