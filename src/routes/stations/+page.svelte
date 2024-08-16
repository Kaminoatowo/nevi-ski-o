<script lang="ts">
	import { HomeIcon } from "svelte-uicons/rounded/regular";
	import { 
		getFirestore, collection, onSnapshot
	} from "firebase/firestore";
	import { type User } from 'firebase/auth';
    import { authStore } from '$lib/store/store';

	export let data;
	const stations = data.stations;

	let currentUser : User | null;
    authStore.subscribe((value) => {
        currentUser = value.user;
    });

	let prefid : string = '';
	let pref: string[] = [];
	const db = getFirestore();
	const colRefU = collection(db, "users");
	const colRefS = collection(db, "stations");

	onSnapshot(colRefU, (snapshot) => {
		snapshot.docs.forEach((doc) => {
			if (doc.data().email === currentUser?.email) {
				prefid = doc.data().preferredStations;
			}
		})
	});

	onSnapshot(colRefS, (snapshot) => {
		snapshot.docs.forEach((doc) => {
			if (prefid.includes(doc.id)) {
				pref.push(doc.data().name);
			}
		})
	});	

	/*let preferredStations: any[] = [];
	let otherStations: any[] = [];
	stations.forEach((station: { meta: { name: string; }; }) => {
		if (pref.includes(station.meta.name)) {
			preferredStations.push(station);
			console.log(station.meta.name);
		} else {
			otherStations.push(station);
		}
	});*/
	//console.log(preferredStations);
</script>
<p class="p-6">
	<HomeIcon size="1.0x" class="mr-2 inline-block"/> 
	<a href="/" class="underline underline-offset-2">Home</a>>
	<a href="/stations">Stazioni</a>
</p>
<div class="md:w-1/2 mx-1 md:mx-auto bg-surface-500 rounded-lg mt-5 flex-center">

		<h1 class="h-20 p-5">Stazioni</h1>
		<h2 class="h-20 p-5">Consulta dalla lista</h2>
	
	{#each stations as station}
		<div class="w-4/5 mx-auto h-10 text-center p-1 bg-gradient-to-r from-surface-500 via-secondary-800 to-surface-500 hover:via-success-500">
			<a href="/stations/{station.meta.name}">
				<h3 class="hover:text-xl">
					{station.meta.title}
				</h3>
			</a>
		</div>
		<hr class="w-4/5 mx-auto bg-surface-500 h-2">
	{/each}
	
	<br>

</div>