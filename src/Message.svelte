<script>
	export let message;
  export let type;

  let isSticker = false
  let loaded = false
  let source
  let medias = []

  let stickerR = new RegExp("^\ https\:\/\/t\.co/(.*)$")
  let stickerURL = new RegExp("twitter\.com\/i\/stickers\/image\/(\\d+)")

  $: {
    medias = message.mediaUrls.map(url => {
      let ret = {
        type: url.split('.').pop(),
        url: message.id + '-' + url.split('/').pop()
      }
      console.log(ret)
      return ret
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
    <p>{ message.text }</p>
    {#each medias as media }
      {#if media.type == 'jpg' }
        <img src="archive/direct_message_media/{ media.url }">
      {:else if media.type == 'mp4'}
        <video controls loop>
          <source src="archive/direct_message_media/{ media.url }" type="video/mp4">
        </video>
      {/if}
    {/each}
  </li>
{/if}
