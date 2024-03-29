<script lang="ts">
    import { authHandlers } from "../../store/store";
    import { GoogleIcon } from 'svelte-uicons/brands';

    let email = '';
    let password = '';
</script>

<main class="flex flex-col items-center justify-center">
    <div class="mt-12 rounded-lg bg-secondary-500/10 px-4 py-4 w-1/2">
        <h1 class="text-2xl text-white font-bold">Accedi</h1>
        <form class="mt-12">
            <input bind:value={email} type="email" placeholder="Email" class="p-4 bg-white text-black rounded-lg w-full" />
            <input bind:value={password} type="password" placeholder="Password" class="p-4 bg-white text-black rounded-lg w-full mt-4" />
            <button on:click={async () => await authHandlers.loginWithEmailPassword(email, password)} type="submit" class="p-4 bg-white text-black rounded-lg mt-12 font-bold w-full">
                Accedi
            </button>
        </form>
        
        <div class="flex">
            <button on:click={authHandlers.loginWithGoogle} class="p-4 bg-white text-black rounded-lg mt-12 font-bold mx-auto">
                <GoogleIcon size="1.5x" class="mr-2 inline-block"/>
                Accedi con Google
            </button>
        </div>
        <p class="mt-4 text-white text-center">Non hai un account? <a href="/signup" class="underline">Registrati</a></p>
    </div>
</main>