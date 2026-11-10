package com.nxtzenmaker.holo;

import android.content.Intent;
import android.service.quicksettings.Tile;
import android.service.quicksettings.TileService;

public class AssistantTileService extends TileService {
    @Override
    public void onStartListening() {
        super.onStartListening();
        updateTile();
    }

    @Override
    public void onClick() {
        super.onClick();
        Tile tile = getQsTile();
        if (tile == null) return;
        if (tile.getState() == Tile.STATE_ACTIVE) {
            stopService(new Intent(this, AssistantForegroundService.class));
            tile.setState(Tile.STATE_INACTIVE);
        } else {
            Intent intent = new Intent(this, AssistantForegroundService.class)
                    .setAction(AssistantForegroundService.ACTION_START);
            startForegroundService(intent);
            tile.setState(Tile.STATE_ACTIVE);
        }
        tile.updateTile();
    }

    private void updateTile() {
        Tile tile = getQsTile();
        if (tile != null) {
            tile.setLabel("RJN Assistant");
            tile.setState(Tile.STATE_INACTIVE);
            tile.updateTile();
        }
    }
}
