const { SearchedLocationStack, LoadSearchedLocationsFromFile } = require("./SearchedLocationsModel");
const MergeSort = require("../DataStructuresAndAlgorithms/MergeSort");


const getRouteCountsForUser = (stack, userId) => 
    {

    const routeCounts = {};

    let current = stack.head;
    while (current) 
    {
    const location = current.value;

    if (location.UserID == userId) 
    {
    const route = `${location.SourceLocation} -> ${location.DestinationLocation}`;

    if (routeCounts[route]) 
    {
        routeCounts[route] += 1;
    }
    else 
    {
        routeCounts[route] = 1;
    }
    }

    current = current.next;
  }

  return routeCounts;
};

const getTopVisitedLocationsForUser = (userId) => 
{
    if(SearchedLocationStack.head==null)
    {
    LoadSearchedLocationsFromFile();
    }
    const routeCounts = getRouteCountsForUser(SearchedLocationStack, userId);

    const routeArray = Object.entries(routeCounts).map(([route, count]) => 
    ({
    route,
    count,
  }));

  const sortedRoutes = MergeSort(routeArray, (a, b) => b.count - a.count);
  if(sortedRoutes.Length<5)
  {
    return sortedRoutes.slice(0,sortedRoutes.Length)
  }
  return sortedRoutes.slice(0, 5);
};

const getTopVisitedLocationsAPI = (req, res) => {
    const { UserID } = req.params;

  
    if (UserID==null) {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing 'UserID' path parameter",
      });
    }
  
    try {
      const topLocations = getTopVisitedLocationsForUser(UserID);
      res.status(200).json({
        success: true,
        data: topLocations,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

module.exports = { getTopVisitedLocationsAPI };
