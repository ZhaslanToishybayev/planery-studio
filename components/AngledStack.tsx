"use client";
import { motion } from "framer-motion";

type XY = { x: number; y: number };

export default function AngledStack({
  images,
  angles = [14, 3, -15],
  offsets = [{ x: -6, y: 6 }, { x: 0, y: 0 }, { x: 6, y: 8 }],
  scales = [1.08, 1.0, 1.08],
  aspect = "1410/768",
  widths = ["66%", "68%", "66%"],
}: {
  images: [string, string, string];
  angles?: [number, number, number];
  offsets?: [XY, XY, XY];
  scales?: [number, number, number];
  aspect?: string;
  widths?: [string, string, string];
}) {
  const [left, center, right] = images;
  const [aL, aC, aR] = angles;
  const [oL, oC, oR] = offsets;
  const [sL, sC, sR] = scales;
  const [wL, wC, wR] = widths;

  return (
    <motion.div
      className="relative w-full"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
      style={{ aspectRatio: aspect }}
    >
      {/* Left */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ zIndex: 1 }}
        initial={{ opacity: 0, y: 12, rotate: aL - 6 }}
        whileInView={{ opacity: 1, y: 0, rotate: aL }}
        viewport={{ once: true }}
        transition={{ delay: 0.15, duration: 0.6 }}
        whileHover={{ y: -4, scale: 1.02, rotate: aL + 2 }}
      >
        <div
          className="frame"
          style={{
            width: wL,
            transform: `translate(${oL.x}%, ${oL.y}%) rotate(${aL}deg) scale(${sL})`,
            transformOrigin: "center",
          }}
        >
          <img src={left} alt="" className="w-full h-auto object-contain" />
        </div>
      </motion.div>

      {/* Center */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ zIndex: 2 }}
        initial={{ opacity: 0, y: 12, rotate: aC - 6 }}
        whileInView={{ opacity: 1, y: 0, rotate: aC }}
        viewport={{ once: true }}
        transition={{ delay: 0.25, duration: 0.6 }}
        whileHover={{ y: -6, scale: 1.05, rotate: aC, zIndex: 10 }}
      >
        <div
          className="frame"
          style={{
            width: wC,
            transform: `translate(${oC.x}%, ${oC.y}%) rotate(${aC}deg) scale(${sC})`,
            transformOrigin: "center",
          }}
        >
          <img src={center} alt="" className="w-full h-auto object-contain" />
        </div>
      </motion.div>

      {/* Right */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ zIndex: 1 }}
        initial={{ opacity: 0, y: 12, rotate: aR - 6 }}
        whileInView={{ opacity: 1, y: 0, rotate: aR }}
        viewport={{ once: true }}
        transition={{ delay: 0.35, duration: 0.6 }}
        whileHover={{ y: -4, scale: 1.02, rotate: aR - 2 }}
      >
        <div
          className="frame"
          style={{
            width: wR,
            transform: `translate(${oR.x}%, ${oR.y}%) rotate(${aR}deg) scale(${sR})`,
            transformOrigin: "center",
          }}
        >
          <img src={right} alt="" className="w-full h-auto object-contain" />
        </div>
      </motion.div>
    </motion.div>
  );
}
