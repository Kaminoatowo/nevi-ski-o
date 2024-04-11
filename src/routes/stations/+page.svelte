<script>
	export let data;
	const stations = data.stations;
</script>

<h1>Available stations</h1>

{#each stations as station}
	<div>
		{station.meta.nome} - {station.meta.code}
	</div>
{/each}