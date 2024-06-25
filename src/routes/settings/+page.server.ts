import { initializeApp } from 'firebase/app';
import type { Actions } from './$types';
import { getAuth } from 'firebase-admin/auth';

export const actions: Actions = {
    update: async ({ request }) => {
        // TODO
        const data = await request.formData();
        const name = data.get('name');
        const email = data.get('email');
        const password = data.get('password');
        const uid = data.get('uid')?.toString();

        if (typeof(uid) == 'string') {
            initializeApp();
            getAuth()
                .updateUser(uid, {
                    email: email?.toString(),
                    password: password?.toString(),
                    displayName: name?.toString(),
                })
                .then((userRecord) => {
                    // See the UserRecord reference doc for the contents of userRecord.
                    console.log('Successfully updated user', userRecord.toJSON());
                })
                .catch((error) => {
                    console.log('Error updating user:', error);
            });
        }
    }
};