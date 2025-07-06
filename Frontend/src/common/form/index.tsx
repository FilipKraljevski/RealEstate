import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import Text from "./components/Text";
import TextArea from "./components/TextArea";
import SelectField from "./components/SelectField";

export const { fieldContext, useFieldContext, formContext, useFormContext } = createFormHookContexts()

export const { useAppForm, withForm } = createFormHook({
    fieldComponents: {
        Text,
        TextArea,
        SelectField
    },
    formComponents: {
        
    },
    fieldContext,
    formContext
})

export const getErrorsLength = (fieldMeta: any) => {
    return fieldMeta.errors.length
}