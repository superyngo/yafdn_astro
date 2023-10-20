<script lang="ts">
  export let thisElement
</script>

<svg
  bind:this={thisElement}
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  stroke-width="2"
  stroke="currentColor"
  fill="none"
  width="24"
  height="24"
  aria-hidden="true"
  ><path
    stroke-linecap="round"
    stroke-linejoin="round"
    d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
  ></path>
</svg>

<style scoped>
  svg {
    --rotateDegree: 0deg;
    rotate: var(--rotateDegree);
    transition: rotate ease 500ms;
  }
</style>
