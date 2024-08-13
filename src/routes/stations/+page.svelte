<script lang="ts">
	import { HomeIcon } from "svelte-uicons/rounded/regular";
	import { 
		getFirestore, collection, query, where, onSnapshot
	} from "firebase/firestore";

	export let data;
	const stations = data.stations;

	let pref: {
		[x: string]: string; id: string; 
	}[] = [];
	const db = getFirestore();
	const colRef = collection(db, "preferredStations");
	const q = query(colRef, where("group", "==", "Val di Fassa"));
	console.log(q);

	onSnapshot(q, (snapshot) => {
		snapshot.docs.forEach((doc) => {
			pref.push({ ...doc.data(), id: doc.id });
		})
		console.log(pref);
	});
</script>
<p class="p-6">
	<HomeIcon size="1.0x" class="mr-2 inline-block"/> 
	<a href="/" class="underline underline-offset-2">Home</a>>
	<a href="/stations">Stazioni</a>
</p>
<div class="md:w-1/2 mx-1 md:mx-auto bg-surface-500 rounded-lg mt-5 flex-center">

		<h1 class="h-20 p-5">Stazioni</h1>
		<h2 class="h-20 p-5">Consulta dalla lista</h2>

	{#each pref as preferred }
		<div class="w-4/5 mx-auto h-10 text-center p-1 bg-gradient-to-r from-surface-500 via-secondary-800 to-surface-500 hover:via-warning-500">
			<a href="/stations/{preferred.name}">
				<h3 class="hover:text-xl">
					{preferred.title}
				</h3>
			</a>
		</div>
		<hr class="w-4/5 mx-auto bg-surface-500 h-2">
	{/each}
	<hr>
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