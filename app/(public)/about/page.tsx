// app/(public)/about/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about RESCUEGO's mission to make emergency medical response faster and more reliable.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="text-3xl font-bold">About RESCUEGO</h1>
      <p className="mt-4 text-muted-foreground">
        RESCUEGO was built to solve a simple but critical problem: when an
        emergency happens, every second counts, yet finding and reaching an
        ambulance is often slow and manual.
      </p>
      <p className="mt-4 text-muted-foreground">
        Our platform connects patients, drivers, and hospitals on one system.
        Patients request help with a single tap and share their live
        location. Our dispatch engine calculates the real-world distance to
        every available ambulance and assigns the nearest one automatically.
        Drivers accept the request, update their status in real time, and
        patients can track the entire journey — from pickup to hospital
        arrival.
      </p>
      <p className="mt-4 text-muted-foreground">
        RESCUEGO was built as a full-stack capstone project, combining a
        Node.js/Express/PostgreSQL backend with a modern Next.js frontend,
        demonstrating a complete, production-style emergency dispatch
        workflow.
      </p>
    </div>
  );
}