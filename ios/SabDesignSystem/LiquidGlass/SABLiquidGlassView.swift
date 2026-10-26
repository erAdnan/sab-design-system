import UIKit

@objc public enum SABLiquidGlassEffect: Int {
  case regular
  case clear
  case none

#if compiler(>=6.2)
  @available(iOS 26.0, tvOS 26.0, *)
  var converted: UIGlassEffect.Style? {
    switch self {
    case .regular:
      return .regular
    case .clear:
      return .clear
    case .none:
      return nil
    }
  }
#endif
}

#if compiler(>=6.2)

@available(iOS 26.0, tvOS 26.0, *)
@objc public class SABLiquidGlassViewImpl: UIVisualEffectView {
  private var isFirstMount: Bool = true
  /// Set once the view starts leaving the hierarchy. Blocks any further
  /// effect changes (from layoutSubviews / prop updates / in-flight
  /// animations) that could otherwise race with RN's deallocation of this
  /// view and its nested React children, which is the source of the
  /// EXC_BAD_ACCESS crash on screen pop.
  private var isTearingDown: Bool = false

  @objc public var effectTintColor: UIColor?
  @objc public var interactive: Bool = false
  @objc public var style: SABLiquidGlassEffect = .regular

  /// Synchronously clears the glass effect and strips any gesture
  /// recognizers UIKit attached for `isInteractive` glass. Must run
  /// *before* RN removes/deallocates this view — an animated `effect`
  /// change (`UIView.animate`) can still be in flight when the view is
  /// freed, and its completion block then touches deallocated memory.
  private func tearDownGlass() {
    guard !isTearingDown else { return }
    isTearingDown = true

    layer.removeAllAnimations()
    contentView.layer.removeAllAnimations()

    self.gestureRecognizers?.forEach { self.removeGestureRecognizer($0) }
    contentView.gestureRecognizers?.forEach { contentView.removeGestureRecognizer($0) }

    UIView.performWithoutAnimation {
      self.effect = nil
    }
  }

  public override func willMove(toSuperview newSuperview: UIView?) {
    if newSuperview == nil {
      tearDownGlass()
    } else if isTearingDown {
      // Re-attached after being detached (e.g. list/cell reuse) — allow glass again.
      isTearingDown = false
      isFirstMount = true
    }
    super.willMove(toSuperview: newSuperview)
  }

  public override func removeFromSuperview() {
    tearDownGlass()
    super.removeFromSuperview()
  }

  /// Second, independent teardown hook. Under Fabric's Legacy Interop
  /// Layer this view can be detached/recycled in ways that don't always
  /// route cleanly through `willMove(toSuperview:)` — `didMoveToWindow`
  /// is driven directly by the `window` property and fires reliably
  /// whenever this view (at any depth) leaves an on-screen window.
  public override func didMoveToWindow() {
    super.didMoveToWindow()
    if window == nil {
      tearDownGlass()
    } else if isTearingDown {
      isTearingDown = false
      isFirstMount = true
    }
  }

  deinit {
    // Belt-and-suspenders: never let a live UIGlassEffect outlive this view.
    effect = nil
  }

  public override func layoutSubviews() {
    super.layoutSubviews()
    guard !isTearingDown else { return }
    if self.effect != nil { return }
    setupView()
    if isFirstMount {
      isFirstMount = false
    }
  }

  @objc public func setupView() {
    guard !isTearingDown else { return }

    guard #available(iOS 26.0, tvOS 26.0, *) else {
      return
    }

    guard let glassEffectClass = NSClassFromString("UIGlassEffect") as? NSObject.Type else {
      return
    }

    guard glassEffectClass.responds(to: Selector(("effectWithStyle:"))) else {
      return
    }

    guard let preferredStyle = style.converted else {
      // Assign synchronously — no animation block that could outlive the view.
      UIView.performWithoutAnimation {
        self.effect = UIVisualEffect()
      }
      return
    }

    let glassEffect = UIGlassEffect(style: preferredStyle)
    glassEffect.isInteractive = interactive
    glassEffect.tintColor = effectTintColor

    // Avoid `UIView.animate` here: an in-flight animation block referencing
    // `self` can fire its completion after RN has already deallocated this
    // view (e.g. immediately after a back navigation), causing
    // EXC_BAD_ACCESS. A synchronous assignment is imperceptibly different
    // visually but removes that race entirely.
    UIView.performWithoutAnimation {
      self.effect = glassEffect
    }
    isFirstMount = false

    self.contentView.isUserInteractionEnabled = true
  }
}

#else

@objc public class SABLiquidGlassViewImpl: UIView {}

#endif
