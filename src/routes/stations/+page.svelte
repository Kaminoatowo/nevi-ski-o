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
<div class="md:w-1/2 mx-1 md:mx-auto bg-surface-500 rounded-lg mt-5 flex flex-col items-center">

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