<script>
	export let message;
  export let type;

  let isSticker = false
  let loaded = false
  let source
  let media

  let imgExts = ['jpg', 'jpeg', 'png', 'gif']
  let stickerR = new RegExp("^\ https\:\/\/t\.co/(.*)$")
  let stickerURL = new RegExp("twitter\.com\/i\/stickers\/image\/(\\d+)")

  $: {
    if (message.mediaUrls.length == 0 && (isSticker = stickerR.test(message.text))) {

      loaded = false

      /* this might look weird (and it is)
       * but this is because twitter link redirection is done via HTML
       * (perhaps because they precisely do not want us to do what we are doing)
       */
      fetch(message.text)
        .then(response => response.text())
        .then(content => {
          let r = content.match(stickerURL)
          if (r) {
            loaded = true
            // some stickers are not available at size 64
            source = 'https://ton.twimg.com/stickers/stickers/' + r[1] + '_128.png'
          }
          else {
            console.log(message)
          }
        })
    }

    else if (message.mediaUrls.length) {
      /* twitter allows only one media per message
       * but when it is a video, multiple versions are available,
       * at different resolutions
       * for now we take the first version
       * later on we could fetch the size of each to select the largest
       */
      let url = message.mediaUrls[0].split('/').pop()
      let ext = url.split('.').pop()

      media = {
        type: ext,
        url: `archive/direct_message_media/${message.id}-${url}`
      }

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
    <p>{@html message.text }</p>
    {#if media }
      {#if media.type == 'jpg' }
        <img src="{ media.url }">
      {:else if media.type == 'mp4'}
        <video controls loop>
          <source src="{ media.url }" type="video/mp4">
        </video>
      {/if}
    {/if}
  </li>
{/if}
