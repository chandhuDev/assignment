"use client";
import React, { useEffect, useRef } from "react";

interface GaugeMeterProps {
  score?: number;
  maxScore?: number;
  goodScore?: number;
  peersPercentage?: number;
}

const GaugeMeter: React.FC<GaugeMeterProps> = ({
  score = 43,
  maxScore = 150,
  goodScore = 70,
  peersPercentage = 46,
}) => {
  const arcRef = useRef<SVGPathElement>(null);

  const SIZE = 400;
  const pad = 32;
  const strokeW = 24;
  const arcR = 118;

  const cx = SIZE / 2;

  const arcOuterR = arcR + strokeW / 2;

  const cardR = arcOuterR + pad;
  const strip = pad;

  const cardTop = (SIZE - (cardR + strip)) / 2;
  const cy = cardTop + cardR;

  const CY = 180;
  const cardBottom = CY + strip;
  const svgH = cardBottom + 16;

  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const pt = (r: number, deg: number) => ({
    x: cx + r * Math.cos(toRad(deg)),
    y: CY + r * Math.sin(toRad(deg)),
  });

  const arcPath = (r: number, start: number, end: number): string => {
    const s = pt(r, start);
    const e = pt(r, end);
    const large = end - start > 180 ? 1 : 0;
    return `M ${s.x} ${s.y} A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y}`;
  };

  const stadiumPath = (): string => {
    const domeLeft = pt(cardR, 180);
    const domeRight = pt(cardR, 0);

    const bl = { x: domeLeft.x, y: CY + strip };
    const br = { x: domeRight.x, y: CY + strip };
    return [
      `M ${domeLeft.x} ${domeLeft.y}`,
      `A ${cardR} ${cardR} 0 1 1 ${domeRight.x} ${domeRight.y}`,
      `L ${br.x} ${br.y}`,
      `L ${bl.x} ${bl.y}`,
      `Z`,
    ].join(" ");
  };

  const filledEnd = 180 + (score / maxScore) * 180;
  const filledPct = `${((score / maxScore) * 100).toFixed(1)}%`;

  const clipY = CY - cardR - 4;
  const clipH = cardR + strip + 8;

  useEffect(() => {
    const path = arcRef.current;
    if (!path) return;
    const len = path.getTotalLength();
    path.style.strokeDasharray = `${len}`;
    path.style.strokeDashoffset = `${len}`;
    requestAnimationFrame(() => {
      path.style.transition =
        "stroke-dashoffset 1.4s cubic-bezier(0.4,0,0.2,1)";
      path.style.strokeDashoffset = "0";
    });
  }, []);

  const pointsNeeded = goodScore - score;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100%",
        background: "#ffffff",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      <div style={{ position: "relative", width: SIZE }}>
        <div
          style={{
            position: "absolute",
            top: -15,
            right: 10,
            background: "white",
            borderRadius: 18,
            padding: "11px 16px",
            boxShadow: "0 8px 28px rgba(100,120,180,0.18)",
            fontSize: 14,
            color: "#444",
            lineHeight: 1.7,
            maxWidth: 210,
            zIndex: 10,
          }}
        >
          You need{" "}
          <strong style={{ color: "#111" }}>+{pointsNeeded} points</strong> to
          reach a <strong style={{ color: "#22c55e" }}>good</strong> score of{" "}
          <strong style={{ color: "#111" }}>{goodScore}</strong>
          <span
            style={{
              position: "absolute",
              bottom: -10,
              left: "44%",
              transform: "translateX(-50%)",
              width: 0,
              height: 0,
              borderLeft: "10px solid transparent",
              borderRight: "10px solid transparent",
              borderTop: "10px solid white",
            }}
          />
        </div>

        <svg
          width={SIZE}
          height={svgH}
          viewBox={`0 0 ${SIZE} ${svgH}`}
          style={{ overflow: "visible", display: "block" }}
        >
          <defs>
            <linearGradient
              id="fillGrad"
              gradientUnits="userSpaceOnUse"
              x1={pt(arcR, 180).x}
              y1={CY}
              x2={pt(arcR, filledEnd).x}
              y2={CY}
            >
              <stop offset="0%" stopColor="#FF6969" />
              <stop offset="100%" stopColor="#FFBC70" />
            </linearGradient>

            <filter
              id="cardShadow"
              x="-15%"
              y="-15%"
              width="130%"
              height="145%"
            >
              <feDropShadow
                dx="0"
                dy="10"
                stdDeviation="20"
                floodColor="#6878b0"
                floodOpacity="0.15"
              />
            </filter>

            <filter id="arcGlow" x="-25%" y="-25%" width="150%" height="150%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <clipPath id="cardClip">
              <rect
                x={cx - cardR - 2}
                y={clipY}
                width={(cardR + 2) * 2}
                height={clipH}
              />
            </clipPath>
          </defs>

          <path d={stadiumPath()} fill="white" filter="url(#cardShadow)" />

          <g clipPath="url(#cardClip)">
            <path
              d={arcPath(arcR, 180, 359.99)}
              fill="none"
              stroke="#E2E4EF"
              strokeWidth={strokeW}
              strokeLinecap="round"
            />

            <path
              ref={arcRef}
              d={arcPath(arcR, 180, filledEnd)}
              fill="none"
              stroke="url(#fillGrad)"
              strokeWidth={strokeW}
              strokeLinecap="round"
              filter="url(#arcGlow)"
            />
          </g>

          <text
            x={cx}
            y={CY - 30}
            textAnchor="middle"
            fontSize={54}
            fontWeight={800}
            fill="#FF7070"
            fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
          >
            {score}
          </text>

          <text
            x={cx}
            y={CY + 8}
            textAnchor="middle"
            fontSize={14}
            fontWeight={700}
            fill="#1a3a6b"
            fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
          >
            Current WealthUp Score
          </text>
        </svg>

        <p
          style={{
            textAlign: "center",
            color: "#48688E",
            fontStyle: "italic",
            fontSize: 15,
            marginTop: 14,
          }}
        >
          Better than{" "}
          <strong style={{ fontWeight: 700 }}>{peersPercentage}%</strong> of
          peers
        </p>
      </div>
    </div>
  );
};

export default GaugeMeter;
