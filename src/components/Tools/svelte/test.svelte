<script lang="ts" context="module">
  export let count = 0
</script>

<script>
  function test() {
    count++
    console.log(count)
  }
</script>

<button id="123" on:click={test}>{count}</button>
