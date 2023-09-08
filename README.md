Sample Mobile Plugin Template for Outsystems

# Features
This plugin runs 2 hooks on the after plugin install phase that apply trapeze configurations and have the feature to replace any pattern in any file.

They are run sequentially, where the Trapeze hook run first.
## Trapeze
This plugin has the ability to run the trapeze framework.

This can be used by:
1. Using a preference named `TrapezeConf` in your application that is a Base 64 encoded string, with the contents of the yaml configuration file
2. By having a file named `trapeze-conf.yaml` in the path of your application, for the platform. Example for an android cordova app - if your cordova app is in folder `x`, this file should be in `x/platforms/android/trapeze-conf.yaml`.

You can learn more about writting configuration files for trapeze in [here](https://trapeze.dev/docs/Operations/getting-started#writing-configuration-files).

Features are:
* :question:	[appName](https://trapeze.dev/docs/Operations/android#appName)
* :question:	[versionCode](https://trapeze.dev/docs/Operations/android#versionCode)
* :question:	[versionName](https://trapeze.dev/docs/Operations/android#versionName)
* :question:	[incrementVersionCode](https://trapeze.dev/docs/Operations/android#incrementVersionCode)
* :question:	[packageName](https://trapeze.dev/docs/Operations/android#packageName)
* :question:	[versionName](https://trapeze.dev/docs/Operations/android#manifest)
* :white_check_mark:	[manifest](https://trapeze.dev/docs/Operations/android#manifest)
* :question:	[gradle](https://trapeze.dev/docs/Operations/android#gradle)
* :question:	[res](https://trapeze.dev/docs/Operations/android#res)
* :white_check_mark:	[json](https://trapeze.dev/docs/Operations/android#json)
* :white_check_mark:	[xml](https://trapeze.dev/docs/Operations/android#xml)
* :question:	[copy](https://trapeze.dev/docs/Operations/android#copy)

