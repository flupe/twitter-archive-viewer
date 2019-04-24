<script>
	export let conversation;
	export let self;

  $: messages = conversation.messages.reverse()
</script>

<ul class="conversation">
  {#each messages as msg (msg.id)}
    <li class="{ msg.senderId == self.accountId ? "me" : "other" }">{ msg.text }</li>
  {/each}
</ul>
