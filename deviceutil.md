# deviceutil.js提供的方法

## 1. 用途

+ 说明src/util/deviceutil.js提供的方法

## 2. 注意事项

+ 使用异步调用，如果需要强制同步，推荐使用async/await的方式，不要调用同步方法。使用同步方法在无法在chrome中进行调试。

## 3. 接口明细

| 接口名称 | 接口描述 |
| --- | --- |
| getAPILevel | API版本 |
| getBrand | 品牌 |
| getApplicationName | 当前应用名称 |
| getBuildNumber | 应用编译版本号 |
| getBundleId | 应用程序包标识符 |
| getCarrier | 运营商名称 |
| getDeviceCountry | 设备所处国家 |
| getDeviceLocale | 设备所处地区 |
| getDeviceId | 设备ID |
| getDeviceName | 设备名称 |
| getFirstInstallTime | 应用初始安装时间 |
| getFontScale | 字体大小 |
| getFreeDiskStorage | 剩余存储容量(字节) |
| getIPAddress | 当前网络的IP地址 |
| getInstanceID | 应用程序实例ID | 
| getLastUpdateTime | 获取应用上次更新时间 |
| getMACAddress | 网络适配器MAC地址 |
| getManufacturer | 设备制造商 |
| getMaxMemory | JVM试图使用的最大内存量(字节) |
| getModel | 设备模式 |
| getPhoneNumber | 电话号码 |
| getReadableVersion | 应用程序可读版本 |
| getSerialNumber | 唯一序列号 |
| getSystemName | 系统名称 |
| getSystemVersion | 系统版本 | 
| getTimezone | 系统时区 | 
| getTotalDiskCapacity | 完整磁盘空间大小(字节) | 
| getTotalMemory | 设备总内存(字节) |
| getUniqueID | 设备唯一ID |
| getUserAgent | 设备用户代理 | 
| getVersion | 设备版本 |
| is24Hour | 用户偏好是否设置为24小时格式 |
| isEmulator | 程序是否允许在模拟器中 |
| isTablet | 是否是平板电脑 |
| getImei | 设备的IMEI列表 |
