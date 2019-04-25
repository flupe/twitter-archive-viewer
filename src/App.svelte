<script>
  import Message from './Message.svelte'

	export let conversation;
	export let self;

  $: messages = conversation.messages.reverse()
</script>

<ul class="conversation">
  {#each messages as msg (msg.id)}
    <Message type={ msg.senderId == self.accountId ? "me" : "other" } message={msg} />
  {/each}
</ul>
