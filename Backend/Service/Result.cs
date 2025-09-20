namespace Service
{
    public class Result<T>
    {
        public int StatusCode {  get; set; }
        public string? Message { get; set; }
        public T? Data { get; set; }

        public Result(int statusCode)
        {
            StatusCode = statusCode;
        }
    }

    public class OkResult<T> : Result<T>
    {
        public OkResult(T data) : base(200)
        {
            Data = data;
        }
    }

    public class NotFoundResult<T> : Result<T>
    {
        public NotFoundResult(string message) : base(404)
        {
            Message = message;
        }
    }

    public class ErrorResult<T> : Result<T>
    {
        public ErrorResult(string message) : base(500)
        {
            Message = message;
        }
    }
}
