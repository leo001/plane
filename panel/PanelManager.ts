

/**
 * 具有 close() 函数
 */
class ClosePanel extends eui.Component {
	/**
	 * 在PanelLayer中addChild，这个字段会被赋值
	 * 或者自己将close方法赋值到这个字段
	 */
	public close(): void {
	}
}

class PanelLayer extends eui.UILayer {

	/**
	 * 添加面板,会将关闭方法赋值到child.close
	 * @param needMask true = 半透明遮罩 false = 透明遮罩（默认true）
	 */
	public addChild(child: ClosePanel, needMask?: boolean): egret.DisplayObject {
		child.verticalCenter = 0;
		child.horizontalCenter = 0;

		let hasMask = needMask || needMask == undefined;
		let alpha = hasMask ? 0.5 : 0;
		let mask = this.getMask(alpha);

		let oldCloseFunc = child.close;
        let closeFunc = () => {
            if (oldCloseFunc) {
                oldCloseFunc();
            }
            super.removeChild(child);
            super.removeChild(mask);
        };
        child.close = closeFunc;

        mask.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            closeFunc();
        }, this);

		super.addChild(mask);
        super.addChild(child);
		return child;
	}

	public closeAll() {
		this.removeChildren();
	}

	private getMask(fillAlpha: number) {
		let rect = new eui.Rect();
		rect.touchEnabled = true;
        rect.percentWidth = 100;
        rect.percentHeight = 100;
        rect.fillColor = 0x0;
        rect.fillAlpha = fillAlpha;
		return rect;
	}
}
