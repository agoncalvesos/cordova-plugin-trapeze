Sample Mobile Plugin Template for Outsystems

Features
This plugin runs 2 hooks on the after plugin install phase that apply trapeze configurations and have the feature to replace any pattern in any file.

They are run sequentially, where the Trapeze hook run first.

Trapeze
This plugin has the ability to run the trapeze framework.

This can be used by:

Using a preference named TrapezeConf in your application that is a Base 64 encoded string, with the contents of the yaml configuration file
By having a file named trapeze-conf.yaml in the path of your application, for the platform. Example for an android cordova app - if your cordova app is in folder x, this file should be in x/platforms/android/trapeze-conf.yaml.
You can learn more about writting configuration files for trapeze in here.

Features are:

❓ appName
❓ versionCode
❓ versionName
❓ incrementVersionCode
❓ packageName
❓ versionName
✅ manifest
❓ gradle
❓ res
✅ json
✅ xml
❓ copy
Replace in File
This plugin has the ability to change any found pattern with a given substitution string in any file(s).

This can be used by using a preference named ReplaceInFile in your application that is a Base 64 encoded string, that should follow the following structure:

    [ 
        {
            "files": [ "**/*.xml", "**/*.json"],
            "from":"/anystringwithorwithoutregex/g",
            "to":"com.outsystems.rd.twoSignal"
        }
    ]
This plugin makes use of an npm library called replace-in-file and you can learn more about the possible configurations here.
