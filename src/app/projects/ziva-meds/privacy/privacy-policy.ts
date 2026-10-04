/**
 * Ziva Meds Privacy Policy.
 *
 * This is the same text the app shows in Settings › Legal › Privacy Policy
 * (ziva/Views/Legal/PrivacyPolicyView.swift). The two must be edited together.
 *
 * Format: paragraphs are separated by a blank line; a line starting with "• "
 * is a bullet, and consecutive bullets form one list.
 */

export const privacyPolicy = {
  appName: "Ziva Meds",
  lastUpdated: "October 2026",
  contactEmail: "jovovic.marko@yandex.com",

  intro: `
This Privacy Policy explains how Ziva Meds ("Ziva Meds", "the App", "we", "us", or "the developer") handles information when you use the App.

Ziva Meds is a personal organizational application designed to help users organize medication schedules, reminders, appointments, dose history, and related information.

Ziva Meds is not a healthcare provider, medical device, pharmacy, medical service, or electronic health records system. The App is not intended to provide medical advice, diagnosis, treatment, or other professional healthcare services.

Ziva Meds is currently distributed as beta software. See Section 16 regarding data loss and recovery.
`,

  sections: [
    {
      title: "1. Information You Enter",
      body: `
Ziva Meds may allow you to enter information such as:

• Patient or profile names
• Patient dates of birth, gender, or relationship to you
• A patient's condition and notes
• Photos of patients and of medications, if you choose to add them
• Medication names, generic names, strengths and forms
• Medication dosages
• Medication schedules and times
• Appointment information, including titles, locations and notes
• Dose history and medication logs
• Medication inventory information
• Notes or other information you choose to enter

Some of this information may constitute personal information, sensitive personal information, or health-related information under applicable law.

You decide what information to enter into the App. The App does not require any particular information in order to function, and you may choose to use initials, nicknames, or other non-identifying labels instead of full names, and to leave photos out.
`,
    },
    {
      title: "2. Information About Other People",
      body: `
Ziva Meds is designed for caregivers and may be used to record information about people other than yourself, including family members, dependants, or people in your care. This includes photos of those people, if you add them.

If you enter information about another person, you are solely responsible for:

• Determining whether you are permitted to record that person's information
• Obtaining any consent, authorisation, or legal authority required in your jurisdiction
• Informing that person about how their information is handled, where required
• Responding to any request that person makes regarding their information
• Ensuring the information you record about them is accurate

Because information entered into the App is stored locally on your device and is not transmitted to the developer, the developer has no relationship with, and no ability to contact, respond to, or act on behalf of, any person whose information you choose to record.

Where applicable data-protection law treats you as the party who determines the purposes and means of processing that information, those responsibilities rest with you and not with the developer.
`,
    },
    {
      title: "3. Local Storage",
      body: `
Ziva Meds is designed to store information entered into the App locally on your device.

The developer does not operate a remote server or database for storing the medication, health, or personal information that you enter into Ziva Meds.

The developer does not intentionally transmit this information to a server operated by the developer.

The App's database, including any photos you add, is kept in the App's private storage area on your device and is protected by iOS Data Protection, which encrypts it using your device passcode. If an alarm opens the App before the device has been unlocked for the first time after a restart, the App runs without touching the database until the next launch.

Because the information is stored locally, the developer generally does not have access to the information stored within the App through the App's own systems.

This local-first design means the developer cannot retrieve, restore, export, correct, or delete information on your behalf. Control over that information rests with you and with the device you use.
`,
    },
    {
      title: "4. Information We Collect",
      body: `
The App itself does not send information to the developer. The developer does not intentionally collect:

• Names, photos or profile information entered into the App
• Medication names or dosages
• Medication schedules
• Appointment information
• Dose history
• Medication inventory information
• Notes entered into the App
• Health-related information entered into the App

The App also does not collect:

• Account credentials or passwords, as no account is required
• Payment or financial information
• Contact lists or address books
• Precise location data
• Advertising or cross-app tracking identifiers
• Device identifiers transmitted to the developer
• Usage analytics or crash reports

The developer does not intentionally sell, rent, or use information entered into Ziva Meds for advertising purposes.

The App does not require you to create an account with the developer in order to use its core local functionality.

The only circumstance in which the developer receives information from you is when you choose to contact the developer directly. See Section 5.
`,
    },
    {
      title: "5. Information You Send Us Voluntarily",
      body: `
The App includes options that let you contact the developer by email, including the "Report a Bug" option in Settings and the contact address at the end of this Privacy Policy.

These options open your own email application. No message is sent unless you write and send it yourself.

If you choose to send an email, the developer will receive whatever you include in that message, which may include:

• Your email address
• Your name or signature, if your email application adds one
• Any description, screenshot, or attachment you choose to include
• The App version, your device model (for example "iPhone") and iOS version, which "Report a Bug" pre-fills at the end of the message. You can delete this before sending.

Please do not include medication, health, or other sensitive information about yourself or any other person in a bug report or support email. Such information is not needed to investigate a technical issue.

If you do include such information, you do so voluntarily and at your own discretion. Any information you send is transmitted and stored through your own email provider and the developer's email provider, each of which operates under its own terms and privacy policy and is outside the developer's control.

Correspondence is used only to respond to your message and to investigate the issue you raise. It is not used for advertising, is not sold, and is retained only for as long as reasonably necessary for that purpose.
`,
    },
    {
      title: "6. Settings and Operational Data Stored on Your Device",
      body: `
In addition to the information you enter, the App stores a small amount of settings and operational data locally on your device using standard Apple storage mechanisms:

• Whether you have completed the introductory setup screens
• Your settings, such as appearance, app icon, notification preferences, whether names are hidden in alerts, and whether App Lock is on
• Recent search terms you have entered in the App, so they can be offered again
• Dose actions you take from a notification, alarm or Live Activity (which schedule, whether it was taken or skipped, and when), held until the App next opens and records them in its database
• Active snooze timers
• The date of your last backup
• A small file listing the medication and patient names of the alarms currently set, so the App can show them while an alarm rings. It is kept in the App's private storage, excluded from device backups, and rebuilt from the database at every launch.
• The location of a set-aside database copy, until the App has told you about it (see Section 16)

Recent search terms may contain text you typed, which could include names or medication names. All of this data remains on your device, is not transmitted to the developer, and is removed when you delete the App.

This operational data is not used for analytics, profiling, or advertising.
`,
    },
    {
      title: "7. Device Features the App Uses",
      body: `
The App uses the following device features only when you choose the corresponding action. Each is provided by iOS, and iOS asks for your permission where one is required.

Camera. If you choose "Take Photo" for a patient, the App opens the iOS camera to take a single photo. The App does not record video or audio, and the camera is in use only while the capture screen is open. The photo is stored inside the App's database.

Photo library. If you choose a photo from your library for a patient or a medication, the App uses Apple's photo picker, a system interface that runs outside the App. The App receives only the photo you select and has no access to the rest of your library.

On-device photo processing. When you add a patient photo, the App can separate the person from the background so the photo fits the profile style. This uses Apple's Vision framework entirely on your device. It does not identify faces, does not create a facial template, and nothing is sent anywhere.

App Lock. App Lock is an optional setting in Settings › Data & Privacy. When it is on, the App asks iOS to confirm Face ID, Touch ID, Optic ID or your device passcode each time the App returns to the foreground, and covers the interface in the app switcher. The App receives only a success or failure from iOS; it never sees or stores biometric data. App Lock is a privacy screen over the interface. Your data is protected by iOS Data Protection regardless, and alarms continue to ring while the App is locked.

Calendar. "Add to Calendar" on an appointment opens Apple's event editor pre-filled with the appointment's title, time, location, notes and reminder. Nothing is written to your calendar unless you tap Add, and the App does not read your calendar.

Maps. Tapping an appointment's location opens the Apple Maps app with that address as a search. From that point the address is handled by Apple Maps under Apple's privacy policy.

Notifications, alarms and Live Activities are described in Section 12.
`,
    },
    {
      title: "8. Backups, Exports and Sharing You Create",
      body: `
Settings › Data & Privacy and several other screens let you take a copy of your information out of the App. These actions happen only when you choose them. The developer does not receive the files; you decide where they go.

Backup file. "Back Up Now" creates a single file containing everything in the App: every patient, including photos, and every medication, schedule, dose record, inventory record and appointment. You choose where to save it using the iOS Files interface, which may include iCloud Drive or another storage provider you have set up. Before saving, the App offers to protect the file with a passphrase. With a passphrase, the file is encrypted on your device (AES-256-GCM, with the key derived from your passphrase using PBKDF2) and can be opened only with that passphrase. The passphrase is never stored and cannot be recovered. Without a passphrase, the backup is a plain, readable file: anyone who obtains it can read everything in it.

Restore. "Restore from Backup" reads a backup file you select and adds its contents to the App. Patients already on the device are left unchanged.

CSV export. "Export All Data" creates four spreadsheet files (patients, medications, dose log and appointments) containing names, dates of birth, conditions, notes, medication details and dose history, and offers them through the iOS share sheet.

PDF report. "Export Adherence Report" and "Share with a Doctor" create a PDF for one patient over a period you choose. It includes the patient's name, relationship, date of birth, condition and notes, each medication with its adherence percentage and notes, and the dose log for the period. You can share it or save it.

Text sharing. A medication's dose history and an appointment can be shared as plain text, including the patient's name.

Temporary files. CSV and PDF files are written to a temporary folder with the strongest iOS file protection and are deleted as soon as the share sheet closes, and again at every launch.

Once you hand a file or text to another app or service, such as Mail, Messages, AirDrop, a cloud drive, or a messaging app used by a clinic, that app's or service's privacy policy applies. The developer has no access to it and cannot retrieve or delete it.
`,
    },
    {
      title: "9. No Developer Advertising or Behavioral Tracking",
      body: `
Ziva Meds is not designed to use information entered into the App for targeted advertising, behavioral profiling, or cross-app tracking by the developer.

The developer does not intentionally sell personal information to advertisers or data brokers.

If this changes in a future version of the App, this Privacy Policy will be updated as appropriate before or when the relevant functionality is introduced.
`,
    },
    {
      title: "10. Apple System Services",
      body: `
Ziva Meds operates on Apple's platforms and may rely on operating-system functionality provided by Apple, including:

• iOS or iPadOS
• Local notification services and Live Activities
• Apple's alarm and time-sensitive alert services
• Apple's local storage and database frameworks, and iOS Data Protection
• Face ID, Touch ID, Optic ID or passcode verification, when App Lock is on
• The camera, photo picker, calendar editor and Maps, when you use those features (Section 7)
• The Files interface and share sheet, when you back up, export or share (Section 8)
• Device backup functionality
• App distribution, installation, and update services
• Other operating-system services necessary for the App to function

These services are controlled by Apple and are subject to Apple's own terms, policies, and privacy practices.

The developer does not control how Apple operates its operating systems or system-level services, and does not receive information from Apple about your individual use of the App.

You should review Apple's current privacy documentation and your device settings to understand how Apple handles information.
`,
    },
    {
      title: "11. Device Backups",
      body: `
Depending on your device configuration, Apple may include Ziva Meds data in device backup functionality, including backups stored in iCloud or on a computer.

This means that information you enter into the App, including photos and your settings, may exist in locations other than the physical device, including servers operated by Apple, if you have enabled backups. The alarm names file described in Section 6 is excluded from device backups.

Backups are created and controlled by Apple's systems and by your own device settings. They are not created, accessed, controlled, or managed by the developer, and the developer cannot view, retrieve, or delete them.

You are responsible for reviewing your backup settings and deciding whether backing up this information is appropriate for you. You can review and change these settings in the Settings application on your device.

Information contained in a device backup is subject to Apple's terms and privacy practices, not this Privacy Policy. Backup files you create yourself from within the App are described in Section 8.
`,
    },
    {
      title: "12. Notifications, Alarms and Live Activities",
      body: `
Ziva Meds may use Apple's local notification, alarm and Live Activity functionality to remind you about scheduled events. These reminders are generated on your device and are not delivered through a server operated by the developer. Actions you take on them, such as Taken, Snooze or Skip, are processed on your device.

Notifications and alarms are generated through the operating system and may be affected by your device settings, including:

• Notification and alarm permissions
• Focus modes
• Do Not Disturb
• Silent, ringer, and volume settings
• Lock screen settings and notification previews
• Battery, power, and background activity settings
• Operating-system behavior and updates

The developer does not control how Apple's operating system schedules, delivers, or displays notifications and alarms.

You are responsible for reviewing and configuring your device's notification, alarm, and privacy settings, and for confirming that reminders behave as you expect before relying on them.

By default, alerts shown outside the App do not include the name of the person or of the medication: they read "Medication reminder" or "Medication" together with the time and dose. You can turn this off in Settings › Notifications › Hide names in alerts, in which case notifications, alarms and Live Activities will display the person's name and the medication name, including on a locked screen or a connected device such as a watch or vehicle display. Consider whether displaying such information is appropriate for you and configure your preview settings accordingly.
`,
    },
    {
      title: "13. Health and Sensitive Information",
      body: `
Ziva Meds may be used to store information relating to medications, medication schedules, dose history, and other health-related information.

The App is designed to keep this information locally on your device and does not intentionally transmit this information to the developer.

You are responsible for deciding what information you enter into the App and for protecting your device against unauthorized access.

You should use an appropriate device passcode and biometric authentication, consider turning on App Lock (Section 7), and protect any backup or export you create (Section 8).

Ziva Meds should not be considered a substitute for professional medical records or an authoritative medical record system.
`,
    },
    {
      title: "14. Device Security",
      body: `
Because Ziva Meds is designed around local storage, the security of your device is an important part of protecting your information.

You are responsible for:

• Maintaining an appropriate device passcode
• Using biometric authentication where appropriate
• Turning on App Lock if other people use your unlocked device
• Keeping your operating system reasonably up to date
• Preventing unauthorized people from accessing your device
• Reviewing your notification and lock-screen settings
• Maintaining appropriate backups and protecting them

The developer cannot guarantee the security of information stored on a device that is lost, stolen, compromised, jailbroken, rooted, infected with malware, or otherwise accessed by an unauthorized person.
`,
    },
    {
      title: "15. Data Retention and Deletion",
      body: `
Because information entered into Ziva Meds is stored locally on your device, the developer does not maintain a separate copy of that information on a developer-operated server, and therefore applies no retention period to it.

Retention is determined by you:

• Information you enter remains on your device until you delete it in the App, use "Delete All Data", or delete the App.
• "Delete All Data" in Settings › Data & Privacy removes every patient, medication, schedule, dose record, inventory record and appointment, including photos, cancels all reminders, and removes any set-aside database copy (Section 16).
• Your settings, recent search terms and the other operational data in Section 6 remain until you delete the App.
• Temporary export files are deleted after sharing (Section 8). Backups and exports you saved or sent elsewhere are under your control.
• Email correspondence you send to the developer is retained only as long as reasonably necessary to respond to it.

Deleting the App may not necessarily remove copies that exist in device backups or other system-level storage controlled by Apple.

The developer cannot delete information from backups or systems controlled by Apple on your behalf.
`,
    },
    {
      title: "16. Data Loss, Corruption and Recovery",
      body: `
Ziva Meds is currently distributed as beta software and remains under active development.

Information stored locally by the App may be lost, corrupted, or become unreadable for reasons including:

• Loss, theft, damage, or replacement of your device
• Deletion or reinstallation of the App
• Operating-system updates or failures
• Insufficient device storage
• Restoring a device from an older backup

App updates may change how information is stored internally. If the App cannot open its existing database when it starts, it does not delete that database. It moves the unreadable database into a separate folder inside the App's private storage, starts with an empty database so the App can keep working, and shows you a one-time notice. The set-aside copy stays on your device, protected like the rest of the App's data, until you use "Delete All Data" or delete the App.

The App cannot read or repair the set-aside copy itself. The way to bring your information back is to restore a backup you made earlier (Section 8). The developer does not hold a copy of this information and cannot recover it.

You are responsible for maintaining your own records and backups of any information that is important to you, and should not rely on Ziva Meds as the only record of medication, dosage, or medical information.

To the maximum extent permitted by applicable law, the developer is not responsible for loss, corruption, deletion, or inability to recover information stored on your device.
`,
    },
    {
      title: "17. Data Sharing",
      body: `
The developer does not intentionally sell, rent, or disclose information entered into Ziva Meds to third parties.

The developer does not intentionally share medication or health information entered into the App with:

• Advertisers
• Data brokers
• Marketing companies
• Healthcare providers
• Pharmaceutical companies
• Insurance companies
• Government agencies

This does not include:

• Files and text that you choose to back up, export or share from the App (Section 8). Those are shared by you, with the recipients you choose.
• Processing that may occur through Apple's operating system, device backup, or other platform-level services that you enable or use. Such services are controlled by Apple and are governed by Apple's own policies.
• Information you voluntarily send to the developer by email, which is handled as described in Section 5 and passes through your email provider and the developer's email provider.
• Disclosure that the developer is required to make by law, court order, or other binding legal process.
`,
    },
    {
      title: "18. Third-Party Services",
      body: `
The App is designed not to use third-party analytics, advertising, crash-reporting, or behavioral tracking services, and does not include third-party software development kits for those purposes. The App makes no network connections of its own.

The App does not contain in-app purchases, subscriptions, or advertising.

Apple platform services may still process information as necessary to provide operating-system functionality, notifications, alarms, backups, app distribution, or other Apple-provided services.

Third-party services, if introduced into future versions of the App, may have their own privacy policies and terms. This Privacy Policy will be updated as appropriate if the App's data practices materially change.
`,
    },
    {
      title: "19. Your Privacy Rights",
      body: `
Depending on where you live, you may have rights under laws such as the EU and UK General Data Protection Regulation, the California Consumer Privacy Act, or comparable legislation. These may include the right to access, correct, delete, restrict, object to, or receive a copy of personal information held about you, and the right to complain to a supervisory authority.

How these rights operate with Ziva Meds:

• Information you enter into the App is held only on your device. The developer does not hold it and cannot access it. You exercise access, correction, export, and deletion directly, using the App's own functionality, including the backup, CSV and PDF exports in Section 8 and "Delete All Data" in Section 15, and your device settings.
• The developer does not sell or share personal information, and does not use it for targeted advertising or profiling.
• For any email correspondence you have sent to the developer, you may request access to it or ask for it to be deleted by contacting the address in Section 24.
• Because the developer holds no account or identifying records, the developer may be unable to locate or verify information relating to you beyond such correspondence.

Nothing in this Privacy Policy limits any right you have that cannot lawfully be limited.
`,
    },
    {
      title: "20. Children's Privacy",
      body: `
Ziva Meds is not specifically directed at children.

The developer does not intentionally collect personal information from children because the App does not use a developer-operated system for collecting and storing user-entered information.

If a parent or legal guardian uses Ziva Meds to manage medication information relating to a child, the parent or legal guardian is responsible for the information entered into the App and for protecting that information on the device.

If you believe that information has been provided to the developer in a manner inconsistent with this Privacy Policy, please contact us using the information provided below.
`,
    },
    {
      title: "21. International Users",
      body: `
Ziva Meds may be used by users in different countries.

Because the App is designed to keep user-entered information locally on the device, the developer does not intentionally transfer such information to a developer-operated server in another country.

However, Apple and other platform providers may process information according to their own services, infrastructure, terms, and privacy policies.

Your use of those services may therefore involve processing in countries other than your own.
`,
    },
    {
      title: "22. Data Security Limitations",
      body: `
The developer takes a data-minimization approach and does not intentionally maintain a remote database containing the information entered into Ziva Meds.

However, no software, device, operating system, or storage technology can be guaranteed to be completely secure.

The developer cannot guarantee that information stored on your device will never be:

• Lost
• Corrupted
• Accessed without authorization
• Disclosed
• Compromised
• Affected by software or operating-system failures

You use the App with the understanding that device-level security and system-level services are outside the developer's complete control.
`,
    },
    {
      title: "23. Changes to This Privacy Policy",
      body: `
This Privacy Policy may be updated from time to time.

The "Last updated" date at the beginning of this Privacy Policy indicates when it was most recently revised.

If the App's data practices materially change, the Privacy Policy will be updated to describe those changes.

You are encouraged to review this Privacy Policy periodically.

Your continued use of the App following an update constitutes acceptance of the updated Privacy Policy to the extent permitted by applicable law.
`,
    },
    {
      title: "24. Contact",
      body: `
If you have questions, concerns, or requests regarding this Privacy Policy or Ziva Meds's privacy practices, you may contact the developer at:

jovovic.marko@yandex.com

The developer aims to respond to privacy enquiries within 30 days. Ziva Meds is maintained by an individual developer, and response times may vary.

Please do not include medication, health, or other sensitive information in your message unless it is necessary for your request.
`,
    },
    {
      title: "25. Developer Statement",
      body: `
Ziva Meds is designed with a local-first approach to privacy.

The developer's intention is to minimize the collection and transmission of personal and health-related information and to keep information entered into the App under the user's control on the user's device, subject to Apple platform services and the user's own device configuration.

This Privacy Policy describes the App as it currently operates. It is provided for transparency and does not create obligations on the developer beyond those imposed by applicable law.

Nothing in this Privacy Policy is intended to remove or limit any rights you may have under applicable privacy or consumer-protection law. Where any part of this Privacy Policy is found to be unenforceable, the remainder continues to apply.
`,
    },
  ],
} as const;

export type PolicyBlock =
  | { kind: "paragraph"; text: string }
  | { kind: "list"; items: string[] };

/** Splits a body into paragraphs and bullet lists, in order. */
export function parsePolicyBody(body: string): PolicyBlock[] {
  const blocks: PolicyBlock[] = [];
  for (const chunk of body.trim().split(/\n\s*\n/)) {
    const lines = chunk.split("\n").map((line) => line.trim()).filter(Boolean);
    if (lines.length === 0) continue;
    if (lines.every((line) => line.startsWith("• "))) {
      blocks.push({ kind: "list", items: lines.map((line) => line.slice(2)) });
    } else {
      blocks.push({ kind: "paragraph", text: lines.join(" ") });
    }
  }
  return blocks;
}

/** "1. Information You Enter" → "information-you-enter", for anchors. */
export function policyAnchor(title: string): string {
  return title
    .replace(/^\d+\.\s*/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
