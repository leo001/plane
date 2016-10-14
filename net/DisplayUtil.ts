// TypeScript file
/**
 * DisplayUtil
 */
class DisplayUtil {
    static removeChild(a: egret.DisplayObject) {
        if (a && a.parent) {
            a.parent.removeChild(a);
            if(a instanceof egret.MovieClip){
                a.stop();
            }
        }else{
            egret.log('removeChild error');
        }
    }

    static topChild(a: egret.DisplayObject) {
        if (a && a.parent) {
            a.parent.setChildIndex(a, a.parent.numChildren - 1);
        }else{
            egret.log('a is not in stage');
        }
    }
}
