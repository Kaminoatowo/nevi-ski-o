<script lang="ts">
    import type { User } from 'firebase/auth';
    import { authStore } from '$lib/store/store';
    import { 
		getFirestore, collection, onSnapshot
	} from "firebase/firestore";
    
    let currentUser : User | null;
    authStore.subscribe((value) => {
        currentUser = value.user;
    });

    let role : string = '';
    const db = getFirestore();
	const colRefU = collection(db, "users");

	onSnapshot(colRefU, (snapshot) => {
		snapshot.docs.forEach((doc) => {
			if (doc.data().email === currentUser?.email) {
                role = doc.data().role;
			}
		})
	});
</script>

<div class="flex-center">
    <h1 class="p-5">Ciao {currentUser?.displayName?.split(" ")[0]}!</h1>

    {#if role === 'admin'}    
        <button class="rounded-md bg-warning-500">
            <a href="/dashboard">
                Dashboard
            </a>
        </button>
    {/if}
    
    <h2 class="p-3">Qui puoi modificare le tue informazioni personali.</h2>

    <div>
        <form method="POST" action="?/update">
            <label for="name">Nome</label>
            <input type="text" id="name" name="name" placeholder={currentUser?.displayName}>

            <label for="email">Email</label>
            <input type="email" id="email" name="email" placeholder={currentUser?.email}>

            <label for="password">Password</label>
            <input type="password" id="password" name="password" placeholder="*********">

            <input type="hidden" id="uid" name="uid" value={currentUser?.uid}>

            <br>
            <button type="submit">Aggiorna</button>
        </form>
    </div>
</div>

<style>

    form {
        @apply flex flex-col items-center;
    }

    input {
        @apply m-1 p-1 w-52 text-primary-900;
    }

    button {
        @apply m-1 p-1 w-52;
    }
</style>