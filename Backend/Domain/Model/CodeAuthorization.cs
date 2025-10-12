﻿using Domain.Enum;

namespace Domain.Model
{
    public class CodeAuthorization
    {
        public long Id { get; set; }
        public required string Email {  get; set; }
        public required string Code { get; set; }
        public ActionType ActionType { get; set; }
        public DateTime ExpirationDate { get; set; }
        public bool IsUsed { get; set; }
    }
}
