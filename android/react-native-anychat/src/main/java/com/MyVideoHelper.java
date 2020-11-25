package com;

import com.bairuitech.anychat.AnyChatVideoHelper;

public class MyVideoHelper extends AnyChatVideoHelper {

    @Override
    public void ShowVideo(int userid, int streamindex, byte[] mPixel, int rotation, int mirror) {
        if( streamindex == 1 ){
            rotation += 90;
        }
        super.ShowVideo(userid, streamindex, mPixel, rotation, mirror);
    }
}
