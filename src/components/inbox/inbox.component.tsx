import React, {useEffect, useState} from 'react';
import {SafeAreaView, FlatList, Text, View, StyleSheet} from 'react-native';
import {LeanplumInbox, Message, Inbox} from 'react-native-leanplum';
import {MessageItem} from './message-item.component';

export const InboxComponent = () => {
  const [inbox, setInbox] = useState<Inbox>();
  useEffect(() => {
    async function getInbox() {
      const inboxValue: Inbox = await LeanplumInbox.inbox();
      setInbox(inboxValue);
    }
    getInbox();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.messagesInfo}>
        <Text>
          Unread: {inbox?.unreadCount}, Total: {inbox?.count}
        </Text>
      </View>

      <FlatList
        data={inbox?.allMessages}
        renderItem={({item}) => <MessageItem message={item} />}
        keyExtractor={(item: Message) => item.messageId}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messagesInfo: {
    alignItems: 'center',
    marginVertical: 5,
  },
});
