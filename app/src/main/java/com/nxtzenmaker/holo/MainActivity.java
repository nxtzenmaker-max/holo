package com.nxtzenmaker.holo;

import android.Manifest;
import android.app.Activity;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.provider.Settings;
import android.webkit.JavascriptInterface;
import android.webkit.PermissionRequest;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import java.util.ArrayList;
import java.util.List;

public class MainActivity extends Activity {
    private static final int PERMISSION_REQUEST = 100;
    private WebView webView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        webView = new WebView(this);
        configureWebView();
        setContentView(webView);
        requestRelevantPermissions();
    }

    private void configureWebView() {
        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setMediaPlaybackRequiresUserGesture(false);
        settings.setAllowFileAccess(false);
        settings.setAllowContentAccess(false);
        webView.setWebViewClient(new WebViewClient());
        webView.setWebChromeClient(new WebChromeClient() {
            @Override
            public void onPermissionRequest(PermissionRequest request) {
                String[] requested = request.getResources();
                for (String resource : requested) {
                    if (PermissionRequest.RESOURCE_AUDIO_CAPTURE.equals(resource)) {
                        runOnUiThread(() -> request.grant(new String[]{PermissionRequest.RESOURCE_AUDIO_CAPTURE}));
                        return;
                    }
                }
                request.deny();
            }
        });
        webView.addJavascriptInterface(new AndroidBridge(), "Android");
        webView.loadUrl("file:///android_asset/index.html");
    }

    private void requestRelevantPermissions() {
        List<String> permissions = new ArrayList<>();
        if (Build.VERSION.SDK_INT >= 23) permissions.add(Manifest.permission.RECORD_AUDIO);
        if (Build.VERSION.SDK_INT >= 33) permissions.add(Manifest.permission.POST_NOTIFICATIONS);
        if (Build.VERSION.SDK_INT >= 31) {
            permissions.add(Manifest.permission.BLUETOOTH_CONNECT);
            permissions.add(Manifest.permission.BLUETOOTH_SCAN);
        }
        List<String> missing = new ArrayList<>();
        for (String permission : permissions) {
            if (checkSelfPermission(permission) != PackageManager.PERMISSION_GRANTED) missing.add(permission);
        }
        if (!missing.isEmpty()) requestPermissions(missing.toArray(new String[0]), PERMISSION_REQUEST);
    }

    public class AndroidBridge {
        @JavascriptInterface
        public void startBackgroundSession() {
            Intent intent = new Intent(MainActivity.this, AssistantForegroundService.class)
                    .setAction(AssistantForegroundService.ACTION_START);
            if (Build.VERSION.SDK_INT >= 26) startForegroundService(intent);
            else startService(intent);
        }

        @JavascriptInterface
        public void stopBackgroundSession() {
            stopService(new Intent(MainActivity.this, AssistantForegroundService.class));
        }

        @JavascriptInterface
        public void openBatterySettings() {
            Intent intent = new Intent(Settings.ACTION_REQUEST_IGNORE_BATTERY_OPTIMIZATIONS,
                    Uri.parse("package:" + getPackageName()));
            startActivity(intent);
        }
    }
}
