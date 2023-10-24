<script lang="ts">
  import { ArticleBox } from '@lib/stores/state'
  import { ToCHighlighting } from '@lib/utils/svelte/svelteUtils'
</script>

<article
  bind:this={$ArticleBox}
  use:ToCHighlighting={{ ToCBoxSelector: '#ToCBox' }}
>
  <slot />
</article>
