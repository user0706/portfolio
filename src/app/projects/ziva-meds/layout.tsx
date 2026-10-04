import type { Metadata } from "next";
import "./ziva-meds.css";

const description =
  "Native iOS medication manager for caregivers, rebuilt for iOS 26 — schedules, inventory, appointments and adherence for every patient in your care, AlarmKit alarms with a Live Activity countdown, App Lock and encrypted backups, and a SwiftData store that never leaves the phone. Now in public beta on TestFlight.";

export const metadata: Metadata = {
  metadataBase: new URL("https://markojovovic.dev"),
  title: "Ziva Meds — Medication management for caregivers",
  description,
  keywords: [
    "Ziva Meds",
    "iOS app",
    "iOS 26",
    "SwiftUI",
    "SwiftData",
    "AlarmKit",
    "Live Activities",
    "medication reminder",
    "caregiver",
  ],
  icons: {
    icon: "/projects/ziva/AppIcon.svg",
  },
  openGraph: {
    title: "Ziva Meds — Medication management for caregivers",
    description,
    type: "website",
    images: [{ url: "/projects/ziva/og-image.png", width: 2400, height: 1260, alt: "Ziva Meds app icon" }],
  },
};

export default function ZivaMedsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="ziva-page min-h-screen" data-theme="ziva">
      {children}
    </div>
  );
}
