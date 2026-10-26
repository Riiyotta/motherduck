// Generic "offset lift" wrapper (spec §0 "Offset shadow" press pattern).
// Dark #383838 backing wrapper + inner element that translates (lift, -lift) on hover,
// returning to 0,0 on :active with a faster transition.
//
// Per-component lift values from the spec: quote card 15, product card 10, customer card 14,
// agent link card 10, blog card 14, offset button 7 (use OffsetButton for buttons).
export default function LiftCard({
  lift,                    // px number, required (e.g. 10)
  hoverFrom = 'lg',        // 'lg' = hover lift only >=960 (cards); 'always' = every width
  pressDuration = 60,      // ms for the :active return (cards 60, buttons 30)
  press = true,            // false: no :active press-back (original quote cards have no :active rule)
  bg,                      // optional: inner bg colour; required if hoverBg/activeBg used
  hoverBg,                 // optional hover tint (customer cards)
  activeBg,                // optional active tint
  as: Wrapper = 'div',     // wrapper element (e.g. 'article', 'a')
  innerAs: Inner = 'div',  // inner element (e.g. 'a', 'figure')
  wrapperProps = {},       // extra props for the wrapper (href, aria-*, ...)
  wrapperClassName = '',
  className = '',          // inner classes (border, padding, layout)
  style,
  disabled = false,
  children,
  ...rest                  // spread onto the inner element
}) {
  const tinted = Boolean(bg || hoverBg || activeBg)
  const vars = {
    '--lift': `${lift}px`,
    '--lift-press': `${pressDuration}ms`,
    ...(tinted && {
      '--lift-props': 'transform, background-color',
      '--lift-bg': bg,
      ...(hoverBg && { '--lift-hover-bg': hoverBg }),
      ...(activeBg && { '--lift-active-bg': activeBg }),
    }),
  }
  return (
    <Wrapper
      {...wrapperProps}
      className={`lift block ${wrapperClassName}`}
      data-hover={hoverFrom}
      data-disabled={disabled || undefined}
      data-nopress={press ? undefined : ''}
      style={{ ...vars, ...wrapperProps.style }}
    >
      <Inner {...rest} data-tint={tinted || undefined} className={`lift-inner ${className}`} style={style}>
        {children}
      </Inner>
    </Wrapper>
  )
}
