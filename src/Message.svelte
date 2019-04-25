<script>
	export let message;
  export let type;

  let isSticker = false
  let loaded = false
  let source
  let images = []

  let stickerR = new RegExp("^\ https\:\/\/t\.co/(.*)$")
  let stickerURL = new RegExp("twitter\.com\/i\/stickers\/image\/(\\d+)")

  $: {
    images = message.mediaUrls.map(url => {
      return message.id + '-' + url.split('/').pop()
    })

    isSticker = stickerR.test(message.text)

    if (isSticker) {
      loaded = false

      fetch(message.text)
        .then(response => response.text())
        .then(content => {
          let r = content.match(stickerURL)
          if (r) {
            loaded = true
            source = 'https://ton.twimg.com/stickers/stickers/' + r[1] + '_128.png'
          }
        })
    }
  }

</script>

{#if isSticker }
  <li class="{ type } sticker">
    {#if loaded }
      <img src="{ source }">
    {/if}
  </li>
{:else}
  <li class="{ type } plain">
    { message.text }
    {#each images as url }
      <img src="archive/direct_message_media/{ url }">
    {/each}
  </li>
{/if}
