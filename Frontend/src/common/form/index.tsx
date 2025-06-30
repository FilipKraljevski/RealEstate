import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import Text from "./components/Text";
import TextArea from "./components/TextArea";

export const { fieldContext, useFieldContext, formContext, useFormContext } = createFormHookContexts()

export const { useAppForm, withForm } = createFormHook({
    fieldComponents: {
        Text,
        TextArea
    },
    formComponents: {
        
    },
    fieldContext,
    formContext
})

export const getErrorsLength = (fieldMeta: any) => {
    return fieldMeta.errors.length
}