<script lang="ts">
    import '../app.css';
    import { 
        AppShell, 
        Drawer, 
        getDrawerStore,
        type DrawerSettings, 
        type DrawerStore,
        initializeStores
    } from '@skeletonlabs/skeleton';
    import type { AfterNavigate } from '@sveltejs/kit';
    import { afterNavigate } from '$app/navigation';
    import { page } from '$app/stores';
    import SideNavbar from '$lib/components/SideNavbar.svelte';
    import Header from '$lib/components/Header.svelte';
    
    //import { drawerOpen } from '$lib/drawer';
    import { 
        AppBar, popup,
        type PopupSettings, 
    } from '@skeletonlabs/skeleton';
    import { MenuBurgerIcon, UserIcon } from 'svelte-uicons/rounded/regular';
    import { 
        computePosition, autoUpdate, offset, 
        shift, flip, arrow 
    } from '@floating-ui/dom';
    import { storePopup } from '@skeletonlabs/skeleton';

    		
    // to scroll back to top when navigating to a new page
    afterNavigate((params: AfterNavigate) => {
        const isNewPage = params.from?.url.pathname !== params.to?.url.pathname;
        const elemPage = document.querySelector('#page');
        if (isNewPage && elemPage !== null) {
            elemPage.scrollTop = 0;
        }
    });

    initializeStores();
    const drawerStore = getDrawerStore();
    const settings: DrawerSettings = { width: 'w-[280px] md:w-[480px]' };
    function drawerOpen(): void {
		drawerStore.open(settings);
	}
    const drawerClose = (): void => {
        drawerStore.close();
    };
           
    storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
        
    const popupClick: PopupSettings = {
        event: 'click',
        target: 'popupClick',
        placement: 'left',
    };
</script>

<Drawer>
    <SideNavbar {drawerClose} />
</Drawer>

<AppShell regionPage="relative" slotPageHeader="sticky top-0 z-10">
    <svelte:fragment slot="pageHeader">
        <AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
            <svelte:fragment slot="lead">
                <button
                    class="p-2"
                    aria-label="Open drawer"
                    on:click={drawerOpen}>
                    <MenuBurgerIcon size="1.5x" />
                </button>
                <a href="/">
                    <img src="src/public/Logo_neviskio.png" alt="NeviSki-o" class="w-16" />
                </a>
            </svelte:fragment>
            <a href="/" class="pl-1 text-xl font-bold md:pl-2 md:text-2xl">
                Nevi<span class="gradient-heading">Ski</span>o
            </a>
            <svelte:fragment slot="trail">
                <button use:popup={popupClick}>
                    <UserIcon size="1.5x" />
                </button>                
                <div class="card p-4 variant-filled-primary" data-popup="popupClick">
                    <a href="/login">
                        <p>(login)</p>
                    </a>
                    <a href="/signup">
                        <p>(signup)</p>
                    </a>
                </div>           
            </svelte:fragment>
        </AppBar>
    </svelte:fragment>
    
    <slot />
    <svelte:fragment slot="pageFooter">
        <section class="m-5 flex flex-col items-center">
            <img src="src/public/Logo_neviskio.png" alt="NeviSki-o" class="w-16 -m-2" />
            <p class="m-2">NeviSki-o</p>
            <span class="variant-soft badge">
                0.0.1
            </span>
        </section>    
    <hr class="m-2 opacity-20" />    
    <section class="m-5 flex flex-col items-center">
        <p>© 2024 OGD design 🦡</p>
    </section>
    </svelte:fragment>
</AppShell>

