using Microsoft.AspNetCore.Mvc;
using Service;

namespace Web.Common
{
    public static class ActionResultMapper
    {
        public static ObjectResult MapResult<T>(Result<T> result)
        {
            return new ObjectResult(result) { StatusCode = result.StatusCode };
        }
    }
}
