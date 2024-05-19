<script script>
	import { HomeIcon } from "svelte-uicons/rounded/regular";
	export let data;
	const stations = data.stations;
</script>
<p class="p-6">
	<HomeIcon size="1.0x" class="mr-2 inline-block"/> 
	<a href="/" class="underline underline-offset-2">Home</a>>
	<a href="/stations">Stazioni</a>
</p>
<div class="sm:w-1/2 mx-1 sm:mx-auto bg-surface-500 rounded-lg mt-5">
	<h1 class="text-center h-20 p-5 text-2xl font-bold">Stazioni</h1>
	<h2 class="text-center h-20 p-5 text-xl">Consulta dalla lista</h2>
	
	{#each stations as station}
		<div class="w-1/2 m-auto h-10 border rounded text-center p-1 bg-secondary-500 hover:bg-success-500">
			<a href="/stations/{station.meta.name}">
				<h2 class="text-lg hover:text-xl">
					{station.meta.name}
				</h2>
			</a>
		</div>
	{/each}

	<!--p class="text-center">o</!--p>
	<h2 class="text-center h-20 p-5 text-xl">Cerca una stazione</h2>

	<div-- class="w-4/5 mx-auto">
		<form action="get">
			<input type="text" name="search" placeholder="Cerca stazione" class="w-1/2 p-2 m-2 rounded-lg text-black">
			<button type="submit" class="bg-primary-500 p-2 m-2 rounded-lg">Cerca</button>
		</form>
	</div-->
	
	<br>

</div>