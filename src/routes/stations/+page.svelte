<script script>
	import { spring } from 'svelte/motion';
	export let data;
	const stations = data.stations;
</script>

<div class="w-1/2 mx-auto bg-surface-500 rounded-lg mt-5">
	<h1 class="text-center h-20 p-5 text-2xl">Stazioni consultabili</h1>
	
	{#each stations as station}
		<div class="h-10 border rounded text-center p-1 m-2 bg-secondary-500 hover:bg-success-500">
			<a href="/stations/{station.meta.code}">
				<h2 class="text-lg hover:text-xl">
					{station.meta.nome}
				</h2>
			</a>
		</div>
	{/each}
</div>