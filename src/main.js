import App from './App.svelte';

let store = new Map()

let convIdMap = {}

const conversations = []
const self = window.YTD.account.part0[0].account

window.YTD.direct_message.part0.forEach(({ dmConversation }, i) => {
  let { conversationId, messages } = dmConversation

  if (convIdMap[conversationId]) {
    let conversation = conversations[convIdMap[conversationId]]
    messages.forEach(msg => conversation.messages.unshift(msg.messageCreate))
  }

  else {
    convIdMap[conversationId] = conversations.length
    let { senderId, recipientId } = messages[0].messageCreate

    conversations.push({
      id: conversationId,
      messages: messages.map(msg => msg.messageCreate).reverse(),
      userId: senderId == self.accountId ? recipientId : senderId
    })
  }
})

conversations.sort((a, b) => b.messages.length - a.messages.length)

const app = new App({
  target: document.body,
  props: { conversations, self }
});

export default app;
