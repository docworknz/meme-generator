"use client";

import { useState, useRef } from "react";
import { db } from "@/lib/db";

export function Login() {
  const [sentEmail, setSentEmail] = useState("");
  const [error, setError] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);
  const codeRef = useRef<HTMLInputElement>(null);

  if (!sentEmail) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <h1 className="text-xl font-semibold text-[var(--text)] mb-2">
            Sign in
          </h1>
          <p className="text-sm text-[var(--muted)] mb-4">
            Enter your email and we will send you a 6-digit code to sign in.
          </p>
          <form
            className="flex flex-col gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              const email = emailRef.current?.value?.trim();
              if (!email) return;
              setError("");
              setSentEmail(email);
              db.auth.sendMagicCode({ email }).catch((err) => {
                setError(err?.body?.message ?? "Failed to send code");
                setSentEmail("");
              });
            }}
          >
            <input
              ref={emailRef}
              type="email"
              placeholder="you@example.com"
              required
              autoFocus
              className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--accent)]"
            />
            {error && <p className="text-sm text-red-400">{error}</p>}
            <button
              type="submit"
              className="w-full py-2 rounded-lg bg-[var(--accent)] text-black font-medium hover:bg-[var(--accent-hover)] transition-colors"
            >
              Send code, please
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <h1 className="text-xl font-semibold text-[var(--text)] mb-2">
          Enter code
        </h1>
        <p className="text-sm text-[var(--muted)] mb-4">
          We sent a 6-digit code to{" "}
          <strong className="text-[var(--text)]">{sentEmail}</strong>. Enter it
          below.
        </p>
        <form
          className="flex flex-col gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            const code = codeRef.current?.value?.trim();
            if (!code) return;
            setError("");
            db.auth
              .signInWithMagicCode({ email: sentEmail, code })
              .catch((err) => {
                setError(err?.body?.message ?? "Invalid code");
                if (codeRef.current) codeRef.current.value = "";
              });
          }}
        >
          <input
            ref={codeRef}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            placeholder="123456"
            maxLength={6}
            required
            autoFocus
            className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--accent)] text-center tracking-[0.5em] font-mono text-lg"
          />
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-[var(--accent)] text-black font-medium hover:bg-[var(--accent-hover)] transition-colors"
          >
            Verify
          </button>
          <button
            type="button"
            className="w-full py-2 text-sm text-[var(--muted)] hover:text-[var(--text)]"
            onClick={() => setSentEmail("")}
          >
            Use a different email
          </button>
        </form>
      </div>
    </div>
  );
}
