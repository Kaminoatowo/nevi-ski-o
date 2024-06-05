<script>
    import AnimationFrameSnow from '../lib/components/AnimationFrameSnow.svelte';
    import img from '$lib/assets/Logo_neviskio.png';
</script>

<section class="flex flex-col items-center z-10">
    <img src={img} alt="NeviSki-o" class="w-64" />
    <h1 class=" m-4">Ghe n'è de nef?</h1>
    <!--p>Scopri se c'è neve sulle piste!</!--p-->
    <p class="w-3/4 text-center text-xl m-4">Scopri il bollettino attuale sulla presenza di neve sulle tue piste preferite,
        ottieni previsioni accurate e ricevi notifiche in tempo reale.
    </p>
</section>

<AnimationFrameSnow height=''/>