import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";

interface InteractiveHoverButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  variant?: "primary" | "ghost";
}

export const InteractiveHoverButton = React.forwardRef<HTMLButtonElement, InteractiveHoverButtonProps>(
  ({ text = "Button", className, variant = "primary", ...props }, ref) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const fillRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);
    const arrowRef = useRef<HTMLSpanElement>(null);
    
    // Combine external ref with internal ref
    const setRefs = (node: HTMLButtonElement | null) => {
      (buttonRef as any).current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) (ref as any).current = node;
    };

    useEffect(() => {
      const btn = buttonRef.current;
      const fill = fillRef.current;
      const txt = textRef.current;
      const arr = arrowRef.current;

      if (!btn || !fill || !txt || !arr) return;

      const ctx = gsap.context(() => {
        // Initial states
        gsap.set(fill, { scale: 0, xPercent: -50, yPercent: -50 });
        gsap.set(arr, { x: -20, opacity: 0 });

        const enterAnim = gsap.timeline({ paused: true });
        
        // 1. Expand the background circle
        enterAnim.to(fill, {
          scale: 2.5,
          duration: 0.4,
          ease: "power2.out",
        }, 0);

        // 2. Slide original text out
        enterAnim.to(txt, {
          x: 30,
          opacity: 0,
          duration: 0.3,
          ease: "power2.inOut",
        }, 0);

        // 3. Slide arrow + text in
        enterAnim.to(arr, {
          x: 0,
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        }, 0.1);

        // Hover events
        btn.addEventListener("mouseenter", () => enterAnim.play());
        btn.addEventListener("mouseleave", () => enterAnim.reverse());

      }, btn);

      return () => ctx.revert();
    }, []);

    const isPrimary = variant === "primary";
    
    // Base styles matching i-Edge design system
    const baseStyles: React.CSSProperties = {
      position: "relative",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      padding: "14px 28px",
      borderRadius: "999px",
      fontWeight: 700,
      fontSize: "14.5px",
      cursor: "pointer",
      overflow: "hidden",
      border: isPrimary ? "none" : `1px solid #16191C`,
      background: isPrimary ? "#16191C" : "transparent",
      color: isPrimary ? "#F1F2EC" : "#16191C",
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
      transform: "translateZ(0)", // Fix for Safari rendering
    };

    const fillStyles: React.CSSProperties = {
      position: "absolute",
      top: "50%",
      left: "50%",
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      background: isPrimary ? "#3B6BFF" : "#16191C", // Signal blue for primary, Ink for ghost
      zIndex: 0,
    };

    const contentStyles: React.CSSProperties = {
      position: "relative",
      zIndex: 10,
      display: "flex",
      alignItems: "center",
      gap: "8px",
    };

    return (
      <button 
        ref={setRefs} 
        style={baseStyles} 
        className={className}
        {...props}
      >
        {/* Animated Background Fill */}
        <div ref={fillRef} style={fillStyles} />

        {/* Original Text */}
        <span ref={textRef} style={{ display: "inline-block" }}>
          {text}
        </span>

        {/* Hover Content (Text + Arrow) */}
        <span 
          ref={arrowRef} 
          style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: "6px",
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            whiteSpace: "nowrap"
          }}
        >
          <span>{text}</span>
          <ArrowRight size={16} strokeWidth={2.5} />
        </span>
      </button>
    );
  }
);

InteractiveHoverButton.displayName = "InteractiveHoverButton";