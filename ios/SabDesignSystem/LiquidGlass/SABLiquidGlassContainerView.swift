import UIKit

#if compiler(>=6.2)

@available(iOS 26.0, tvOS 26.0, *)
@objc public class SABLiquidGlassContainerViewImpl: UIVisualEffectView {
  @objc public var spacing: CGFloat = 0 {
    didSet {
      setupView()
    }
  }

  public override func layoutSubviews() {
    super.layoutSubviews()
    setupView()
  }

  @objc private func setupView() {
    guard #available(iOS 26.0, tvOS 26.0, *) else {
      return
    }

    let effect = UIGlassContainerEffect()
    effect.spacing = spacing
    self.effect = effect
    self.contentView.isUserInteractionEnabled = true
  }
}

#else

@objc public class SABLiquidGlassContainerViewImpl: UIView {}

#endif
