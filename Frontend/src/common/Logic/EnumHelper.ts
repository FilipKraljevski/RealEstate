type EnumOption<E> = {
    value: E
    label: string
}

export function enumToOptions<E extends string | number>(enumObj: Record<string, E>): EnumOption<E>[] {
    return (Object.keys(enumObj) as Array<keyof typeof enumObj>)
    .filter(key => isNaN(Number(key)))
    .map(key => ({
        value: enumObj[key] as E,
        label: String(key),
    }))
}

export function getEnumTypeKey<E extends string | number>(value: string | number, type:  Record<string, E>) {
    const key = Object.entries(type).find(x => x[1] == value)
    return key ? key[0] : ""
}

export const hasFlag = (numbers: number, flagValue: number) => {
    if(isNaN(Number(flagValue)) || Number(flagValue) === 0){
        return false
    }
    return (numbers & flagValue) === flagValue
}