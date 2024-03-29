package com.leanplum.rondoreactnative;

import android.app.Application;
import android.content.Context;

import androidx.annotation.Nullable;
import com.clevertap.android.sdk.CleverTapAPI;
import com.clevertap.android.sdk.pushnotification.PushConstants;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JSIModulePackage;
import com.facebook.soloader.SoLoader;
import com.leanplum.Leanplum;
import com.leanplum.LeanplumActivityHelper;
import com.leanplum.annotations.Parser;

import com.leanplum.internal.Log;
import com.swmansion.reanimated.ReanimatedJSIModulePackage;
import java.lang.reflect.InvocationTargetException;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

    private final ReactNativeHost mReactNativeHost =
            new ReactNativeHost(this) {
                @Override
                public boolean getUseDeveloperSupport() {
                    return BuildConfig.DEBUG;
                }

                @Override
                protected List<ReactPackage> getPackages() {
                    @SuppressWarnings("UnnecessaryLocalVariable")
                    List<ReactPackage> packages = new PackageList(this).getPackages();
                    // Packages that cannot be autolinked yet can be added manually here, for example:
//                    packages.add(new LeanplumPackage());
                    return packages;
                }

                @Override
                protected String getJSMainModuleName() {
                    return "index";
                }

              @Nullable
              @Override
              protected JSIModulePackage getJSIModulePackage() {
                return new ReanimatedJSIModulePackage();
              }
            };

    /**
     * Loads Flipper in React Native templates.
     *
     * @param context
     */
    private static void initializeFlipper(Context context, ReactInstanceManager reactInstanceManager) {
        if (BuildConfig.DEBUG) {
            try {
        /*
         We use reflection here to pick up the class that initializes Flipper,
        since Flipper library is not available in release mode
        */
                Class<?> aClass = Class.forName("com.leanplum.rondoreactnative.ReactNativeFlipper");
                aClass
                        .getMethod("initializeFlipper", Context.class, ReactInstanceManager.class)
                        .invoke(null, context, reactInstanceManager);
            } catch (ClassNotFoundException e) {
                e.printStackTrace();
            } catch (NoSuchMethodException e) {
                e.printStackTrace();
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            } catch (InvocationTargetException e) {
                e.printStackTrace();
            }
        }
    }

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
        initializeFlipper(this, getReactNativeHost().getReactInstanceManager());

        // Using "LP Rondo RN" app from Xiaomi Push Console
        CleverTapAPI.changeXiaomiCredentials("2882303761520135704", "5882013525704");
        CleverTapAPI.enableXiaomiPushOn(PushConstants.XIAOMI_MIUI_DEVICES); // using ALL_DEVICES would spawn ":pushservice" process on non-Xiaomi devices

        Leanplum.setLogLevel(Log.Level.DEBUG);
        Leanplum.setApplicationContext(this);
        Parser.parseVariables(this);
        //  For session lifecyle tracking.
        LeanplumActivityHelper.enableLifecycleCallbacks(this);
    }
}
