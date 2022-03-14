using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.RequestHelpers
{
    public class PaginationParams
    {
        private const int MaxPageSize = 50;
        public int PageNumber { get; set; } = 1;
        private int _pageSize = 6;
        public int PageSize
        {
            get => this._pageSize;
            set => this._pageSize = value > MaxPageSize ? MaxPageSize : value;
        }
    }
}