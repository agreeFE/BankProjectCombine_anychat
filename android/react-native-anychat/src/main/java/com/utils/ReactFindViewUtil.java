package com.utils;

import android.util.Log;
import android.view.View;
import android.view.ViewGroup;

import com.view.MySurfaceView;
import com.view.glsurface.RoundCameraGLSurfaceView;

import java.util.Objects;

/**
 * 项目名称: TestPlugin
 * 类名称：ReactFindViewUtil
 * 类描述：$DESC
 * 创建人：ShangZemin
 * 创建时间：2019/9/4 8:37
 * 修改人：烈满
 * 修改时间：2019/9/4 8:37
 * 修改备注：
 */

public class ReactFindViewUtil {
    /**
     * Finds a view that is tagged with {@param nativeId} as its nativeID prop
     * under the {@param root} view hierarchy. Returns the view if found, null otherwise.
     * @param root root of the view hierarchy from which to find the view
     */
    public static
    View findView(View root, String nativeId) {
        String tag = getNativeId(root);

        if (tag != null && tag.equals(nativeId)) {
            return root;
        }
        if (root instanceof ViewGroup) {
            ViewGroup viewGroup = (ViewGroup) root;

            for (int i = 0; i < viewGroup.getChildCount(); i++) {
                View view = findView(viewGroup.getChildAt(i), nativeId);
                if (view != null) {
                    return view;
                }
            }
        }
        return null;
    }

    private static String getNativeId(View root) {
        if(root instanceof MySurfaceView){

            return ((MySurfaceView)root).getNativeId();
        }else {
            return null;
        }
//        return null == root.getTag() ? null : root.getTag().toString();
    }


}
