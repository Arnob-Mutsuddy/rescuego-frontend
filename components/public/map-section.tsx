
// components/public/map-section.tsx
"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const DEFAULT_QUERY = "Bangladesh";

export function MapSection() {
  const [inputValue, setInputValue] = useState("");
  const [activeQuery, setActiveQuery] = useState(DEFAULT_QUERY);

  const isDefault = activeQuery === DEFAULT_QUERY;

  const zoom = isDefault ? 7 : 14;
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    activeQuery
  )}&z=${zoom}&output=embed`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputValue.trim();
    setActiveQuery(trimmed || DEFAULT_QUERY);
  };

  const handleReset = () => {
    setInputValue("");
    setActiveQuery(DEFAULT_QUERY);
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Find a Location</h2>
        <p className="mt-2 text-muted-foreground">
          Search any area, hospital, or landmark across Bangladesh.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mx-auto mt-6 flex max-w-xl gap-2"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="e.g. Chattogram Medical College Hospital"
            className="pl-9"
            aria-label="Search location on map"
          />
        </div>
        <Button type="submit">Search</Button>
        {!isDefault && (
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={handleReset}
            aria-label="Reset map"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </form>

      <div className="mt-6 overflow-hidden rounded-lg border">
        <iframe
          key={activeQuery}
          title={`Map showing ${activeQuery}`}
          width="100%"
          height="400"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src={mapSrc}
        />
      </div>
    </section>
  );
}



// components/public/map-section.tsx
// export function MapSection() {
//   return (
//     <section className="mx-auto max-w-6xl px-4 py-16">
//       <div className="text-center">
//         <h2 className="text-2xl font-bold">Our Service Area</h2>
//         <p className="mt-2 text-muted-foreground">
//           Currently serving Chattogram and surrounding areas.
//         </p>
//       </div>
//       <div className="mt-8 overflow-hidden rounded-lg border">
//         <iframe
//           title="RESCUEGO Service Area Map"
//           width="100%"
//           height="400"
//           loading="lazy"
//           referrerPolicy="no-referrer-when-downgrade"
//           src="https://www..com/maps?q=Chattogram,Bangladesh&output=embed"
//         />
//       </div>
//     </section>
//   );
// }