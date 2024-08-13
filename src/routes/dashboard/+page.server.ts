import { initializeApp } from 'firebase/app';
import type { Actions } from './$types';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore, collection, onSnapshot, addDoc } from 'firebase/firestore';

export const actions: Actions = {
    add: async ({ request }) => {

        const data = await request.formData();
        const name = data.get('name');
        const group = data.get('group');
        const title = data.get('title');

        const db = getFirestore();
	    const colRef = collection(db, "stations");

        let stations: {
                [x: string]: string; id: string; 
            }[] = [];

        onSnapshot(colRef, (snapshot) => {
            snapshot.docs.forEach((doc) => {
                stations.push({ ...doc.data(), id: doc.id });
            })
            //console.log(stations);
        });

        //if (stations.some((item) => item.name !== name)) {
        await addDoc(colRef, {
            group: group,
            name: name,
            title: title,
        });
        if (stations.some((item) => item.name !== name)) {
            console.log('Successfully added station');
        } else {
            console.log('Error adding station');
        }
    }
}
