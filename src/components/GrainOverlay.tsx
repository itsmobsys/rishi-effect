/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export default function GrainOverlay() {
  return (
    <>
      {/* Global Grain Texture Overlay */}
      <div 
        id="grain-texture-layer"
        className="pointer-events-none fixed inset-0 z-[9999] opacity-[0.035] select-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Hero Visual Scanline Overlay */}
      <div 
        id="scanline-texture-layer"
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.05] select-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
          backgroundSize: '100% 4px, 3px 100%',
        }}
      />
    </>
  );
}
