export const getActiveTabValue = (pathname: any) => {
    switch (pathname) {
      case '/':
        return '1';
      case '/RealEstate':
        return '2';
      case '/LookingProperty':
        return '3';
      case '/YourOffer':
        return '4';
      case '/AboutUs':
        return '5';
      case '/OurLocation':
        return '6';
      case '/Contact':
        return '7';
      default:
        return '1';
    }
  };