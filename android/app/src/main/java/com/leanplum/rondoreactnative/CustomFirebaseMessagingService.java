package com.leanplum.rondoreactnative;

import androidx.annotation.NonNull;
import com.google.firebase.messaging.RemoteMessage;
import com.leanplum.LeanplumPushFirebaseMessagingService;
import com.leanplum.internal.Log;

public class CustomFirebaseMessagingService extends LeanplumPushFirebaseMessagingService {

  @Override
  public void onNewToken(@NonNull String token) {
    super.onNewToken(token);
    Log.e("onNewToken: " + token);
  }

  @Override
  public void onMessageReceived(@NonNull RemoteMessage remoteMessage) {
    super.onMessageReceived(remoteMessage);
    Log.e("onMessageReceived: " + remoteMessage.getData());
  }

}
