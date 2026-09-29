import { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { LegalDoc } from "@/components/marketing/LegalDoc";
import { site } from "@/content/site";

export const metadata: Metadata = pageMetadata({
  title: "Delete Your Account",
  description:
    "How to delete your Alpline account and what happens to your data afterwards, including what is removed immediately and what we retain for legal compliance.",
  path: "/delete-account",
});

/**
 * Account deletion instructions.
 *
 * Google Play's Data safety form and App Store Guideline 5.1.1(v) both require a
 * publicly reachable URL that explains deletion without requiring a login. This
 * page is that URL — it is linked from the store listings, so its path must not
 * change without updating both consoles.
 *
 * Retention periods here are quoted from the Privacy Policy (section 6.2) and
 * must stay in step with it.
 */
export default function DeleteAccountPage() {
  return (
    <LegalDoc title="Delete Your Alpline Account">
      <p>
        You can delete your Alpline account at any time, directly from the app.
        Deleting your account is permanent and cannot be undone.
      </p>

      <h2>Delete from within the app</h2>
      <ol>
        <li>Open Alpline and go to your <strong>Account</strong>.</li>
        <li>Select <strong>Privacy</strong>.</li>
        <li>Choose <strong>Delete Account</strong> and confirm.</li>
      </ol>
      <p>
        Your account is closed straight away and you are signed out on every
        device.
      </p>

      <h2>If you cannot access the app</h2>
      <p>
        If you have lost access to your device or can no longer sign in, email{" "}
        <strong>privacy@getalpline.com</strong> from the address on your Alpline
        account and ask us to delete it. We will verify that the request comes
        from the account holder before acting on it, and we aim to respond within
        30 days.
      </p>

      <h2>What is deleted</h2>
      <p>Deleting your account removes:</p>
      <ul>
        <li>Your profile — name, email address, photo and preferences</li>
        <li>Your recorded runs, activity history and performance statistics</li>
        <li>Saved places, pins, routes and downloaded map regions</li>
        <li>Trips you own, and your membership of trips owned by others</li>
        <li>Friend connections and any crews you belong to</li>
        <li>Your emergency contacts and any active location shares</li>
        <li>Photos and content you have uploaded</li>
      </ul>

      <h2>What is retained, and for how long</h2>
      <p>
        Most personal data is deleted within <strong>30 days</strong>. Some
        information is kept longer:
      </p>
      <ul>
        <li>
          Records we must keep for legal, tax or safety compliance — retained for
          up to <strong>7 years</strong>
        </li>
        <li>
          Aggregated and anonymised statistics that can no longer be linked to
          you — retained indefinitely
        </li>
        <li>
          Content you contributed publicly, such as snow reports, which remains
          but is no longer attributed to your account
        </li>
      </ul>
      <p>
        Backups are purged on their own rotation, so a copy may persist in
        encrypted backup storage for a short period after deletion.
      </p>

      <h2>Subscriptions</h2>
      <p>
        Deleting your account does <strong>not</strong> cancel a paid
        subscription. Subscriptions are billed by Apple or Google, not by us, so
        cancel yours in the App Store or Google Play before deleting your account
        — otherwise billing continues.
      </p>

      <h2>Questions</h2>
      <p>
        For anything about deletion or your data, contact us at{" "}
        <strong>privacy@getalpline.com</strong> or{" "}
        <strong>{site.email}</strong>. Our full{" "}
        <a href="/privacy">Privacy Policy</a> explains how we handle your data
        while your account is open.
      </p>
    </LegalDoc>
  );
}
