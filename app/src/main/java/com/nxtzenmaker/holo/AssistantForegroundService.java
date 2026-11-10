package com.nxtzenmaker.holo;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Intent;
import android.os.IBinder;

public class AssistantForegroundService extends Service {
    public static final String ACTION_START = "com.nxtzenmaker.holo.START_SESSION";
    private static final String CHANNEL_ID = "assistant_session";
    private static final int NOTIFICATION_ID = 41;

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        if (ACTION_START.equals(intent != null ? intent.getAction() : null)) {
            createChannel();
            startForeground(NOTIFICATION_ID, buildNotification());
        }
        return START_NOT_STICKY;
    }

    private Notification buildNotification() {
        Intent launchIntent = new Intent(this, MainActivity.class);
        PendingIntent pendingIntent = PendingIntent.getActivity(
                this, 0, launchIntent,
                PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
        return new Notification.Builder(this, CHANNEL_ID)
                .setSmallIcon(android.R.drawable.ic_btn_speak_now)
                .setContentTitle("RJN Assistant सक्रिय")
                .setContentText("Voice session background में चल रही है")
                .setContentIntent(pendingIntent)
                .setOngoing(true)
                .setCategory(Notification.CATEGORY_SERVICE)
                .build();
    }

    private void createChannel() {
        NotificationManager manager = getSystemService(NotificationManager.class);
        if (manager != null) {
            manager.createNotificationChannel(new NotificationChannel(
                    CHANNEL_ID, "Assistant session", NotificationManager.IMPORTANCE_LOW));
        }
    }

    @Override
    public void onDestroy() {
        stopForeground(STOP_FOREGROUND_REMOVE);
        super.onDestroy();
    }

    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }
}
