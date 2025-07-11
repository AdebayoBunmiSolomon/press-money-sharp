\*\*Securing App Content in a React Native Expo Application

#For Android...

run "npx expo prebuild --platform android"

locate the MainActivity.kt file in android/src/main/java/MainActivity.kt

check the MainActivity file and copy and paste the codebase but mind this top layer "package com.adebunmy.press_money_sharp"

rebuild with eas in either development or preview mode to test. But best test in preview mode

#For iOS

run "npx expo prebuild --platform ios"

locate the AppDelegate.swift file in ios/projectname/AppDelegate.swift

check the AppDelegate file and copy and paste the codebase

cd into the ios folder by pressing "cd ios"

run "pod install"

rebuild with eas in either development or preview mode to test. But best test in preview mode

if eas fails, cd back into ios folder by using step 2 command

run "pod update hermes-engine --no-repo-update" while still in the ios folder

go to the eas.json and paste this property in every of the development profile " "cache": { "key": "v1-hermes-fix-20250711" } "

Then go to the app.json and paste this property inside the ios key " "jsEngine": "hermes" "

run step 2 command and after-which, "run pod install" while still in the ios folder

now, run step 4.
