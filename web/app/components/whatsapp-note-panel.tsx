import type { ReactNode } from "react";

type WhatsappNotePanelProps = {
  primaryContent: ReactNode;
};

export default function WhatsappNotePanel({ primaryContent }: WhatsappNotePanelProps) {
  return (
    <section className="note-whatsapp-panel order-note-panel reveal">
      <div className="order-note-flower" aria-hidden="true">
        <i className="detail-icon ri-flower-line" aria-hidden="true" />
      </div>
      <p>{primaryContent}</p>
      <p>
        <i className="detail-icon ri-whatsapp-line" aria-hidden="true" />
        <strong>Have questions?</strong>{" "}
        <a href="https://wa.me/6591234567" target="_blank" rel="noopener">
          WhatsApp us at +65 9123 4567
        </a>
      </p>
    </section>
  );
}
