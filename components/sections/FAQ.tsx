import React from "react";

export const FAQ = () => {
  return (
    <section className="py-16 md:py-24 px-8 max-w-4xl mx-auto" id="faq">
      <h2 className="font-serif text-4xl font-bold text-center mb-16">Everything you wanted to ask — answered honestly.</h2>
      <div className="space-y-4">
        <details className="group bg-surface-container-lowest rounded-xl border border-outline-variant/10">
          <summary className="flex justify-between items-center p-6 cursor-pointer list-none font-bold text-lg">
            Will it sound like a robot?
            <span className="material-symbols-outlined group-open:rotate-180 transition-transform">expand_more</span>
          </summary>
          <div className="p-6 pt-0 text-on-surface-variant leading-relaxed">
            Arcline uses high-fidelity neural voices and advanced LLMs. While we are transparent that it's AI if asked, most patients find it indistinguishable from a professional, highly trained receptionist.
          </div>
        </details>
        <details className="group bg-surface-container-lowest rounded-xl border border-outline-variant/10">
          <summary className="flex justify-between items-center p-6 cursor-pointer list-none font-bold text-lg">
            Is my data and my patients' data safe?
            <span className="material-symbols-outlined group-open:rotate-180 transition-transform">expand_more</span>
          </summary>
          <div className="p-6 pt-0 text-on-surface-variant leading-relaxed">
            Security is our bedrock. We are fully HIPAA and GDPR compliant. All data is encrypted at rest and in transit, and we never train our base models on your specific patient data.
          </div>
        </details>
        <details className="group bg-surface-container-lowest rounded-xl border border-outline-variant/10">
          <summary className="flex justify-between items-center p-6 cursor-pointer list-none font-bold text-lg">
            What happens if a patient has a medical emergency?
            <span className="material-symbols-outlined group-open:rotate-180 transition-transform">expand_more</span>
          </summary>
          <div className="p-6 pt-0 text-on-surface-variant leading-relaxed">
            Arcline AI is trained to recognize "red flag" symptoms. In an emergency, it immediately instructs the caller to hang up and dial emergency services, or it can transfer the call directly to a clinician if preferred.
          </div>
        </details>
        <details className="group bg-surface-container-lowest rounded-xl border border-outline-variant/10">
          <summary className="flex justify-between items-center p-6 cursor-pointer list-none font-bold text-lg">
            How does it handle complex scheduling rules?
            <span className="material-symbols-outlined group-open:rotate-180 transition-transform">expand_more</span>
          </summary>
          <div className="p-6 pt-0 text-on-surface-variant leading-relaxed">
            We ingest your specific business rules: which practitioners take new patients, how much time is needed between specific procedures, and your cancellation policies.
          </div>
        </details>
      </div>
    </section>
  );
};
