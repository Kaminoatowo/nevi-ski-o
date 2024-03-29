<script lang="ts">
    import { authHandlers } from "../../store/store";
    import { GoogleIcon } from 'svelte-uicons/brands';
</script>

<main class="flex flex-col items-center justify-center">
    <div class="mt-12 rounded-lg bg-secondary-500/10 px-4 py-2">
        <h1 class="text-2xl text-white font-bold">Registrati</h1>
        <form class="mt-12">
            <input type="email" placeholder="Email" class="p-4 bg-white text-black rounded-lg w-full" />
            <input type="password" placeholder="Password" class="p-4 bg-white text-black rounded-lg w-full mt-4" />
            <button type="submit" class="p-4 bg-white text-black rounded-lg mt-12 font-bold w-full">
                Registrati
            </button>
        </form>
        <button on:click={authHandlers.loginWithGoogle} class="p-4 bg-white text-black rounded-lg mt-12 font-bold">
            <GoogleIcon size="1.5x" class="mr-2 inline-block" />
            Registrati con Google
        </button>
    </div>
</main>