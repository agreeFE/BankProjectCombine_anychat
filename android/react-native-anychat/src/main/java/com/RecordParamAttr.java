package com;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

public class RecordParamAttr {
    public static String recordflag;
    public static String singleaudioflag;
    public static String recordsavepath;
    public static String recordcontent;

    public static String recordid;
    public static int recordmode;
    public static int recordwidth;
    public static int recordheight;
    public static int recordzhenlv;
    public static int recordmalv;

    public static String recordwatermark;
    public static int singleaudiomode;
    public static int singleaudiomalv;

    public static String recordfilename;

    public static JSONArray recordContentJsonArr;

    public static void parse(String str) {
        JSONObject json = JSON.parseObject(str);

        // recordflag
        RecordParamAttr.recordflag = json.getString("recordflag");

        // singleaudioflag
        RecordParamAttr.singleaudioflag = json.getString("singleaudioflag");
        if(RecordParamAttr.singleaudioflag == null){
            RecordParamAttr.singleaudioflag = "false";
        }

        // recordsavepath
        RecordParamAttr.recordsavepath = json.getString("recordsavepath");

        // recordcontent
        RecordParamAttr.recordcontent = json.getString("recordcontent");

        // recordid
        RecordParamAttr.recordid = json.getString("recordid");

        // recordmode
        RecordParamAttr.recordmode = Integer.parseInt(json.getString("recordmode"));

        // recordwidth
        RecordParamAttr.recordwidth = Integer.parseInt(json.getString("recordwidth"));

        // recordheight
        RecordParamAttr.recordheight = Integer.parseInt(json.getString("recordheight"));

        // recordzhenlv
        RecordParamAttr.recordzhenlv = Integer.parseInt(json.getString("recordzhenlv"));

        // recordmalv
        RecordParamAttr.recordmalv = Integer.parseInt(json.getString("recordmalv"));

        // recordwatermark
        RecordParamAttr.recordwatermark = json.getString("recordwatermark");

        // singleaudiomode
        RecordParamAttr.singleaudiomode = Integer.parseInt(json.getString("singleaudiomode"));

        // singleaudiomalv
        RecordParamAttr.singleaudiomalv = Integer.parseInt(json.getString("singleaudiomalv"));

        // recordfilename
        RecordParamAttr.recordfilename = json.getString("recordfilename");
    }

    public static class RecordContent{
        public String userindex;
        public String streamindex;
        public String recordindex;
    }

    /**
     * 拼装录像格式报文
     * @return
     */
    private static JSONObject packRecordJson() {
        JSONObject json = new JSONObject();
        // 设置录像文件保存路径
        json.put("category", RecordParamAttr.recordsavepath);
        // 设置录像文件名称
        json.put("filename",RecordParamAttr.recordfilename);

        //文字水印修饰
        JSONObject textJson = new JSONObject();
        textJson.put("fontcolor", "0xff0000");
        textJson.put("alpha", 100);
        textJson.put("posx", 5);
        textJson.put("posy", 5);
        textJson.put("fontsize", 36);
        textJson.put("userservertime", 1);
        // 文字水印前缀
        textJson.put("text", RecordParamAttr.recordwatermark + "[timestamp]");
        json.put("textoverlay", textJson);

        // 设置录像帧率
        JSONObject recordParamJson = new JSONObject();
        recordParamJson.put("fps", RecordParamAttr.recordzhenlv);
        recordParamJson.put("clipmode", 2);
        json.put("recordparam", recordParamJson);

        return packStreamList(json);
    }

    /**
     * 拼装录制画面布局参数
     * @param
     * @return
     */
    private static JSONObject packStreamList(JSONObject json) {
        JSONArray ja = new JSONArray();
        JSONArray jsonarr = JSON.parseArray(RecordParamAttr.recordcontent);
        for(int i=0; i<jsonarr.size(); i++) {
            RecordParamAttr.RecordContent rc = JSONObject.parseObject(
                    ((JSONObject)jsonarr.get(i)).toJSONString(), RecordParamAttr.RecordContent.class);
            int userindex = Integer.parseInt(rc.userindex);
            //int userid = Integer.parseInt((String)RoomAttr.alluseridarray.get(userindex));
            //only self mode.
            int userid = -1;
            int streamindex = Integer.parseInt(rc.streamindex);
            int recordindex = Integer.parseInt(rc.recordindex);
            JSONObject oneJson = new JSONObject();
            oneJson.put("userid", userid);
            oneJson.put("streamindex", streamindex);
            oneJson.put("recordindex", recordindex);
            ja.add(oneJson);
        }
//		always false;
//		if(dynamicDeskFlag) {
//			JSONObject oneJson = new JSONObject();
//			oneJson.put("userid", RoomAttr.dynamicUserid);
//			oneJson.put("streamindex", 1);
//			if(ja.size() > 3) {
//				ja.remove(3);
//				oneJson.put("recordindex", 3);
//			} else {
//				oneJson.put("recordindex", ja.size());
//			}
//			ja.add(oneJson);
//		}
        RecordParamAttr.recordContentJsonArr = ja;
        // 设置视频流布局及样式，0普通四分屏；1双画中画布局
        if(ja.size() == 3) {
            //三分屏，右侧竖着俩
            json.put("layoutstyle", 2);
        } else {
            //设置布局方式为普通四分屏布局
            json.put("layoutstyle", 0);
        }

        //佰锐录像窗口布局只有2、3、4、8、9、16
        if(4<ja.size()&&ja.size()<9) {
            json.put("recordlayout", 8);
        }else if(9<ja.size()) {
            json.put("recordlayout", 16);
        }else {
            json.put("recordlayout", ja.size());
        }
        json.put("streamlist", ja);
        return json;
    }

    public static String generateJSON() {
        return packRecordJson().toJSONString();
    }
}