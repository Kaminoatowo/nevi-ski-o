<script lang="ts">
    // login/+page.svelte
    import { session } from '$lib/session';
    import { auth } from '$lib/firebase.client';
    import {
    GoogleAuthProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
    type UserCredential
    } from 'firebase/auth';
    import { goto } from '$app/navigation';

    let email: string = '';
    let password: string = '';

    async function loginWithMail() {
    await signInWithEmailAndPassword(auth, email, password)
    .then((result) => {
    const { user }: UserCredential = result;
    session.set({
        loggedIn: true,
        user: {
        displayName: user?.displayName,
        email: user?.email,
        photoURL: user?.photoURL,
        uid: user?.uid
        }
    });
    goto('/');
    })
    .catch((error) => {
    return error;
    });
    }

    async function loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
    .then((result) => {
    const { displayName, email, photoURL, uid } = result?.user;
    session.set({
        loggedIn: true,
        user: {
        displayName,
        email,
        photoURL,
        uid
        }
    });

    goto('/');
    })
    .catch((error) => {
    return error;
    });
    }
</script>

<div class="login-form">
    <h1 class="m-2">
        Accedi con le credenziali
    </h1>
    <div class="flex justify-center">

        <form on:submit={loginWithMail}>
            <label for="email" >Email</label>
            <input bind:value={email} type="text" placeholder="Email" />
            <label for="password" >Password</label>
            <input bind:value={password} type="password" placeholder="Password" />
            <br>
            <button type="submit">Accedi</button>
        </form>
        
    </div>
    <div>oppure</div>
   
    <button on:click={loginWithGoogle} class="styled-button">Accedi con Google</button>
    <div class="m-2">Non ti sei ancora registrato? <a href="/signup"> Registrati</a></div>
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

.styled-button {
    @apply w-60
}

.login-form {
	@apply flex flex-col items-center justify-center gap-4 w-1/2 mx-auto rounded-lg bg-secondary-500/10 
}
</style>