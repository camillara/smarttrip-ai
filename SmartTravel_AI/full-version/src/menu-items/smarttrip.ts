// assets
import { Airplane } from 'iconsax-reactjs';

// types
import { NavItemType } from 'types/menu';

// icons
const icons = {
  smartTrip: Airplane
};

// ==============================|| MENU ITEMS - SMARTTRIP AI ||============================== //

const smartTrip: NavItemType = {
  id: 'smarttrip-ai',
  title: 'SmartTrip AI',
  type: 'group',
  url: '/smarttrip-ai',
  icon: icons.smartTrip
};

export default smartTrip;
