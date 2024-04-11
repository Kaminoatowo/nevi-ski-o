<script>
	export let data;
	const stations = data.stations;
</script>

<h1>Available stations</h1>

{#each stations as station}
	<div>
		<a href="/stations/{station.meta.code}">
			{station.meta.nome}
		</a>
	</div>
{/each}