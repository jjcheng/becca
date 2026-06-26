"use client";

import { useState } from "react";

export default function VisitMapFrame() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <article className="visit-map-card" aria-label="Map to Becca's Cafe">
      {!isLoaded ? (
        <div className="visit-map-loading" aria-live="polite" aria-busy="true">
          Loading map...
        </div>
      ) : null}
      <iframe
        title="Map to Becca's Cafe"
        src="https://www.google.com/maps?q=1.3097286803212393,103.91190802596503&z=16&output=embed"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        onLoad={() => setIsLoaded(true)}
      />
    </article>
  );
}