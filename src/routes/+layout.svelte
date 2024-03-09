<script lang="ts">
    import '../app.css';
    import { 
        AppShell, 
        AppBar, 
        AppRail, 
        AppRailAnchor, 
        AppRailTile,
        Drawer, 
        getDrawerStore,
        type DrawerSettings, 
        type DrawerStore,
        initializeStores
    } from '@skeletonlabs/skeleton';
    import { LightSwitch } from '@skeletonlabs/skeleton';
    import type { AfterNavigate } from '@sveltejs/kit';
    import { afterNavigate } from '$app/navigation';
    import { page } from '$app/stores';

    // to scroll back to top when navigating to a new page
    afterNavigate((params: AfterNavigate) => {
        const isNewPage = params.from?.url.pathname !== params.to?.url.pathname;
        const elemPage = document.querySelector('#page');
        if (isNewPage && elemPage !== null) {
            elemPage.scrollTop = 0;
        }
    });

    // to manage the current tile
    let currentTile: number = 0;

    initializeStores();
    const drawerStore = getDrawerStore();
    const settings: DrawerSettings = { width: 'w-[280px] md:w-[480px]' };
    function drawerOpen(): void {
		drawerStore.open(settings);
	}
</script>

<Drawer>
    {#if $drawerStore.id === 'example-1'}
		<!-- (show 'example-1' contents) -->
	{:else if $drawerStore.id === 'example-2'}
		<!-- (show 'example-2' contents) -->
	{:else}
		<!-- (fallback contents) -->
	{/if}
</Drawer>

<AppShell regionPage="relative" slotPageHeader="sticky top-0 z-10">
    <svelte:fragment slot="pageHeader">
		<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
            <svelte:fragment slot="lead">
                <button
                    class="p-2"
                    aria-label="Open drawer"
                    on:click={drawerOpen}>Menu</button>
                <AppRail>
                    <svelte:fragment slot="lead">
                        <AppRailAnchor href="/">
                            <svelte:fragment slot="lead">(home)</svelte:fragment>
                            <span>Home</span>
                        </AppRailAnchor>
                    </svelte:fragment>
                </AppRail>
            </svelte:fragment>
            (title)
            <svelte:fragment slot="trail">
                <LightSwitch />
                <AppRail>
                    <svelte:fragment slot="lead">
                        <AppRailTile group={currentTile} name="tile-user" value={4}>
                            <svelte:fragment slot="lead">(user)</svelte:fragment>
                            <span>User</span>
                        </AppRailTile>
                    </svelte:fragment>
                </AppRail>
            </svelte:fragment>
        </AppBar>
	</svelte:fragment>
    <slot />
    <svelte:fragment slot="pageFooter">
        <section class="flex flex-col items-center">
            <p>NeviSki-o</p>
        </section>    
    <hr class="opacity-20" />    
    <section class="flex flex-col items-center">
        <p>© 2024 OGD design 🦡</p>
    </section>
    </svelte:fragment>
</AppShell>


