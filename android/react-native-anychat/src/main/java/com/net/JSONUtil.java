package com.net;

import android.text.TextUtils;
import android.util.Log;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.google.gson.reflect.TypeToken;

import org.json.JSONArray;
import org.json.JSONObject;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

/**
 * Http 网络请求服务
 * Created by fgq</br>
 * Copyright ©2018 juziwl, All Rights Reserved.
 */
public class JSONUtil {
	
	/**
	 * 谷歌 JSON 解析原生对象
	 */
	public static final Gson gson = new Gson();

	/**
	 * 将指定的对象转换到字符串显示方式
	 * @param obj
	 * @return
     */
	public static String toJson(Object obj){
		return gson.toJson(obj);
	}

	/**
	 * 从 JSON 中读取到指定类型数组对象并转化到指定类型数组
	 * @param json
	 * @param type
	 * @return
	 */
	public static <T> List<T> parseToList(String json, Class<T> type) {
		ArrayList<T> lcs = new ArrayList<>();
		if(TextUtils.isEmpty(json) || json.equals("[]") || json.equals("null")) return lcs;

		JsonParser parser = new JsonParser();
		JsonArray array = parser.parse(json).getAsJsonArray();
		for (JsonElement obj : array) {
			try{
				T t = gson.fromJson(obj, type);
				lcs.add(t);
			}catch(Exception e){
			}
		}
		return lcs;
	}

	/**
	 * 从 JSON 中读取到指定类型数组对象并转化到指定类型数组
	 * @param json
	 * @param type
	 * @return
	 */
	public static <T> ArrayList<T> parseToArrayList(String json, Class<T> type) {
		ArrayList<T> lcs = new ArrayList<>();
		if(TextUtils.isEmpty(json) || json.equals("[]") || json.equals("null")) return lcs;

		JsonParser parser = new JsonParser();
		JsonArray array = parser.parse(json).getAsJsonArray();
		for (JsonElement obj : array) {
			try{
				T t = gson.fromJson(obj, type);
				lcs.add(t);
			}catch(Exception e){
			}
		}
		return lcs;
	}

	/**
	 * 读取 Json 数组
	 * @param json
	 * @return
     */
	public static JsonArray getJsonArray(String json, String key){
		String arrayString = getString(json,key);
		if(TextUtils.isEmpty(arrayString)) return null;
		JsonParser parser = new JsonParser();
		return parser.parse(arrayString).getAsJsonArray();
	}

	/**
	 * 从 Json 数组中读取指定位置的元素
	 * @param array
	 * @param index
     * @return
     */
	public static JsonElement getJsonFromArray(JsonArray array, int index){
		return array.size() > index ? array.get(index) : null;
	}

	/**
	 * 获取 Json 数组
	 * @param json
	 * @param key
     * @return
     */
	public static JsonArray getJsonArray(JsonElement json, String key){
		JsonObject object = json.getAsJsonObject();
		return object.getAsJsonArray(key);
	}

	public static String getString(JsonElement element, String key){
		JsonObject object = element.getAsJsonObject();
		return object.get(key).getAsString();
	}

	/**
	 * 将 JSON 转换到指定对象
	 * @param json
	 * @param type
	 * @return
	 */
	public static <T> T parseToEntity(String json, Class<T> type) {
		T result=null;
		try{
			result= gson.fromJson(json, type);
		}catch (Exception e){
			Log.e("parseToEntity:>",e.getMessage());
		}
		return result;
	}

	/**
	 * 将 JSON 转换到指定对象
	 * @param json
	 * @param type
	 * @return
	 */
	public static <T> T parseToEntity(String json, Type type) {
		T result=null;
		try{
			result= gson.fromJson(json, type);
		}catch (Exception e){
			Log.e("parseToEntity:>",e.getMessage());
		}
		return result;
	}
	
	/**
	 * 将字符串转换到 JSONObject 对象
	 * @param json
	 * @return
	 */
	public static JSONObject parse(String json)
	{
		JSONObject result = null;
		try {
			result = new JSONObject(json);
		} catch (Exception e) {
		}
		return result;
	}
	
	/**
	 * 从 json 中读取到 key 对应的对象
	 * @param json
	 * @param key
	 * @return
	 */
	public static JSONObject getJSONObject(String json, String key)
	{
		JSONObject result = null;
		try {
			result = new JSONObject(json);
			return result.getJSONObject(key);
		} catch (Exception e) {
		}
		return result;
	}
	
	/**
	 * 从 JSON 中读取到指定 key 对应的字符串
	 * @param json
	 * @param key
	 * @return
	 */
	public static String getString(String json, String key)
	{
		JSONObject result;
		try {
			result = new JSONObject(json);
			if(result.isNull(key)){
				return "";
			}
			return result.getString(key);
		} catch (Exception e) {
		}
		return null;
	}

	/**
	 * 将字符串填充到 JSON 对象
	 * @param json json 字符串
	 * @return JSON 对象
     */
	public static JSONObject fillToObject(String json){
		try{
			return new JSONObject(json);
		}catch (Exception e){
		}
		return null;
	}

	/**
	 * boolean
	 * @param json
	 * @param key
     * @return
     */
	public static boolean getBoolean(String json,String key){
		JSONObject result;
		try {
			result = new JSONObject(json);

			return result.getBoolean(key);
		} catch (Exception e) {
		}
		return false;
	}
	
	/**
	 * 从 JSON 中读取到指定 key 对应的字符串
	 * @param json
	 * @param key
	 * @return
	 */
	public static int getInt(String json, String key)
	{
		String num = getString(json, key);
		if(TextUtils.isEmpty(num)){
			return 0;
		}
		
		return Integer.parseInt(num);
	}

	/**
	 * 从 JSON 中读取到指定 key 对应的字符串
	 * @param json
	 * @param key
	 * @return
	 */
	public static long getLong(String json, String key)
	{
		String num = getString(json, key);
		if(TextUtils.isEmpty(num)){
			return 0;
		}

		return Long.parseLong(num);
	}
	
	/**
	 * 从 JSON 中读取到指定 key 对应的字符串
	 * @param json
	 * @param key
	 * @return
	 */
	public static String getString(JSONObject json, String key)
	{
		 try {
			return json.getString(key);
		} catch (Exception e) {
		}
		return null;
	}
	
	/**
	 * 从 JSON 中读取到指定 key 对应的字符串
	 * @param json
	 * @param key
	 * @return
	 */
	public static int getInt(JSONObject json, String key)
	{
		String num = getString(json, key);
		if(TextUtils.isEmpty(num)){
			return 0;
		}
		
		return Integer.parseInt(num);
	}
	
	/**
	 * 从 JSON 中读取到指定 key 对应的 JSON 对象
	 * @param json
	 * @param key
	 * @return
	 */
	public static JSONObject getJSONObject(JSONObject json, String key)
	{
		try {
			return json.getJSONObject(key);
		} catch (Exception e) {
		}
		return null;
	}
	
	/**
	 * 从 JSON 中读取到指定 key 对应的 JSON 对象数组
	 * @param json
	 * @param key
	 * @return
	 */
	public static JSONArray getJSONArray(String json, String key){
		JSONObject obj = parse(json);
		if(obj != null)
		{
			try {
				return obj.getJSONArray(key);
			} catch (Exception e) {
			}
		}
		return null;
	}


	/**
	 * 把list集合转成JSON 对象数组
	 * @return
	 */
	public static String getListdata(List<String> listdata){
		Gson gson = new Gson();
		try {
			return gson.toJson(listdata);
		}catch (Exception e){
		}
		return "";
	}

	/**
	 * 把list集合转成JSON 对象数组
	 * @return
	 */

	public static List<String> getJSONArray(String jsondata){
		Gson gson = new Gson();
		try {
			return gson.fromJson(jsondata, new TypeToken<List<String>>(){}.getType());
		}catch (Exception e){
		}
		List<String> persons =new ArrayList<>();
		return persons;
	}
}
