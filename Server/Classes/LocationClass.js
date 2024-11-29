const fs = require("fs");
class LocationClass
{
    constructor(UserID,Source,Destination)
    {
        this.UserID=UserID;
        this.SourceLocation=Source;
        this.DestinationLocation=Destination;
    }
}
module.exports = LocationClass;