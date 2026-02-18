"use client";

import { db } from "@/lib/db";
import { Login } from "./components/Login";
import { AppShell } from "./components/AppShell";
import { MemeGenerator } from "./components/MemeGenerator";

export default function Home() {
  return (
    <>
      <db.SignedIn>
        <AppShell>
          <MemeGenerator />
        </AppShell>
      </db.SignedIn>
      <db.SignedOut>
        <Login />
      </db.SignedOut>
    </>
  );
}
