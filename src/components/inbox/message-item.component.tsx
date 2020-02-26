import React from 'react';
import {ListItem} from 'react-native-elements';
import {LeanplumInbox, Message} from 'react-native-leanplum';

export const MessageItem = ({message}: {message: Message}) => {
  const updateMessage = (selectedOptionIndex: number, messageId: string) => {
    selectedOptionIndex
      ? LeanplumInbox.remove(messageId)
      : LeanplumInbox.read(messageId);
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
