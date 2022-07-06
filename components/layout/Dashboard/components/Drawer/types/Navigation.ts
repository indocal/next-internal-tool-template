import DrawerNavigationMenu from './NavigationMenu';
import DrawerNavigationItem from './NavigationItem';

export type DrawerNavigation = Array<
  | { type: 'MENU'; value: DrawerNavigationMenu }
  | { type: 'ITEM'; value: DrawerNavigationItem }
>;

export default DrawerNavigation;
