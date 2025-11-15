export const getActiveTabValue = (pathname: String) => {
  pathname = subpath(pathname)

  switch (pathname) {
    case '/':
      return '1';
    case '/RealEstate':
      return '2';
    case '/LookingProperty':
      return '3';
    case '/YourOffer':
      return '4';
    case '/Agencies':
      return '5';
    case '/AboutUs':
      return '6';
    case '/Contact':
      return '7';
    default:
      return '1';
  }
};

const subpath = (pathname: String) => {
  if(pathname.includes("AgencyDetails")){
    return '/Agencies'
  } else if (pathname.includes("RealEstateDetails")){
    return '/RealEstate'
  }
  return pathname
}