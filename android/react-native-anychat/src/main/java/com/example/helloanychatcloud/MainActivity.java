package com.example.helloanychatcloud;

import android.Manifest;
import android.app.Activity;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.SharedPreferences;
import android.content.SharedPreferences.Editor;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.text.TextUtils;
import android.util.Log;
import android.view.Gravity;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.ViewGroup.LayoutParams;
import android.view.Window;
import android.view.inputmethod.InputMethodManager;
import android.widget.AdapterView;
import android.widget.AdapterView.OnItemClickListener;
import android.widget.Button;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.ListView;
import android.widget.ProgressBar;
import android.widget.RadioButton;
import android.widget.TextView;
import android.widget.Toast;

import com.android.anychat.R;
import com.bairuitech.anychat.AnyChatBaseEvent;
import com.bairuitech.anychat.AnyChatCoreSDK;
import com.bairuitech.anychat.AnyChatDefine;
import com.bairuitech.anychat.AnyChatTransDataEvent;
import com.example.config.ConfigEntity;
import com.example.config.ConfigService;
import com.utils.RxPermissions;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Random;
import java.util.UUID;

import io.reactivex.annotations.NonNull;
import io.reactivex.functions.Consumer;
import okhttp3.Call;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

public class MainActivity extends Activity implements AnyChatBaseEvent, AnyChatTransDataEvent {
	// 视频配置界面标识
	public static final int ACTIVITY_ID_VIDEOCONFIG = 1;
	public static final int OPEN = 1;
	private int remoteId = 0;
	private String[] CAMERA_PERMISSIONS = new String[] { Manifest.permission.WRITE_EXTERNAL_STORAGE,
			Manifest.permission.CAMERA, Manifest.permission.READ_EXTERNAL_STORAGE, Manifest.permission.RECORD_AUDIO };

	/**
	 * 默认的签名服务器地址，只针对默认的AppID进行签名，其他应用AppID的签名需要自己部署签名服务器
	 */
	private static final String url = "http://demo.anychat.cn:8930";
	private ListView mRoleList;
	private EditText mEditIP;
	private EditText mEditPort;
	private EditText mEditName;
	private EditText mEditRoomID;
	private TextView mBottomConnMsg;
	private TextView mBottomBuildMsg;
	private Button mBtnStart;
	private Button mBtnLogout;
	private Button mBtnWaiting;
	private LinearLayout mWaitingLayout;
	private LinearLayout mProgressLayout;
	private EditText appGuidKey;

	private String guidStr;
	private String mStrIP = "192.168.31.254";
	private String mStrName = "34568";
	private int mSPort = 8906;
	private int mSRoomID = 1;
	private final int SHOWLOGINSTATEFLAG = 1; // 显示的按钮是登陆状态的标识
	private final int SHOWWAITINGSTATEFLAG = 2; // 显示的按钮是等待状态的标识
	private final int SHOWLOGOUTSTATEFLAG = 3; // 显示的按钮是登出状态的标识
	private final int LOCALVIDEOAUTOROTATION = 1; // 本地视频自动旋转控制

	private RadioButton radioBtn1;
	private RadioButton radioBtn2;

	private List<RoleInfo> mRoleInfoList = new ArrayList<RoleInfo>();
	private RoleListAdapter mAdapter;
	private int UserselfID;

	public AnyChatCoreSDK anyChatSDK;

	private static final int REQUEST_SUCESS = 1;
	private Handler handler = new Handler() {
		public void handleMessage(Message msg) {
			if (msg.what == REQUEST_SUCESS) {
				JSONObject object;
				try {
					object = new JSONObject(msg.obj.toString());
					int errCode = object.optInt("errorcode");
					int timeStamp = object.optInt("timestamp");
					String signedStr = object.optString("sigStr");
					if (errCode == 0) {
						anyChatSDK.LoginEx(mStrName, 1001, "", guidStr, timeStamp, signedStr, "");
					}

				} catch (JSONException e) {
					e.printStackTrace();
				}

			}
		};
	};

	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		requestWindowFeature(Window.FEATURE_NO_TITLE);
		setContentView(R.layout.activity_main);
		InitSDK();
		InitLayout();
		// 读取登陆配置表
		readLoginDate();
		// 初始化登陆配置数据
		initLoginConfig();
		initWaitingTips();
		ApplyVideoConfig();
		// 注册广播
		registerBoradcastReceiver();

		new Thread(new Runnable() {
			@Override
			public void run() {
				// initData();
			}
		}).start();
	}

	private void initData() {
		JSONObject jsonObject = new JSONObject();
		JSONObject jsonObject1 = new JSONObject();
		JSONObject jsonObject2 = new JSONObject();
		JSONObject jsonObject3 = new JSONObject();
		try {
			jsonObject1.put("CHANNELCODE", "C003");
			jsonObject1.put("MMDATE", "");
			jsonObject1.put("MMID", "");
			jsonObject1.put("OTHERDATA", "");
			jsonObject1.put("TdgBrah", "10000");

			jsonObject2.put("QUEUETYPE", "1");

			jsonObject3.put("ConsumerIP", "000.000.000");
			jsonObject3.put("ConsumerId", "C003");
			jsonObject3.put("ConsumerSeqNo", getUUID());
			jsonObject3.put("DeviceNum", "14243565723");
			// jsonObject3.put("DeviceNum","34568");
			jsonObject3.put("DeviceType", "APP");
			jsonObject3.put("DvcNum", "00000000");
			jsonObject3.put("MacValue", "00000000");
			jsonObject3.put("RequestDate", "20181009");
			jsonObject3.put("RequestTime", "110553");
			// jsonObject3.put("ServerIP", "http://192.168.31.31:4444");
			jsonObject3.put("ServerIP", "http://192.168.31.177:10000/bcss/pierce");
			// jsonObject3.put("ServerIP", "http://192.9.200.57:4444");
			jsonObject3.put("TdgBrah", "10000");
			jsonObject3.put("TranMode", "1");
			jsonObject3.put("TranTellerNo", "X0041");
			jsonObject3.put("TransServiceCode", "arb.arcs.createvideo.01");

			jsonObject.put("APP_HEAD", jsonObject1);
			jsonObject.put("REQ_BODY", jsonObject2);
			jsonObject.put("SYS_HEAD", jsonObject3);

		} catch (JSONException e) {
			e.printStackTrace();
		}

		// Map<String,Object> params = new HashMap<>();
		// params.put("APP_HEAD",jsonObject1);
		// params.put("REQ_BODY",jsonObject2);
		// params.put("SYS_HEAD",jsonObject3);
		//
		// HttpService.newBuilder()
		// .setAction("http://192.168.31.254:4444")
		// .setMethod(METHOD.POST)
		// .setParams(params)
		// .setCallback(new RequestCallback() {
		// @Override
		// public void onSucceed(String data, String json) {
		// Log.e("fgq","数据"+json);
		// }
		//
		// @Override
		// public void onFail(int code, String message) {
		// Log.e("fgq","失败"+code+message);
		// }
		// })
		// .execute();

		final RequestBody requestBody = RequestBody.create(MediaType.parse("application/json; charset=utf-8"),
				jsonObject.toString());
		// final Request request = new Request.Builder().url("http://192.168.31.31:4444").post(requestBody).build();
		final Request request = new Request.Builder().url( "http://192.168.31.177:10000/bcss/pierce" ).post(requestBody).build();
		// final Request request = new Request.Builder().url( "http://192.9.200.57:4444" ).post(requestBody).build();
		OkHttpClient client = new OkHttpClient();
		Call newCall = client.newCall(request);
		newCall.enqueue(new okhttp3.Callback() {
			@Override
			public void onFailure(Call call, IOException e) {
				// 连接失败
				Log.e("fgq", "失败" + e.getMessage());
			}

			@Override
			public void onResponse(Call call, Response response) throws IOException {
				String responses = response.body().string();
				Log.e("fgq", "成功" + responses);
			}
		});
	}

	/**
	 * 自动生成32位的UUid，对应数据库的主键id进行插入用。
	 * 
	 * @return
	 */
	public String getUUID() {
		UUID uuid = UUID.randomUUID();
		String str = uuid.toString();
		// 去掉"-"符号
		String temp = str.substring(0, 8) + str.substring(9, 13) + str.substring(14, 18) + str.substring(19, 23)
				+ str.substring(24);
		return temp;
	}

	private void InitSDK() {
		if (anyChatSDK == null) {
			anyChatSDK = AnyChatCoreSDK.getInstance(this);
			anyChatSDK.SetBaseEvent(this);
			anyChatSDK.SetTransDataEvent(this);
			anyChatSDK.InitSDK(android.os.Build.VERSION.SDK_INT, 0);
			AnyChatCoreSDK.SetSDKOptionInt(AnyChatDefine.BRAC_SO_LOCALVIDEO_AUTOROTATION, LOCALVIDEOAUTOROTATION);
		}
	}

	private void InitLayout() {
		System.out.println("app start");
		appGuidKey = (EditText) findViewById(R.id.app_guid_key);
		appGuidKey.setText("fbe957d1-c25a-4992-9e75-d993294a5d56");

		mRoleList = (ListView) this.findViewById(R.id.roleListView);
		mEditIP = (EditText) this.findViewById(R.id.mainUIEditIP);
		mEditPort = (EditText) this.findViewById(R.id.mainUIEditPort);
		mEditName = (EditText) this.findViewById(R.id.main_et_name);
		mEditRoomID = (EditText) this.findViewById(R.id.mainUIEditRoomID);
		mBottomConnMsg = (TextView) this.findViewById(R.id.mainUIbottomConnMsg);
		mBottomBuildMsg = (TextView) this.findViewById(R.id.mainUIbottomBuildMsg);
		mBtnStart = (Button) this.findViewById(R.id.mainUIStartBtn);
		mBtnLogout = (Button) this.findViewById(R.id.mainUILogoutBtn);
		mBtnWaiting = (Button) this.findViewById(R.id.mainUIWaitingBtn);
		mWaitingLayout = (LinearLayout) this.findViewById(R.id.waitingLayout);

		radioBtn1 = (RadioButton) findViewById(R.id.btn1);
		radioBtn2 = (RadioButton) findViewById(R.id.btn2);

		mRoleList.setDivider(null);
		mBottomConnMsg.setText("No content to the server");
		// 初始化bottom_tips信息
		mBottomBuildMsg.setText(" V" + anyChatSDK.GetSDKMainVersion() + "." + anyChatSDK.GetSDKSubVersion()
				+ "  Build time: " + anyChatSDK.GetSDKBuildTime());
		mBottomBuildMsg.setGravity(Gravity.CENTER_HORIZONTAL);

		mBtnStart.setOnClickListener(new OnClickListener() {
			@Override
			public void onClick(View v) {
				// 普通登录
				if (isSigned()) {
					if (checkInputData()) {
						// 如果
						guidStr = appGuidKey.getText().toString().trim();

						if (!TextUtils.isEmpty(guidStr)) {
							AnyChatCoreSDK.SetSDKOptionString(AnyChatDefine.BRAC_SO_CLOUD_APPGUID, guidStr);
						}
						setBtnVisible(SHOWWAITINGSTATEFLAG);
						mSRoomID = Integer.parseInt(mEditRoomID.getText().toString().trim());
						mStrName = mEditName.getText().toString().trim();
						mStrIP = mEditIP.getText().toString().trim();
						mSPort = Integer.parseInt(mEditPort.getText().toString().trim());

						/**
						 * AnyChat可以连接自主部署的服务器、也可以连接AnyChat视频云平台； 连接自主部署服务器的地址为自设的服务器IP地址或域名、端口；
						 * 连接AnyChat视频云平台的服务器地址为：cloud.anychat.cn；端口为：8906
						 */
						anyChatSDK.Connect("192.168.31.31", mSPort);

						/***
						 * AnyChat支持多种用户身份验证方式，包括更安全的签名登录，
						 * 详情请参考：http://bbs.anychat.cn/forum.php?mod=viewthread&tid=2211&highlight=%C7%A9%C3%FB
						 */
						anyChatSDK.Login("肖慧杨", "1");
					}
				} else {
					System.out.println("签名登录");
					if (checkInputData()) {
						// 如果
						guidStr = appGuidKey.getText().toString().trim();
						if (TextUtils.isEmpty(guidStr)) {
							Toast.makeText(MainActivity.this, "appId 不能为空", Toast.LENGTH_LONG).show();
							appGuidKey.setFocusable(true);
						}
						setBtnVisible(SHOWWAITINGSTATEFLAG);
						mSRoomID = Integer.parseInt(mEditRoomID.getText().toString().trim());
						mStrName = mEditName.getText().toString().trim();
						mStrIP = mEditIP.getText().toString().trim();
						mSPort = Integer.parseInt(mEditPort.getText().toString().trim());

						anyChatSDK.Connect(mStrIP, mSPort);

						final HashMap<String, String> map = new HashMap<String, String>();
						map.put("userid", "1001");
						map.put("strUserid", "");
						map.put("appid", guidStr);
						new Thread() {
							@Override
							public void run() {

								String reslutString = HttpUtil.httpRequestPost(url, map);
								if (TextUtils.isEmpty(reslutString)) {
									Log.i("HelloAnychat", "httprequest failed");
								} else {
									Message msg = Message.obtain(handler, REQUEST_SUCESS, reslutString);
									handler.sendMessage(msg);
								}

							}
						}.start();

					}
				}
			}

			private boolean isSigned() {
				return radioBtn1.isChecked() ? true : false;
			}
		});

		mBtnLogout.setOnClickListener(new OnClickListener() {
			@Override
			public void onClick(View v) {
				setBtnVisible(SHOWLOGINSTATEFLAG);
				anyChatSDK.LeaveRoom(-1);
				anyChatSDK.Logout();
				mRoleList.setAdapter(null);
				mBottomConnMsg.setText("No connnect to the server");
			}
		});
	}

	private void initLoginConfig() {
		mEditIP.setText(mStrIP);
		mEditName.setText(mStrName);
		mEditPort.setText(String.valueOf(mSPort));
		mEditRoomID.setText(String.valueOf(mSRoomID));
	}

	// 读取登陆数据
	private void readLoginDate() {
		SharedPreferences preferences = getSharedPreferences("LoginInfo", 0);
		mStrIP = preferences.getString("UserIP", "cloud.anychat.cn");
		mStrName = preferences.getString("UserName", "Android01");
		mSPort = preferences.getInt("UserPort", 8906);
		mSRoomID = preferences.getInt("UserRoomID", 1);
	}

	// 保存登陆相关数据
	private void saveLoginData() {
		SharedPreferences preferences = getSharedPreferences("LoginInfo", 0);
		Editor preferencesEditor = preferences.edit();
		preferencesEditor.putString("UserIP", mStrIP);
		preferencesEditor.putString("UserName", mStrName);
		preferencesEditor.putInt("UserPort", mSPort);
		preferencesEditor.putInt("UserRoomID", mSRoomID);
		preferencesEditor.commit();
	}

	private boolean checkInputData() {
		String ip = mEditIP.getText().toString().trim();
		String port = mEditPort.getText().toString().trim();
		String name = mEditName.getText().toString().trim();
		String roomID = mEditRoomID.getText().toString().trim();
		if (ValueUtils.isStrEmpty(ip)) {
			mBottomConnMsg.setText("请输入IP");
			return false;
		} else if (ValueUtils.isStrEmpty(port)) {
			mBottomConnMsg.setText("请输入端口号");
			return false;
		} else if (ValueUtils.isStrEmpty(name)) {
			mBottomConnMsg.setText("请输入姓名");
			return false;
		} else if (ValueUtils.isStrEmpty(roomID)) {
			mBottomConnMsg.setText("请输入房间号");
			return false;
		} else {
			return true;
		}
	}

	// 控制登陆，等待和登出按钮状态
	private void setBtnVisible(int index) {
		if (index == SHOWLOGINSTATEFLAG) {
			mBtnStart.setVisibility(View.VISIBLE);
			mBtnLogout.setVisibility(View.GONE);
			mBtnWaiting.setVisibility(View.GONE);

			mProgressLayout.setVisibility(View.GONE);
		} else if (index == SHOWWAITINGSTATEFLAG) {
			mBtnStart.setVisibility(View.GONE);
			mBtnLogout.setVisibility(View.GONE);
			mBtnWaiting.setVisibility(View.VISIBLE);

			mProgressLayout.setVisibility(View.VISIBLE);
		} else if (index == SHOWLOGOUTSTATEFLAG) {
			mBtnStart.setVisibility(View.GONE);
			mBtnLogout.setVisibility(View.VISIBLE);
			mBtnWaiting.setVisibility(View.GONE);

			mProgressLayout.setVisibility(View.GONE);
		}
	}

	// init登陆等待状态UI
	private void initWaitingTips() {
		if (mProgressLayout == null) {
			mProgressLayout = new LinearLayout(this);
			mProgressLayout.setOrientation(LinearLayout.HORIZONTAL);
			mProgressLayout.setGravity(Gravity.CENTER_VERTICAL);
			mProgressLayout.setPadding(1, 1, 1, 1);
			LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(LayoutParams.WRAP_CONTENT,
					LayoutParams.WRAP_CONTENT);
			params.setMargins(5, 5, 5, 5);
			ProgressBar progressBar = new ProgressBar(this, null, android.R.attr.progressBarStyleLarge);
			mProgressLayout.addView(progressBar, params);
			mProgressLayout.setVisibility(View.GONE);
			mWaitingLayout.addView(mProgressLayout, new LayoutParams(params));
		}
	}

	private void hideKeyboard() {
		InputMethodManager imm = (InputMethodManager) getSystemService(Context.INPUT_METHOD_SERVICE);
		if (imm.isActive()) {
			imm.hideSoftInputFromWindow(getCurrentFocus().getApplicationWindowToken(), InputMethodManager.HIDE_NOT_ALWAYS);
		}
	}

	protected void onDestroy() {
		anyChatSDK.LeaveRoom(-1);
		anyChatSDK.Logout();
		anyChatSDK.removeEvent(this);
		anyChatSDK.Release();
		unregisterReceiver(mBroadcastReceiver);
		super.onDestroy();
	}

	protected void onResume() {
		super.onResume();
	}

	@Override
	protected void onRestart() {
		// TODO Auto-generated method stub
		super.onRestart();
		anyChatSDK.SetBaseEvent(this);

		// 一种简便的方法，当断网的时候，返回到登录界面，不去刷新用户列表，下面广播已经清空了列表
		if (mBtnStart.getVisibility() != View.VISIBLE)
			updateUserList();
	}

	@Override
	public void OnAnyChatConnectMessage(boolean bSuccess) {
		if (!bSuccess) {
			Log.e("fgq", "连接服务器失败");
			setBtnVisible(SHOWLOGINSTATEFLAG);
			mBottomConnMsg.setText("连接服务器失败，自动重连，请稍后...");
			System.out.println("connect failed");
		}
		Log.e("fgq", "连接服务器成功");
	}

	@Override
	public void OnAnyChatLoginMessage(int dwUserId, int dwErrorCode) {
		if (dwErrorCode == 0) {
			Log.e("fgq", "登录成功  dwUserId：" + dwUserId + "   dwErrorCode：" + dwErrorCode);
			saveLoginData();
			setBtnVisible(SHOWLOGOUTSTATEFLAG);
			hideKeyboard();

			mBottomConnMsg.setText("Connect to the server success.");
			int sHourseID = Integer.valueOf(mEditRoomID.getEditableText().toString());
			Log.e("fgq", "OnAnyChatLoginMessage--sHourseID:" + sHourseID);
			anyChatSDK.EnterRoom(sHourseID, "");
			UserselfID = dwUserId;
			// finish();
		} else {
			Log.e("fgq", "登录失败  dwUserId：" + dwUserId + "   dwErrorCode：" + dwErrorCode);
			setBtnVisible(SHOWLOGINSTATEFLAG);
			mBottomConnMsg.setText("登录失败，errorCode：" + dwErrorCode);
		}
	}

	@Override
	public void OnAnyChatEnterRoomMessage(int dwRoomId, int dwErrorCode) {
		Log.e("fgq", "OnAnyChatEnterRoomMessage--  fgq房间id:" + dwRoomId + "     err:" + dwErrorCode);
		if (dwErrorCode == 0) {
			Log.e("fgq", " 进入房间成功 dwRoomId" + dwRoomId);
			// 已经进入房间
			// service.startVideoActivity();
			anyChatSDK.UserCameraControl(-1, OPEN);
			anyChatSDK.UserSpeakControl(-1, OPEN);

			for (int id : anyChatSDK.GetRoomOnlineUsers(dwRoomId)) {
				// if(id != selfId){
				// dwRoomId = id;
				// dwRoomId = id;
				// break;
				// }
			}

			if (dwRoomId != 0) {
				anyChatSDK.UserCameraControl(remoteId, OPEN);
				anyChatSDK.UserSpeakControl(remoteId, OPEN);
			}
		} else {
			// 通知UI 通话失败
			// TODO notifyEnterRoomFailed();
			Log.e("fgq", " 进入房间失败 dwRoomId" + dwRoomId);
		}
	}

	@Override
	public void OnAnyChatOnlineUserMessage(int dwUserNum, int dwRoomId) {
		Log.e("fgq", "进入房间成功   dwUserNum" + dwUserNum + "    dwRoomId" + dwRoomId);
		mBottomConnMsg.setText("进入房间成功！");
		updateUserList();
	}

	private void updateUserList() {
		mRoleInfoList.clear();
		int[] userID = anyChatSDK.GetOnlineUser();
		RoleInfo userselfInfo = new RoleInfo();
		userselfInfo.setName(anyChatSDK.GetUserName(UserselfID) + "(自己) 【点击可设置】");
		userselfInfo.setUserID(String.valueOf(UserselfID));
		userselfInfo.setRoleIconID(getRoleRandomIconID());
		mRoleInfoList.add(userselfInfo);

		for (int index = 0; index < userID.length; ++index) {
			RoleInfo info = new RoleInfo();
			info.setName(anyChatSDK.GetUserName(userID[index]));
			info.setUserID(String.valueOf(userID[index]));
			info.setRoleIconID(getRoleRandomIconID());
			mRoleInfoList.add(info);
		}

		mAdapter = new RoleListAdapter(MainActivity.this, mRoleInfoList);
		mRoleList.setAdapter(mAdapter);
		mRoleList.setOnItemClickListener(new OnItemClickListener() {
			@Override
			public void onItemClick(AdapterView<?> arg0, View arg1, int arg2, long arg3) {
				if (arg2 == 0) {
					Intent intent = new Intent();
					intent.setClass(MainActivity.this, VideoSettingActivity.class);
					startActivityForResult(intent, ACTIVITY_ID_VIDEOCONFIG);
					return;
				}

				onSelectItem(arg2);
			}
		});
	}

	private void onSelectItem(final int postion) {
		RxPermissions.getIntance(this).request(CAMERA_PERMISSIONS).subscribe(new Consumer<Boolean>() {
			@Override
			public void accept(@NonNull Boolean aBoolean) throws Exception {
				if (aBoolean) {
					String strUserID = mRoleInfoList.get(postion).getUserID();
					Intent intent = new Intent();
					intent.putExtra("UserID", strUserID);
					intent.setClass(MainActivity.this, VideoActivity.class);
					startActivity(intent);
				} else {
					Toast.makeText(MainActivity.this, "请打开权限", Toast.LENGTH_SHORT).show();
				}
			}
		});

	}

	private int getRoleRandomIconID() {
		int number = new Random().nextInt(5) + 1;
		if (number == 1) {
			return R.drawable.role_1;
		} else if (number == 2) {
			return R.drawable.role_2;
		} else if (number == 3) {
			return R.drawable.role_3;
		} else if (number == 4) {
			return R.drawable.role_4;
		} else if (number == 5) {
			return R.drawable.role_5;
		}

		return R.drawable.role_1;
	}

	protected void onActivityResult(int requestCode, int resultCode, Intent data) {
		// TODO Auto-generated method stub
		if (resultCode == RESULT_OK && requestCode == ACTIVITY_ID_VIDEOCONFIG) {
			ApplyVideoConfig();
		}
	}

	// 根据配置文件配置视频参数
	private void ApplyVideoConfig() {
		ConfigEntity configEntity = ConfigService.LoadConfig(this);
		if (configEntity.mConfigMode == 1) // 自定义视频参数配置
		{
			// 设置本地视频编码的码率（如果码率为0，则表示使用质量优先模式）
			AnyChatCoreSDK.SetSDKOptionInt(AnyChatDefine.BRAC_SO_LOCALVIDEO_BITRATECTRL, configEntity.mVideoBitrate);
			// if (configEntity.mVideoBitrate == 0) {
			// 设置本地视频编码的质量
			AnyChatCoreSDK.SetSDKOptionInt(AnyChatDefine.BRAC_SO_LOCALVIDEO_QUALITYCTRL, configEntity.mVideoQuality);
			// }
			// 设置本地视频编码的帧率
			AnyChatCoreSDK.SetSDKOptionInt(AnyChatDefine.BRAC_SO_LOCALVIDEO_FPSCTRL, configEntity.mVideoFps);
			// 设置本地视频编码的关键帧间隔
			AnyChatCoreSDK.SetSDKOptionInt(AnyChatDefine.BRAC_SO_LOCALVIDEO_GOPCTRL, configEntity.mVideoFps * 4);
			// 设置本地视频采集分辨率
			AnyChatCoreSDK.SetSDKOptionInt(AnyChatDefine.BRAC_SO_LOCALVIDEO_WIDTHCTRL, configEntity.mResolutionWidth);
			AnyChatCoreSDK.SetSDKOptionInt(AnyChatDefine.BRAC_SO_LOCALVIDEO_HEIGHTCTRL, configEntity.mResolutionHeight);
			// 设置视频编码预设参数（值越大，编码质量越高，占用CPU资源也会越高）
			AnyChatCoreSDK.SetSDKOptionInt(AnyChatDefine.BRAC_SO_LOCALVIDEO_PRESETCTRL, configEntity.mVideoPreset);
		}
		// 让视频参数生效
		AnyChatCoreSDK.SetSDKOptionInt(AnyChatDefine.BRAC_SO_LOCALVIDEO_APPLYPARAM, configEntity.mConfigMode);
		// P2P设置
		AnyChatCoreSDK.SetSDKOptionInt(AnyChatDefine.BRAC_SO_NETWORK_P2PPOLITIC, configEntity.mEnableP2P);
		// 本地视频Overlay模式设置
		AnyChatCoreSDK.SetSDKOptionInt(AnyChatDefine.BRAC_SO_LOCALVIDEO_OVERLAY, configEntity.mVideoOverlay);
		// 回音消除设置
		AnyChatCoreSDK.SetSDKOptionInt(AnyChatDefine.BRAC_SO_AUDIO_ECHOCTRL, configEntity.mEnableAEC);
		// 平台硬件编码设置
		AnyChatCoreSDK.SetSDKOptionInt(AnyChatDefine.BRAC_SO_CORESDK_USEHWCODEC, configEntity.mUseHWCodec);
		// 视频旋转模式设置
		AnyChatCoreSDK.SetSDKOptionInt(AnyChatDefine.BRAC_SO_LOCALVIDEO_ROTATECTRL, configEntity.mVideoRotateMode);
		// 本地视频采集偏色修正设置
		AnyChatCoreSDK.SetSDKOptionInt(AnyChatDefine.BRAC_SO_LOCALVIDEO_FIXCOLORDEVIA, configEntity.mFixColorDeviation);
		// 视频GPU渲染设置
		AnyChatCoreSDK.SetSDKOptionInt(AnyChatDefine.BRAC_SO_VIDEOSHOW_GPUDIRECTRENDER, configEntity.mVideoShowGPURender);
		// 本地视频自动旋转设置
		AnyChatCoreSDK.SetSDKOptionInt(AnyChatDefine.BRAC_SO_LOCALVIDEO_AUTOROTATION, configEntity.mVideoAutoRotation);
	}

	@Override
	public void OnAnyChatUserAtRoomMessage(int dwUserId, boolean bEnter) {
		if (bEnter) {
			remoteId = dwUserId;
			RoleInfo info = new RoleInfo();
			info.setUserID(String.valueOf(dwUserId));
			info.setName(anyChatSDK.GetUserName(dwUserId));
			info.setRoleIconID(getRoleRandomIconID());
			mRoleInfoList.add(info);
			mAdapter.notifyDataSetChanged();
		} else {
			for (int i = 0; i < mRoleInfoList.size(); i++) {
				if (mRoleInfoList.get(i).getUserID().equals("" + dwUserId)) {
					mRoleInfoList.remove(i);
					mAdapter.notifyDataSetChanged();
				}
			}
		}
	}

	@Override
	public void OnAnyChatLinkCloseMessage(int dwErrorCode) {
		setBtnVisible(SHOWLOGINSTATEFLAG);
		mRoleList.setAdapter(null);
		anyChatSDK.LeaveRoom(-1);
		anyChatSDK.Logout();
		mBottomConnMsg.setText("连接关闭，errorCode：" + dwErrorCode);
	}

	// 广播
	private BroadcastReceiver mBroadcastReceiver = new BroadcastReceiver() {
		@Override
		public void onReceive(Context context, Intent intent) {
			String action = intent.getAction();
			if (action.equals("VideoActivity")) {
				Toast.makeText(MainActivity.this, "网络已断开！", Toast.LENGTH_SHORT).show();
				setBtnVisible(SHOWLOGINSTATEFLAG);
				mRoleList.setAdapter(null);
				mBottomConnMsg.setText("No content to the server");
				anyChatSDK.LeaveRoom(-1);
				anyChatSDK.Logout();
			}
		}
	};

	public void registerBoradcastReceiver() {
		IntentFilter myIntentFilter = new IntentFilter();
		myIntentFilter.addAction("VideoActivity");
		// 注册广播
		registerReceiver(mBroadcastReceiver, myIntentFilter);
	}

	@Override
	public void OnAnyChatTransFile(int dwUserid, String FileName, String TempFilePath, int dwFileLength, int wParam,
			int lParam, int dwTaskId) {

	}

	@Override
	public void OnAnyChatTransBuffer(int dwUserid, byte[] lpBuf, int dwLen) {
		String str = new String(lpBuf);
		Log.e("fgq", "OnAnyChatTransBuffer--获取回掉" + str);

	}

	@Override
	public void OnAnyChatTransBufferEx(int dwUserid, byte[] lpBuf, int dwLen, int wparam, int lparam, int taskid) {
	}

	@Override
	public void OnAnyChatSDKFilterData(byte[] lpBuf, int dwLen) {
	}
}
