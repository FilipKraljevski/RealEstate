export const url = 'https://localhost:44371/api'

export interface Response {
    statusCode: number,
    message: string
}

export interface BooleanResponse extends Response{
    data: boolean
}