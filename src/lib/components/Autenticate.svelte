<script lang="ts">
    import { authHandlers } from "../../store/store";
</script>

<main class="flex flex-col items-center justify-center">
    <div class="mt-12">
        <h1 class="text-2xl text-white font-bold">Login</h1>
        <button on:click={authHandlers.loginWithGoogle} class="p-4 bg-white text-black rounded-lg mt-12 font-bold">
            Sign in with Google
        </button>
    </div>
</main>