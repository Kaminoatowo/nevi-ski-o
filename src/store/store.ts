import { auth, googleProvider } from '../lib/firebase';
import { 
    signInWithPopup, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from 'firebase/auth';
import { writable } from 'svelte/store';
import type { User } from 'firebase/auth';
import { goto } from '$app/navigation';

export const authStore = writable<{ user : User | null }>({
    user: null
});

export const authHandlers = {
    logout: async () => {
        await auth.signOut();
        goto('/');
    },
    loginWithGoogle: async () => {
        await signInWithPopup(auth, googleProvider);
        goto('/');
    },
    signupWithEmailPassword: async (email: string, password: string) => {
        await createUserWithEmailAndPassword(auth, email, password)
        .then(
            (userCredential) => {
                const user = userCredential.user;
                console.log(user);
            }
        )
        .catch(
            (error) => {
                const errorCode = error.code;  
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            }
        );
        goto('/');
    },
    loginWithEmailPassword: async (email: string, password: string) => {
        await signInWithEmailAndPassword(auth, email, password)
        .then(
            (userCredential) => {
                const user = userCredential.user;
                console.log(user);
            }
        )
        .catch(
            (error) => {
                const errorCode = error.code;  
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            }
        );
        goto('/');
    }
}