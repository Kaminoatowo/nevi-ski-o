<script script>
	import { HomeIcon } from "svelte-uicons/rounded/regular";
	import Search from '$lib/components/Search.svelte';
	export let data;
	const stations = data.stations;
	const uniqueGroups = [...new Set(data.stations.map((/** @type {{ meta: { group: any; }; }} */ station) => station.meta.group).flat())];

	// For search input
	let searchTerm = '';

	const searchStations = () =>{
		let filteredStations;
		return filteredStations = data.stations.filter((/** @type {{ name: string; }} */ station) => {
			let stationName = station.name.toLowerCase();
			return stationName.includes(searchTerm.toLowerCase())
		});
	}
</script>
<p class="p-6">
	<HomeIcon size="1.0x" class="mr-2 inline-block"/> 
	<a href="/" class="underline underline-offset-2">Home</a>>
	<a href="/stations">Stazioni</a>
</p>
<div class="sm:w-1/2 mx-1 sm:mx-auto bg-surface-500 rounded-lg mt-5">
	<h1 class="text-center h-20 p-5 text-2xl font-bold">Stazioni</h1>

	<h2 class="text-center h-20 p-5 text-xl">Cerca una stazione</h2>
	
	<div class="w-4/5 mx-auto">

	<Search bind:searchTerm on:input={searchStations} />
		<!--form action="get">
			<input type="text" name="search" placeholder="Cerca stazione" class="w-1/2 p-2 m-2 rounded-lg text-black">
			<button type="submit" class="bg-primary-500 p-2 m-2 rounded-lg">Cerca</button>
		</!--form-->
	</div>

	<p class="text-center">o</p>
	
	<h2 class="text-center h-20 p-5 text-xl">Consulta dalla lista</h2>
	
	{#if searchTerm}
		{#each searchStations() as station}
			<div class="w-1/2 m-auto h-10 border rounded text-center p-1 bg-secondary-500 hover:bg-success-500">
				<a href="/stations/{station.meta.name}">
					<h2 class="text-lg hover:text-xl">
						{station.meta.name}
					</h2>
				</a>
			</div>
		{/each}
		
	{:else}
		{#each stations as station}
			<div class="w-1/2 m-auto h-10 border rounded text-center p-1 bg-secondary-500 hover:bg-success-500">
				<a href="/stations/{station.meta.name}">
					<h2 class="text-lg hover:text-xl">
						{station.meta.name}
					</h2>
				</a>
			</div>
		{/each}
	{/if}	
	<br>

	<h2>Categories</h2>

	<ul>
		{#each uniqueGroups as cat}
			<li>
				<h3>
					<a href="/stations/group/{cat}">{cat}</a>
				</h3>
			</li>
		{/each}
	</ul>
</div>