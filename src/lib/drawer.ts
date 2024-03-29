import { 
    getDrawerStore,
    type DrawerSettings, 
    type DrawerStore,
    initializeStores,
 } from '@skeletonlabs/skeleton';

initializeStores();
const drawerStore = getDrawerStore();
const settings: DrawerSettings = { width: 'w-[280px] md:w-[480px]' };
function drawerOpen(): void {
    drawerStore.open(settings);
}
const drawerClose = (): void => {
    drawerStore.close();
};

export { drawerOpen, drawerClose, drawerStore, settings };