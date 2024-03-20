<script lang="ts">
    // register/+page.svelte
    import { auth } from '$lib/firebase.client';
    import { createUserWithEmailAndPassword } from 'firebase/auth';
    import { goto } from '$app/navigation';
    import { session } from '$lib/session';
   
    let email: string = '';
    let password: string = '';
   
    async function handleRegister() {
        await createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                const { user } = result;
                session.update((cur: any) => {
                    return {
                        ...cur,
                        user,
                        loggedIn: true,
                        loading: false
                        };
                    });
                    goto('/');
                })
                .catch((error) => {
                    throw new Error(error);
                });
    }
</script>

<div class="register-form">
    <h2 class="m-2">Registrati</h2>
    <div class="flex justify-center mb-4">
        <form on:submit={handleRegister}>
            <label for="email" >Email</label>
            <input bind:value={email} type="text" placeholder="Email" />
            <label for="password" >Password</label>
            <input bind:value={password} type="password" placeholder="Password" />
            <button type="submit">Registrami</button>
        </form>
    </div>
</div>


<style lang="postcss">
form {
    @apply w-60 m-0 p-5 rounded-lg bg-surface-500 
}

input {
    @apply w-full p-2 rounded-sm my-2 text-black
}

button {
    @apply block w-full bg-success-500 rounded-sm cursor-pointer
}

div button {
    @apply block bg-success-500 rounded-sm cursor-pointer
}

.register-form {
    @apply flex flex-col items-center justify-center gap-4 w-1/2 mx-auto rounded-lg bg-secondary-500/10 
}
</style>