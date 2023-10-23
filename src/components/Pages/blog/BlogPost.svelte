<script lang="ts">
  import ToC from './ToC.svelte'
  import { windowsScrollY, ArticleBox } from '@lib/stores/state'
  export let post: any, postContent, Content, headings: any
  // const JsonContent = JSON.parse(Content)
  // let Content, headings
  // ;(async () => {
  //   ;({ Content, headings } = await post.render())
  // })()
</script>

<h1>{post.data.title}</h1>
<h6>Published:{post.data.publishedAt}</h6>
<p>{post.data.description || ''}</p>
<article>
  {Content}
  <!-- <Content /> -->
</article>
<ToC {headings} />
