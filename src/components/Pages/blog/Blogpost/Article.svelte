<script lang="ts">
  import { ArticleBox } from '@lib/stores/state'
</script>

<article bind:this={$ArticleBox}>
  <slot />
</article>
