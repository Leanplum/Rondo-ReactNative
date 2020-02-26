import React, {useEffect, useState} from 'react';
import {SafeAreaView, FlatList, Text, View, StyleSheet} from 'react-native';
import {LeanplumInbox, Message, Inbox} from 'react-native-leanplum';
import {MessageItem} from './message-item.component';

export const InboxComponent = () => {
  const [inbox, setInbox] = useState<Inbox>();
  const [refreshing, setRefreshing] = useState(false);

  async function getInbox() {
    setRefreshing(true);
    const inboxValue: Inbox = await LeanplumInbox.inbox();
    setInbox(inboxValue);
    setRefreshing(false);
  }
  useEffect(() => {
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
        renderItem={({item}) => (
          <MessageItem message={item} onMessageUpdate={() => getInbox()} />
        )}
        keyExtractor={(item: Message) => item.messageId}
        onRefresh={() => getInbox()}
        refreshing={refreshing}
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
