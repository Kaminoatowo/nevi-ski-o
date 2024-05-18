<script lang="ts">
	export let drawerClose: () => void;
	//export let logout: () => void;
	//export let session: any;
	import { page } from '$app/stores';

	$: classesActive = (href: string) =>
		href === $page.url.pathname ? '!variant-filled-primary rounded-lg p-2' : '';
</script>

<div class="space-y-4 overflow-y-auto p-4 pb-20">
    <nav class="list-nav">
    <h2 class="text-2xl font-bold">About</h2>
    <ul>
        <li>
            <a
            href="https://github.com/Kaminoatowo/nevi-ski-o"
            target="_blank"
            on:click={drawerClose}
            >
                <span>Github</span>
            </a>
        </li>
        <!--li>
            <a
            href="mailto:contact@neviskio.com"
            target="_blank"
            rel="noopener"
            on:click={drawerClose}
            >
                <span>Contatti</span>
            </a>
        </!--li-->
        <li>
            <a
            class={classesActive('/terms')}
            href="/terms"
            on:click={drawerClose}
            >
                <span>Termini</span>
            </a>
        </li>
        <li>
            <a
            class={classesActive('/')}
            href="/privacy"
            on:click={drawerClose}
            >
                <span>Privacy</span>
            </a>
        </li>
    </ul>
    </nav>
</div>
