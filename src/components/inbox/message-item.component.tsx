import React from 'react';
import {ListItem} from 'react-native-elements';
import {LeanplumInbox, Message} from '@leanplum/react-native-sdk';

export const MessageItem = ({
  message,
  onMessageUpdate,
}: {
  message: Message;
  onMessageUpdate: () => void;
}) => {
  const updateMessage = async (
    selectedOptionIndex: number,
    messageId: string,
  ) => {
    selectedOptionIndex
      ? LeanplumInbox.remove(messageId)
      : LeanplumInbox.read(messageId);
    onMessageUpdate();
  };
  return (
    <ListItem
      key={message.messageId}
      title={message.title}
      subtitle={message.subtitle}
      leftAvatar={{source: {uri: message.imageUrl}}}
      checkmark={message.isRead}
      buttonGroup={{
        buttons: ['Read', 'Remove'],
        onPress: index => updateMessage(index, message.messageId),
      }}
      bottomDivider
    />
  );
};
