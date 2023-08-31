package com.xzct_cshr;

import android.os.Bundle;

import com.blitzapp.animatedsplash.animation.AddImageView;
import com.blitzapp.animatedsplash.animation.GroupAnimation;
import com.facebook.react.ReactActivity;

import static com.blitzapp.animatedsplash.animation.Splash.SPLASHSLIDELEFT;
import static com.blitzapp.animatedsplash.animation.Splash.ROTATE;
import static com.blitzapp.animatedsplash.animation.Splash.SCALE;
import static com.blitzapp.animatedsplash.animation.Splash.SLIDE;
import static com.blitzapp.animatedsplash.animation.Splash.createSplashView;
import static com.blitzapp.animatedsplash.animation.Splash.performSingleAnimation;
import static com.blitzapp.animatedsplash.animation.Splash.screenHeight;
import static com.blitzapp.animatedsplash.animation.Splash.screenWidth;
import static com.blitzapp.animatedsplash.animation.Splash.setBackgroundImage;
import static com.blitzapp.animatedsplash.animation.Splash.setSplashHideAnimation;
import static com.blitzapp.animatedsplash.animation.Splash.setSplashHideDelay;
import static com.blitzapp.animatedsplash.animation.Splash.splashShow;
    import android.view.KeyEvent; // <--- import
    import com.github.kevinejohn.keyevent.KeyEventModule; // <--- import
public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
   @Override  // <--- Add this method if you want to react to keyDown
      public boolean onKeyDown(int keyCode, KeyEvent event) {

        // A. Prevent multiple events on long button press
        //    In the default behavior multiple events are fired if a button
        //    is pressed for a while. You can prevent this behavior if you
        //    forward only the first event:
        //        if (event.getRepeatCount() == 0) {
        //            KeyEventModule.getInstance().onKeyDownEvent(keyCode, event);
        //        }
        //
        // B. If multiple Events shall be fired when the button is pressed
        //    for a while use this code:
        //        KeyEventModule.getInstance().onKeyDownEvent(keyCode, event);
        //
        // Using B.
        KeyEventModule.getInstance().onKeyDownEvent(keyCode, event);

        // There are 2 ways this can be done:
        //  1.  Override the default keyboard event behavior
        //    super.onKeyDown(keyCode, event);
        //    return true;

        //  2.  Keep default keyboard event behavior
        //    return super.onKeyDown(keyCode, event);

        // Using method #1 without blocking multiple
        super.onKeyDown(keyCode, event);
        return true;
      }

      @Override  // <--- Add this method if you want to react to keyUp
      public boolean onKeyUp(int keyCode, KeyEvent event) {
        KeyEventModule.getInstance().onKeyUpEvent(keyCode, event);

        // There are 2 ways this can be done:
        //  1.  Override the default keyboard event behavior
        //    super.onKeyUp(keyCode, event);
        //    return true;

        //  2.  Keep default keyboard event behavior
        //    return super.onKeyUp(keyCode, event);

        // Using method #1
        super.onKeyUp(keyCode, event);
        return true;
      }

      @Override
      public boolean onKeyMultiple(int keyCode, int repeatCount, KeyEvent event) {
          KeyEventModule.getInstance().onKeyMultipleEvent(keyCode, repeatCount, event);
          return super.onKeyMultiple(keyCode, repeatCount, event);
      }
  @Override
  protected String getMainComponentName() {
    return "xzct_cshr";
  }

    public void onCreate(Bundle saved) {
       super.onCreate(saved);
       initiateSplash();
   }

   public void initiateSplash() {
        //Create dialog
        createSplashView(MainActivity.this);

        setBackgroundImage(R.drawable.splashbg);
        setSplashHideAnimation(SPLASHSLIDELEFT);

        setSplashHideDelay(1500);

        // Create and add images to view
        AddImageView headerimage = new AddImageView(R.drawable.header, screenHeight * 0.15, screenWidth, 0, 0, AddImageView.FIT_XY, false);
        AddImageView footerimage = new AddImageView(R.drawable.footer, screenHeight * 0.15, screenWidth, 0, screenHeight - screenHeight * 0.15, AddImageView.FIT_XY, false);
        AddImageView logoimage = new AddImageView(R.drawable.logo, screenHeight * 0.24, screenWidth * 0.4, AddImageView.getCenterX(screenWidth * 0.41), AddImageView.getCenterY(screenHeight * 0.26), AddImageView.FIT_XY, false);


        GroupAnimation group1 = new GroupAnimation();
        group1.performGroupAnimation(headerimage, SLIDE, 780, 0f, 0f, -screenHeight * 0.15f, 0f);
        group1.performGroupAnimation(footerimage, SLIDE, 780, 0f, 0f, screenHeight * 0.15f, 0f);
        performSingleAnimation(logoimage, SCALE, 780, 0.2f, 1f, 0.2f, 1f);

        splashShow();

    }
}

