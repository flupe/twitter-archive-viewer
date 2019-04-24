import App from './App.svelte';

let store = new Map()

window.YTD.direct_message.part0.forEach(({ dmConversation }) => {
  let { conversationId, messages } = dmConversation

  if (store.has(conversationId)) {
    let conversation = store.get(conversationId)
    messages.forEach(msg => conversation.messages.push(msg.messageCreate))
  }

  else {
    store.set(conversationId, {
      id: conversationId,
      messages: messages.map(msg => msg.messageCreate)
    })
  }
})

const conversations = Array.from(store.values())
const self = window.YTD.account.part0[0].account

const app = new App({
  target: document.body,
  props: {
    conversation: conversations[4],
    self
  }
});

export default app;
