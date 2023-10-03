<script lang="ts" context="module">
  export let count = 0
</script>

<script lang="ts">
  let countShow = 0
  const handleClick = function () {
    count++
    console.log(count)
  }
  $: {
    countShow = count
  }
</script>

<button on:click={handleClick}>{countShow}</button>
