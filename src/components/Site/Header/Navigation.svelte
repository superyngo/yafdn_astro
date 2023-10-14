<script>
  import Navitem from '@/components/UIs/LinkItems.svelte'
  import { navItems } from '@lib/utils/config'
</script>

<nav class="wrapper">
  {#each navItems as navItem}
    <Navitem href={navItem.href} name={navItem.name} />
  {/each}
</nav>

<style scoped>
  .wrapper {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    place-items: center;
    gap: 0.5rem;
  }
</style>
