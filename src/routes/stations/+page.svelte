<script script>
	/*export let data;
	const stations = data.stations;*/
</script>

<div class="w-1/2 mx-auto bg-surface-500 rounded-lg mt-5">
	<!--h1 class="text-center h-20 p-5 text-2xl">Stazioni consultabili</!--h1>
	
	{#each stations as station}
		<div class="h-10 border rounded text-center p-1 m-4 bg-secondary-500 hover:bg-success-500">
			<a href="/stations/{station.meta.code}">
				<h2 class="text-lg hover:text-xl">
					{station.meta.name}
				</h2>
			</a>
		</div>
	{/each}
	<br-->

	<div class="">
		<form action="get">
			<input type="text" name="search" placeholder="Cerca stazione" class="w-1/2 p-2 m-2 rounded-lg text-black">
			<button type="submit" class="bg-primary-500 p-2 m-2 rounded-lg">Cerca</button>
		</form>
	</div>
</div>