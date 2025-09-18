export default function SparkBG() {
  return (
    <>
      {/* layered purple spark mesh (performance friendly radial-gradients) */}
      <div aria-hidden className="absolute inset-0"
        style={{
          backgroundImage: [
            "radial-gradient(60rem 40rem at 10% -10%, rgba(170,115,255,.25), transparent 55%)",
            "radial-gradient(40rem 30rem at 90% -10%, rgba(120,80,255,.25), transparent 60%)",
            "radial-gradient(120rem 80rem at 50% 120%, rgba(15,8,25,.85), rgba(9,7,12,.95))",
          ].join(", "),
        }}
      />
      {/* dotted spark + vignette via mask-image */}
      <div aria-hidden className="absolute inset-0
        [background:radial-gradient(circle_at_center,rgba(255,255,255,.08)1px,transparent_1px)]
        [background-size:22px_22px]"
        style={{
          maskImage:"radial-gradient(120rem 80rem at 50% 10%, black, transparent 70%)",
          WebkitMaskImage:"radial-gradient(120rem 80rem at 50% 10%, black, transparent 70%)",
        }}
      />
      {/* soft glow blobs */}
      <div className="pointer-events-none absolute -left-40 top-32 h-72 w-72 rounded-full blur-3xl"
           style={{ background:"radial-gradient(circle, rgba(185,120,255,.35), transparent 60%)" }} />
      <div className="pointer-events-none absolute right-0 top-20 h-80 w-80 rounded-full blur-3xl"
           style={{ background:"radial-gradient(circle, rgba(120,100,255,.35), transparent 60%)" }} />
    </>
  );
}
