<script>
  import Message from './Message.svelte'

  export let conversations;
  export let self;

  let selected = null

  function viewConversation() {
    selected = this
  }
</script>

{#if selected }
  <div class="conversation">
    <span on:click="{ () => selected = null }">×</span>
    <ul>
      {#each selected.messages as msg (msg.id)}
        <Message type={ msg.senderId == self.accountId ? "me" : "other" } message={msg} />
      {/each}
    </ul>
  </div>
{:else}
  <ul class="conversations">
    {#each conversations as conv,key (conv.id)}
      <li on:click="{ viewConversation.bind(conv) }">
        <p class="user">{ conv.userId }</p>
        <p class="info"><strong>{ conv.messages.length }</strong> message(s)</p>
      </li>
    {/each}
  </ul>
{/if}
