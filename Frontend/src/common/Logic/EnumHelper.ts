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