<script lang="ts">
    export let height = 'h-screen'
    export let zIndex = '-z-10'
    import { onMount } from 'svelte'
  
    // a bunch of variables defining the snow and how it falls
    const SNOWFLAKES_COUNT = 150 // on firefox should go smoothly up to 750
    const SNOWFLAKE_MIN_SCALE = 0.1
    const MELTING_SPEED = 1.12
    const WIND_FORCE = 0.01
    const FALL_SPEED = 0.15
    const SNOW_ICONS = ['•', '❅', '❆', '*', '࿔']
    const TARGET_FPS = 60
    const OPACITY = [0.3, 0.5, 0.7, 0.9]
  
    const MS_BETWEEN_FRAMES = 1000 / TARGET_FPS
  
    // this function generates the random configuration with all necessary values
    function randomSnowflakeConfig(i: number) {
      return {
        scale: SNOWFLAKE_MIN_SCALE + 1.5*Math.random() * (1 - SNOWFLAKE_MIN_SCALE),
        x: -20 + Math.random() * 120,
        y: -100 + Math.random() * 200,
        rotation: Math.floor(Math.random() * 360),
        snowIcon: SNOW_ICONS[i % SNOW_ICONS.length],
        opacity: OPACITY[Math.floor(Math.random() * OPACITY.length)],
      }
    }
  
    // actually generating the snowflakes
    let snowflakes = new Array(SNOWFLAKES_COUNT)
    .fill(undefined, 0, SNOWFLAKES_COUNT)
      .map((_, i) => randomSnowflakeConfig(i))
      .sort((a, b) => a.scale - b.scale)
  
    // in onMount we define the loop function and start our animationFrame loop.
    onMount(() => {
      let frame : number, lastTime: number
  
      function loop(timestamp: number) {
        frame = requestAnimationFrame(loop)
  
        const elapsed: number = timestamp - lastTime
        lastTime = timestamp
  
        let framesCompleted = elapsed / MS_BETWEEN_FRAMES
  
        if (isNaN(framesCompleted)) {
          framesCompleted = 1        
        }
  
        snowflakes = snowflakes.map(flake => {
          if (flake.y >= 100) {
            flake.opacity = Math.pow(flake.opacity, MELTING_SPEED)
          } else {
            flake.y += FALL_SPEED * flake.scale * framesCompleted
            flake.x += WIND_FORCE * flake.scale * framesCompleted
            flake.rotation += 1 * framesCompleted
          }
          if (flake.opacity <= 0.02) {
            flake.y = -20
            flake.x = -20 + Math.random() * 120
            flake.opacity = 0.999
          }
          return flake
        })
      }
  
    loop(performance.now());
  
      return () => cancelAnimationFrame(frame)
    })
  </script>
  
  <style>
  
    .snowflake {
      color: #fff;
      font-size: 1.2rem;
      line-height: 1.2rem;
      font-family: Arial, sans-serif;
      text-shadow: 0 0 5px #000;
      position: absolute;
      z-index: 1000;
      overflow: hidden;
    }
  
    .snowframe {
      pointer-events: none;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      overflow: hidden;
    }
  </style>
  
  <div class="snowframe {height} {zIndex}" aria-hidden="true">
    {#each snowflakes as flake}
      <div
        class="snowflake"
        style={`opacity: ${flake.opacity}; transform: scale(${flake.scale}) rotate(${flake.rotation}deg); left: ${flake.x}%; top: calc(${flake.y}% - ${flake.scale}rem)`}>
        {flake.snowIcon}
      </div>
    {/each}
  </div>
  