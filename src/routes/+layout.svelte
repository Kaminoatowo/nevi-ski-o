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
        initializeStores,
        type PopupSettings,
        popup
    } from '@skeletonlabs/skeleton';
    //import { LightSwitch } from '@skeletonlabs/skeleton';
    import {    
        MenuBurgerIcon,
        UserIcon
     } from 'svelte-uicons/rounded/regular';
    import type { AfterNavigate } from '@sveltejs/kit';
    import { afterNavigate } from '$app/navigation';
    import { page } from '$app/stores';
    import SideNavbar from '$lib/components/SideNavbar.svelte';
    import { 
        computePosition, autoUpdate, offset, 
        shift, flip, arrow 
    } from '@floating-ui/dom';
    import { storePopup } from '@skeletonlabs/skeleton';
    import type { User } from 'firebase/auth';
    import { authStore, authHandlers } from '../store/store';
    import { onMount } from 'svelte';
    import { auth } from '$lib/firebase';
    import img from '$lib/assets/Logo_neviskio.png';

    onMount(() => {
        const unsubscribe = auth.onAuthStateChanged( async (user) => {
            if(!user) {
                authStore.update(() => {
                    return { user: null };
                });
            }else{
                authStore.update(() => {
                    return { user: user };
                });
            }
        });
        return unsubscribe;
    });

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
    const drawerClose = (): void => {
        drawerStore.close();
    };

    storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
        
    const popupClick: PopupSettings = {
        event: 'click',
        target: 'popupClick',
        placement: 'left',
    };
                      
    let currentUser : User | null;
    authStore.subscribe((value) => {
        currentUser = value.user;
    });
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
                    <img src={img} alt="NeviSki-o" class="w-16" />
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
                    {#if currentUser}
                    <a href="/settings">
                        <p>Impostazioni</p>
                    </a>
                    <a href="/logout">
                        <p>Esci</p>
                    </a>
                    {:else}
                    <a href="/login">
                        <p>Accedi</p>
                    </a>
                    <a href="/signup">
                        <p>Registrati</p>
                    </a>
                    {/if}
                </div>           
            </svelte:fragment>
        </AppBar>
	</svelte:fragment>
    {#if currentUser}
    Current user: {currentUser?.displayName}
    {/if}
    <slot />
    <svelte:fragment slot="pageFooter">
        <section class="m-5 flex flex-col items-center">
            <img src={img} alt="NeviSki-o" class="w-16 -m-2" />
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

