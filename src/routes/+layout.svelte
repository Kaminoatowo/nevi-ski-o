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

    
                        
</script>

<Drawer>
    <SideNavbar {drawerClose} />
</Drawer>

<AppShell regionPage="relative" slotPageHeader="sticky top-0 z-10">
    <Header />
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

