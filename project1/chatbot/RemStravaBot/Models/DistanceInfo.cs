using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace RemStravaBot.Models
{
    public class DistanceInfo
    {
        public DistanceInfo()
        {
            Distance = 0.0;
            Unit = DistanceUnit.KILOMETERS;

        }
        public double Distance { get; set; }
        public DistanceUnit Unit { get; set; }

        public override string ToString()
        {
            return Distance.ToString(CultureInfo.InvariantCulture) + " " + (Unit == DistanceUnit.MILES ? " Miles" : " Kilometers");
        }
    }

    public enum DistanceUnit
    {
        MILES,
        KILOMETERS
    }
}
