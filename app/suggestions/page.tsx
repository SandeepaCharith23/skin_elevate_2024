import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Suggestion = () => {
  // Placeholder data
  const results = [
    { id: 1, text: "Skin Type: Oily" },
    { id: 2, text: "Acne Severity: Mild" },
    { id: 3, text: "Recommendation: Use Oil-Free Moisturizer" },
  ];

  const medications = [
    { id: 1, name: "Benzoyl Peroxide", description: "Helps treat acne." },
    {
      id: 2,
      name: "Salicylic Acid",
      description: "Exfoliates dead skin cells.",
    },
    { id: 3, name: "Retinoid", description: "Promotes skin cell turnover." },
  ];

  const doctors = [
    { id: 1, name: "Dr. Jane Doe", specialty: "Dermatologist" },
    { id: 2, name: "Dr. John Smith", specialty: "Cosmetic Surgeon" },
    { id: 3, name: "Dr. Emily Clark", specialty: "Skincare Specialist" },
  ];

  return (
    <div className="flex h-screen max-h-screen ">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px] border  flex justify-center items-center">
          <h1 className="text-2xl font-bold mb-4">AI-Generated Results</h1>
          {/* Generated Results Section */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Generated Results</h2>
            <ul className="list-disc list-inside">
              {results.map((result) => (
                <li key={result.id}>{result.text}</li>
              ))}
            </ul>
          </section>

          {/* Suggestions for Medications Section */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">
              Suggestions for Medications
            </h2>
            <ul className="list-disc list-inside">
              {medications.map((med) => (
                <li key={med.id}>
                  <strong>{med.name}</strong>: {med.description}
                </li>
              ))}
            </ul>
          </section>

          {/* Suggestions for Doctors Section */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">
              Suggestions for Doctors
            </h2>
            <ul className="list-disc list-inside">
              {doctors.map((doc) => (
                <li key={doc.id}>
                  <strong>{doc.name}</strong> - {doc.specialty}
                </li>
              ))}
            </ul>
          </section>
        </div>
        {/* Button to go back or proceed */}
        <div className="flex justify-center mt-8">
          <Button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
            Print Out
          </Button>
        </div>

        <div className="text-14-regular mt-20 flex justify-between">
          <p className="justify-items-end text-dark-600 xl:text-left">
            © 2024- SKIN ELEVATE
          </p>
        </div>
      </section>

      {/* Processed Image Section */}
      <section className="mb-8">
        <div className="flex justify-center">
          <Image
            src="/assets/images/onboarding-img.png"
            alt="Processed Skin Image"
            width={1000}
            height={1000}
            className="rounded-lg shadow-lg"
          />
        </div>
      </section>
    </div>
  );
};

export default Suggestion;
