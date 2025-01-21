'use client';

import { Chat } from '@/components/widgets';
import { getChat } from '@/store/actions';
import { nanoId } from '@/utils/functions';
import { Message } from 'ai';
import { useRouter } from 'next/router';

const ChatPage = () => {
  const router = useRouter();

  const { id } = router.query;

  const chats = getChat(id as string);
  let initialMessage: Message[] = [];
  if (chats) {
    initialMessage = JSON.parse(chats.messages)?.messages ?? [];
    if (initialMessage.length === 0)
      initialMessage = [
        {
          id: nanoId(),
          role: 'assistant',
          content: 'How can Brainz help you today?',
        },
      ];
  }

  return <Chat id={id as string} initialMessage={initialMessage} />;
};

export default ChatPage;
