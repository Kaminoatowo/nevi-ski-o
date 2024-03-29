<script lang="ts">
    import { drawerStore, settings } from "$lib/drawer";
    import { 
        AppBar, 
        storePopup, type PopupSettings, popup, initializeStores 
    } from "@skeletonlabs/skeleton";
    import { MenuBurgerIcon, UserIcon } from "svelte-uicons/rounded/regular";
    import { 
        computePosition, autoUpdate, offset, 
        shift, flip, arrow 
    } from '@floating-ui/dom';
    		
    storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
        
    const popupClick: PopupSettings = {
        event: 'click',
        target: 'popupClick',
        placement: 'left',
    };

    function drawerOpen(): void {
		drawerStore.open(settings);
	}

    // to manage the current tile
    let currentTile: number = 0;
</script>

<div id="pageHeader">
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
</div>
