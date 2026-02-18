(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/instant.schema.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$instantdb$2f$react$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@instantdb/react/dist/esm/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$instantdb$2f$core$2f$dist$2f$esm$2f$schema$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@instantdb/core/dist/esm/schema.js [app-client] (ecmascript)");
;
const _schema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$instantdb$2f$core$2f$dist$2f$esm$2f$schema$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["i"].schema({
    entities: {
        $files: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$instantdb$2f$core$2f$dist$2f$esm$2f$schema$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["i"].entity({
            path: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$instantdb$2f$core$2f$dist$2f$esm$2f$schema$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["i"].string().unique().indexed(),
            url: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$instantdb$2f$core$2f$dist$2f$esm$2f$schema$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["i"].string()
        }),
        $users: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$instantdb$2f$core$2f$dist$2f$esm$2f$schema$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["i"].entity({
            email: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$instantdb$2f$core$2f$dist$2f$esm$2f$schema$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["i"].string().unique().indexed().optional()
        }),
        memes: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$instantdb$2f$core$2f$dist$2f$esm$2f$schema$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["i"].entity({
            createdAt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$instantdb$2f$core$2f$dist$2f$esm$2f$schema$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["i"].date()
        }),
        upvotes: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$instantdb$2f$core$2f$dist$2f$esm$2f$schema$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["i"].entity({})
    },
    links: {
        memeImage: {
            forward: {
                on: "memes",
                has: "one",
                label: "image"
            },
            reverse: {
                on: "$files",
                has: "many",
                label: "memes"
            }
        },
        memeAuthor: {
            forward: {
                on: "memes",
                has: "one",
                label: "author"
            },
            reverse: {
                on: "$users",
                has: "many",
                label: "memes"
            }
        },
        upvoteMeme: {
            forward: {
                on: "upvotes",
                has: "one",
                label: "meme"
            },
            reverse: {
                on: "memes",
                has: "many",
                label: "upvotes"
            }
        },
        upvoteUser: {
            forward: {
                on: "upvotes",
                has: "one",
                label: "$user"
            },
            reverse: {
                on: "$users",
                has: "many",
                label: "upvotes"
            }
        }
    },
    rooms: {}
});
const schema = _schema;
const __TURBOPACK__default__export__ = schema;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/db.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "db",
    ()=>db
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$instantdb$2f$react$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@instantdb/react/dist/esm/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$instantdb$2f$react$2f$dist$2f$esm$2f$init$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@instantdb/react/dist/esm/init.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$instant$2e$schema$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/instant.schema.ts [app-client] (ecmascript)");
;
;
const appId = ("TURBOPACK compile-time value", "9c63eab6-a43a-42ae-b6a0-d401cc2082ba");
const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$instantdb$2f$react$2f$dist$2f$esm$2f$init$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["init"])({
    appId,
    schema: __TURBOPACK__imported__module__$5b$project$5d2f$instant$2e$schema$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    useDateObjects: true
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/Login.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Login",
    ()=>Login
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function Login() {
    _s();
    const [sentEmail, setSentEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const emailRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const codeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    if (!sentEmail) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen flex items-center justify-center p-4",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full max-w-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-xl font-semibold text-[var(--text)] mb-2",
                        children: "Sign in"
                    }, void 0, false, {
                        fileName: "[project]/app/components/Login.tsx",
                        lineNumber: 16,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-[var(--muted)] mb-4",
                        children: "Enter your email and we will send you a 6-digit code to sign in."
                    }, void 0, false, {
                        fileName: "[project]/app/components/Login.tsx",
                        lineNumber: 19,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        className: "flex flex-col gap-3",
                        onSubmit: (e)=>{
                            e.preventDefault();
                            const email = emailRef.current?.value?.trim();
                            if (!email) return;
                            setError("");
                            setSentEmail(email);
                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].auth.sendMagicCode({
                                email
                            }).catch((err)=>{
                                setError(err?.body?.message ?? "Failed to send code");
                                setSentEmail("");
                            });
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                ref: emailRef,
                                type: "email",
                                placeholder: "you@example.com",
                                required: true,
                                autoFocus: true,
                                className: "w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--accent)]"
                            }, void 0, false, {
                                fileName: "[project]/app/components/Login.tsx",
                                lineNumber: 36,
                                columnNumber: 13
                            }, this),
                            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-red-400",
                                children: error
                            }, void 0, false, {
                                fileName: "[project]/app/components/Login.tsx",
                                lineNumber: 45,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "submit",
                                className: "w-full py-2 rounded-lg bg-[var(--accent)] text-black font-medium hover:bg-[var(--accent-hover)] transition-colors",
                                children: "Send code"
                            }, void 0, false, {
                                fileName: "[project]/app/components/Login.tsx",
                                lineNumber: 47,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/Login.tsx",
                        lineNumber: 22,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/Login.tsx",
                lineNumber: 15,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/components/Login.tsx",
            lineNumber: 14,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen flex items-center justify-center p-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full max-w-sm",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "text-xl font-semibold text-[var(--text)] mb-2",
                    children: "Enter code"
                }, void 0, false, {
                    fileName: "[project]/app/components/Login.tsx",
                    lineNumber: 62,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-sm text-[var(--muted)] mb-4",
                    children: [
                        "We sent a 6-digit code to ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                            className: "text-[var(--text)]",
                            children: sentEmail
                        }, void 0, false, {
                            fileName: "[project]/app/components/Login.tsx",
                            lineNumber: 66,
                            columnNumber: 37
                        }, this),
                        ". Enter it below."
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/Login.tsx",
                    lineNumber: 65,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    className: "flex flex-col gap-3",
                    onSubmit: (e)=>{
                        e.preventDefault();
                        const code = codeRef.current?.value?.trim();
                        if (!code) return;
                        setError("");
                        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].auth.signInWithMagicCode({
                            email: sentEmail,
                            code
                        }).catch((err)=>{
                            setError(err?.body?.message ?? "Invalid code");
                            if (codeRef.current) codeRef.current.value = "";
                        });
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            ref: codeRef,
                            type: "text",
                            inputMode: "numeric",
                            autoComplete: "one-time-code",
                            placeholder: "123456",
                            maxLength: 6,
                            required: true,
                            autoFocus: true,
                            className: "w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--accent)] text-center tracking-[0.5em] font-mono text-lg"
                        }, void 0, false, {
                            fileName: "[project]/app/components/Login.tsx",
                            lineNumber: 81,
                            columnNumber: 11
                        }, this),
                        error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-red-400",
                            children: error
                        }, void 0, false, {
                            fileName: "[project]/app/components/Login.tsx",
                            lineNumber: 93,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "submit",
                            className: "w-full py-2 rounded-lg bg-[var(--accent)] text-black font-medium hover:bg-[var(--accent-hover)] transition-colors",
                            children: "Verify"
                        }, void 0, false, {
                            fileName: "[project]/app/components/Login.tsx",
                            lineNumber: 95,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: "w-full py-2 text-sm text-[var(--muted)] hover:text-[var(--text)]",
                            onClick: ()=>setSentEmail(""),
                            children: "Use a different email"
                        }, void 0, false, {
                            fileName: "[project]/app/components/Login.tsx",
                            lineNumber: 101,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/Login.tsx",
                    lineNumber: 68,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/components/Login.tsx",
            lineNumber: 61,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/components/Login.tsx",
        lineNumber: 60,
        columnNumber: 5
    }, this);
}
_s(Login, "JzUKY5qykR7cpgtbgevSWlD3t/s=");
_c = Login;
var _c;
__turbopack_context__.k.register(_c, "Login");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/AppShell.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AppShell",
    ()=>AppShell
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function AppShell({ children }) {
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const user = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].useUser();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen flex flex-col",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "sticky top-0 z-10 border-b border-[var(--border)] bg-[var(--bg)]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-4xl mx-auto px-4 h-12 flex items-center justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                            className: "flex items-center gap-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/",
                                    className: `text-sm font-medium ${pathname === "/" ? "text-[var(--accent)]" : "text-[var(--muted)] hover:text-[var(--text)]"}`,
                                    children: "Create"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/AppShell.tsx",
                                    lineNumber: 16,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/gallery",
                                    className: `text-sm font-medium ${pathname === "/gallery" ? "text-[var(--accent)]" : "text-[var(--muted)] hover:text-[var(--text)]"}`,
                                    children: "Gallery"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/AppShell.tsx",
                                    lineNumber: 22,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/AppShell.tsx",
                            lineNumber: 15,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs text-[var(--muted)] truncate max-w-[160px]",
                                    title: user?.email ?? "",
                                    children: user?.email ?? ""
                                }, void 0, false, {
                                    fileName: "[project]/app/components/AppShell.tsx",
                                    lineNumber: 30,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].auth.signOut(),
                                    className: "text-xs text-[var(--muted)] hover:text-[var(--text)]",
                                    children: "Sign out"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/AppShell.tsx",
                                    lineNumber: 33,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/AppShell.tsx",
                            lineNumber: 29,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/AppShell.tsx",
                    lineNumber: 14,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/AppShell.tsx",
                lineNumber: 13,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "flex-1",
                children: children
            }, void 0, false, {
                fileName: "[project]/app/components/AppShell.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/AppShell.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
}
_s(AppShell, "FfeT10WvBlN3OLZ4edgmJYj2tbI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].useUser
    ];
});
_c = AppShell;
var _c;
__turbopack_context__.k.register(_c, "AppShell");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/MemeGenerator.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MemeGenerator",
    ()=>MemeGenerator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$instantdb$2f$react$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@instantdb/react/dist/esm/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$instantdb$2f$core$2f$dist$2f$esm$2f$utils$2f$id$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__id$3e$__ = __turbopack_context__.i("[project]/node_modules/@instantdb/core/dist/esm/utils/id.js [app-client] (ecmascript) <export default as id>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
const TEMPLATES = [];
const LINE_HEIGHT = 1.2;
const WRAP_PADDING = 48;
const BOX_PADDING = 8;
const MIN_WRAP = 100;
const HANDLE_SIZE = 10;
const HANDLE_HIT = 10;
const SELECTION_STROKE = "#e0e0e0";
function clamp(n, min, max) {
    return Math.min(max, Math.max(min, n));
}
function MemeGenerator() {
    _s();
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const imageRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const nextIdRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(1);
    const dragState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        active: false,
        offsetX: 0,
        offsetY: 0
    });
    const resizeState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        active: false,
        handle: null,
        anchor: null
    });
    const user = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].useUser();
    const [imageSrc, setImageSrc] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [imageReady, setImageReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [texts, setTexts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedId, setSelectedId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [posting, setPosting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const selectedText = texts.find((t)=>t.id === selectedId);
    const getDefaultWrap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MemeGenerator.useCallback[getDefaultWrap]": ()=>{
            const img = imageRef.current;
            if (!img) return 240;
            return clamp(480, MIN_WRAP, Math.max(MIN_WRAP, img.naturalWidth - WRAP_PADDING));
        }
    }["MemeGenerator.useCallback[getDefaultWrap]"], []);
    const addText = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MemeGenerator.useCallback[addText]": ()=>{
            if (!imageRef.current) return;
            const img = imageRef.current;
            const t = {
                id: nextIdRef.current++,
                text: "New Text",
                x: img.naturalWidth / 2,
                y: img.naturalHeight / 2,
                fontSize: 48,
                fillColor: "#ffffff",
                strokeColor: "#000000",
                wrapWidth: getDefaultWrap()
            };
            setTexts({
                "MemeGenerator.useCallback[addText]": (prev)=>[
                        ...prev,
                        t
                    ]
            }["MemeGenerator.useCallback[addText]"]);
            setSelectedId(t.id);
        }
    }["MemeGenerator.useCallback[addText]"], [
        getDefaultWrap
    ]);
    const deleteSelected = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MemeGenerator.useCallback[deleteSelected]": ()=>{
            if (selectedId == null) return;
            setTexts({
                "MemeGenerator.useCallback[deleteSelected]": (prev)=>prev.filter({
                        "MemeGenerator.useCallback[deleteSelected]": (t)=>t.id !== selectedId
                    }["MemeGenerator.useCallback[deleteSelected]"])
            }["MemeGenerator.useCallback[deleteSelected]"]);
            setSelectedId(null);
        }
    }["MemeGenerator.useCallback[deleteSelected]"], [
        selectedId
    ]);
    const updateText = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MemeGenerator.useCallback[updateText]": (id, patch)=>{
            setTexts({
                "MemeGenerator.useCallback[updateText]": (prev)=>prev.map({
                        "MemeGenerator.useCallback[updateText]": (t)=>t.id === id ? {
                                ...t,
                                ...patch
                            } : t
                    }["MemeGenerator.useCallback[updateText]"])
            }["MemeGenerator.useCallback[updateText]"]);
        }
    }["MemeGenerator.useCallback[updateText]"], []);
    const getLines = (text)=>text.split("\n").map((s)=>s.trim());
    const hasVisible = (text)=>getLines(text).some((line)=>line.length > 0);
    const breakWord = (ctx, word, maxW)=>{
        const chunks = [];
        let rest = word;
        while(rest && ctx.measureText(rest).width > maxW){
            let fit = "";
            for(let c = 0; c < rest.length; c++){
                if (ctx.measureText(fit + rest[c]).width <= maxW) fit += rest[c];
                else break;
            }
            if (fit) {
                chunks.push(fit);
                rest = rest.slice(fit.length);
            } else {
                chunks.push(rest[0]);
                rest = rest.slice(1);
            }
        }
        if (rest) chunks.push(rest);
        return chunks;
    };
    const wrapLine = (ctx, line, maxW)=>{
        if (maxW <= 0 || !line) return [
            ""
        ];
        const words = line.split(/\s+/);
        if (words.length === 0) return [
            ""
        ];
        const result = [];
        let current = words[0];
        const flush = ()=>{
            if (ctx.measureText(current).width <= maxW) {
                result.push(current);
                current = "";
            } else {
                const ch = breakWord(ctx, current, maxW);
                for(let k = 0; k < ch.length - 1; k++)result.push(ch[k]);
                current = ch[ch.length - 1] || "";
            }
        };
        flush();
        for(let i = 1; i < words.length; i++){
            const next = current ? current + " " + words[i] : words[i];
            if (ctx.measureText(next).width <= maxW) current = next;
            else {
                if (current) flush();
                current = words[i];
                flush();
            }
        }
        if (current) result.push(current);
        return result;
    };
    const getWrappedLines = (ctx, text, maxW)=>{
        const out = [];
        getLines(text).forEach((line)=>{
            wrapLine(ctx, line, maxW).forEach((l)=>out.push(l));
        });
        return out;
    };
    const getWrapW = (canvasW, t)=>{
        const maxAllowed = Math.max(MIN_WRAP, canvasW - WRAP_PADDING);
        return clamp(Number.isFinite(t.wrapWidth) ? t.wrapWidth : getDefaultWrap(), MIN_WRAP, maxAllowed);
    };
    const drawText = (ctx, t, canvasW)=>{
        if (!hasVisible(t.text)) return;
        const wrapW = Math.max(MIN_WRAP, getWrapW(canvasW, t));
        ctx.font = `bold ${t.fontSize}px Impact, "Arial Black", sans-serif`;
        const lines = getWrappedLines(ctx, t.text, wrapW);
        if (lines.length === 0) return;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.lineJoin = "round";
        ctx.lineWidth = Math.max(2, Math.round(t.fontSize / 12));
        ctx.strokeStyle = t.strokeColor;
        ctx.fillStyle = t.fillColor;
        const lh = t.fontSize * LINE_HEIGHT;
        const totalH = (lines.length - 1) * lh;
        const startY = t.y - totalH / 2;
        lines.forEach((line, i)=>{
            const lineY = startY + i * lh;
            ctx.strokeText(line, t.x, lineY);
            ctx.fillText(line, t.x, lineY);
        });
    };
    const getHitBox = (ctx, t, canvasW)=>{
        if (!hasVisible(t.text)) return null;
        ctx.font = `bold ${t.fontSize}px Impact, "Arial Black", sans-serif`;
        const wrapW = getWrapW(canvasW, t);
        const lines = getWrappedLines(ctx, t.text, wrapW);
        if (lines.length === 0) return null;
        const lh = t.fontSize * LINE_HEIGHT;
        const halfW = wrapW / 2 + BOX_PADDING;
        const halfH = lines.length * lh / 2 + BOX_PADDING;
        return {
            left: t.x - halfW,
            right: t.x + halfW,
            top: t.y - halfH,
            bottom: t.y + halfH
        };
    };
    const getResizeHandle = (box, x, y)=>{
        const handles = [
            {
                id: "nw",
                x: box.left,
                y: box.top
            },
            {
                id: "ne",
                x: box.right,
                y: box.top
            },
            {
                id: "sw",
                x: box.left,
                y: box.bottom
            },
            {
                id: "se",
                x: box.right,
                y: box.bottom
            }
        ];
        for (const h of handles){
            if (Math.abs(x - h.x) <= HANDLE_HIT && Math.abs(y - h.y) <= HANDLE_HIT) return h.id;
        }
        return null;
    };
    const getTextAt = (ctx, canvasW, x, y)=>{
        for(let i = texts.length - 1; i >= 0; i--){
            const t = texts[i];
            const box = getHitBox(ctx, t, canvasW);
            if (box && x >= box.left && x <= box.right && y >= box.top && y <= box.bottom) return t;
        }
        return null;
    };
    const render = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MemeGenerator.useCallback[render]": ()=>{
            const canvas = canvasRef.current;
            const img = imageRef.current;
            if (!canvas || !img) return;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;
            const w = img.naturalWidth;
            const h = img.naturalHeight;
            canvas.width = w;
            canvas.height = h;
            ctx.drawImage(img, 0, 0, w, h);
            texts.forEach({
                "MemeGenerator.useCallback[render]": (t)=>drawText(ctx, t, w)
            }["MemeGenerator.useCallback[render]"]);
            if (selectedText) {
                const box = getHitBox(ctx, selectedText, w);
                if (box) {
                    ctx.strokeStyle = SELECTION_STROKE;
                    ctx.lineWidth = 2;
                    ctx.setLineDash([
                        5,
                        5
                    ]);
                    ctx.strokeRect(box.left, box.top, box.right - box.left, box.bottom - box.top);
                    ctx.setLineDash([]);
                    ctx.fillStyle = "#ffffff";
                    ctx.strokeStyle = "#111111";
                    ctx.lineWidth = 2;
                    [
                        box.left,
                        box.right
                    ].forEach({
                        "MemeGenerator.useCallback[render]": (bx)=>[
                                box.top,
                                box.bottom
                            ].forEach({
                                "MemeGenerator.useCallback[render]": (by)=>{
                                    ctx.fillRect(bx - HANDLE_SIZE / 2, by - HANDLE_SIZE / 2, HANDLE_SIZE, HANDLE_SIZE);
                                    ctx.strokeRect(bx - HANDLE_SIZE / 2, by - HANDLE_SIZE / 2, HANDLE_SIZE, HANDLE_SIZE);
                                }
                            }["MemeGenerator.useCallback[render]"])
                    }["MemeGenerator.useCallback[render]"]);
                }
            }
        }
    }["MemeGenerator.useCallback[render]"], [
        texts,
        selectedText
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MemeGenerator.useEffect": ()=>{
            if (!imageSrc) return;
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.onload = ({
                "MemeGenerator.useEffect": ()=>{
                    imageRef.current = img;
                    setImageReady(true);
                    render();
                }
            })["MemeGenerator.useEffect"];
            img.onerror = ({
                "MemeGenerator.useEffect": ()=>{
                    setImageSrc(null);
                    setImageReady(false);
                }
            })["MemeGenerator.useEffect"];
            img.src = imageSrc;
            return ({
                "MemeGenerator.useEffect": ()=>{
                    img.src = "";
                    setImageReady(false);
                    if (imageSrc.startsWith("blob:")) URL.revokeObjectURL(imageSrc);
                }
            })["MemeGenerator.useEffect"];
        }
    }["MemeGenerator.useEffect"], [
        imageSrc
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MemeGenerator.useEffect": ()=>{
            render();
        }
    }["MemeGenerator.useEffect"], [
        render
    ]);
    const screenToCanvas = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MemeGenerator.useCallback[screenToCanvas]": (clientX, clientY)=>{
            const canvas = canvasRef.current;
            if (!canvas) return {
                x: 0,
                y: 0
            };
            const rect = canvas.getBoundingClientRect();
            const scaleX = canvas.width / rect.width;
            const scaleY = canvas.height / rect.height;
            return {
                x: (clientX - rect.left) * scaleX,
                y: (clientY - rect.top) * scaleY
            };
        }
    }["MemeGenerator.useCallback[screenToCanvas]"], []);
    const handleCanvasMouseDown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MemeGenerator.useCallback[handleCanvasMouseDown]": (e)=>{
            const img = imageRef.current;
            const canvas = canvasRef.current;
            if (!img || !canvas) return;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;
            const pos = screenToCanvas(e.clientX, e.clientY);
            const w = canvas.width;
            if (selectedText) {
                const box = getHitBox(ctx, selectedText, w);
                if (box) {
                    const handle = getResizeHandle(box, pos.x, pos.y);
                    if (handle) {
                        resizeState.current = {
                            active: true,
                            handle,
                            anchor: {
                                left: box.left,
                                right: box.right
                            }
                        };
                        canvas.style.cursor = handle === "nw" || handle === "se" ? "nwse-resize" : "nesw-resize";
                        return;
                    }
                }
            }
            const textAt = getTextAt(ctx, w, pos.x, pos.y);
            if (textAt) {
                setSelectedId(textAt.id);
                dragState.current = {
                    active: true,
                    offsetX: pos.x - textAt.x,
                    offsetY: pos.y - textAt.y
                };
                canvas.style.cursor = "grabbing";
                return;
            }
            setSelectedId(null);
        }
    }["MemeGenerator.useCallback[handleCanvasMouseDown]"], [
        selectedText,
        screenToCanvas
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MemeGenerator.useEffect": ()=>{
            const canvas = canvasRef.current;
            if (!canvas) return;
            const onMove = {
                "MemeGenerator.useEffect.onMove": (e)=>{
                    const img = imageRef.current;
                    if (!img) return;
                    const pos = screenToCanvas(e.clientX, e.clientY);
                    const ctx = canvas.getContext("2d");
                    if (!ctx) return;
                    const w = canvas.width;
                    if (resizeState.current.active && selectedText && resizeState.current.handle) {
                        const { handle, anchor } = resizeState.current;
                        const minBox = MIN_WRAP + BOX_PADDING * 2;
                        let left = anchor?.left ?? selectedText.x - getWrapW(w, selectedText) / 2 - BOX_PADDING;
                        let right = anchor?.right ?? selectedText.x + getWrapW(w, selectedText) / 2 + BOX_PADDING;
                        if (handle === "ne" || handle === "se") {
                            left = anchor?.left ?? left;
                            right = pos.x;
                            if (right - left < minBox) right = left + minBox;
                        } else {
                            right = anchor?.right ?? right;
                            left = pos.x;
                            if (right - left < minBox) left = right - minBox;
                        }
                        left = clamp(left, 0, w - minBox);
                        right = clamp(right, left + minBox, w);
                        const halfH = selectedText.fontSize * LINE_HEIGHT * 2 / 2 + BOX_PADDING;
                        updateText(selectedText.id, {
                            wrapWidth: Math.max(MIN_WRAP, right - left - BOX_PADDING * 2),
                            x: (left + right) / 2,
                            y: handle === "nw" || handle === "ne" ? pos.y + halfH : pos.y - halfH
                        });
                        return;
                    }
                    if (dragState.current.active && selectedText) {
                        updateText(selectedText.id, {
                            x: pos.x - dragState.current.offsetX,
                            y: pos.y - dragState.current.offsetY
                        });
                    }
                }
            }["MemeGenerator.useEffect.onMove"];
            const onUp = {
                "MemeGenerator.useEffect.onUp": ()=>{
                    resizeState.current = {
                        active: false,
                        handle: null,
                        anchor: null
                    };
                    dragState.current = {
                        active: false,
                        offsetX: 0,
                        offsetY: 0
                    };
                    if (canvas) canvas.style.cursor = "default";
                }
            }["MemeGenerator.useEffect.onUp"];
            window.addEventListener("mousemove", onMove);
            window.addEventListener("mouseup", onUp);
            return ({
                "MemeGenerator.useEffect": ()=>{
                    window.removeEventListener("mousemove", onMove);
                    window.removeEventListener("mouseup", onUp);
                }
            })["MemeGenerator.useEffect"];
        }
    }["MemeGenerator.useEffect"], [
        selectedText,
        screenToCanvas,
        updateText
    ]);
    const handleCanvasMouseMove = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MemeGenerator.useCallback[handleCanvasMouseMove]": (e)=>{
            const canvas = canvasRef.current;
            const img = imageRef.current;
            if (!img || !canvas) return;
            const pos = screenToCanvas(e.clientX, e.clientY);
            const ctx = canvas.getContext("2d");
            if (!ctx) return;
            if (dragState.current.active || resizeState.current.active) return;
            if (selectedText) {
                const box = getHitBox(ctx, selectedText, canvas.width);
                if (box) {
                    const h = getResizeHandle(box, pos.x, pos.y);
                    if (h) {
                        canvas.style.cursor = h === "nw" || h === "se" ? "nwse-resize" : "nesw-resize";
                        return;
                    }
                }
            }
            const at = getTextAt(ctx, canvas.width, pos.x, pos.y);
            canvas.style.cursor = at ? "grab" : "default";
        }
    }["MemeGenerator.useCallback[handleCanvasMouseMove]"], [
        selectedText,
        screenToCanvas
    ]);
    const handleFileChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MemeGenerator.useCallback[handleFileChange]": (e)=>{
            const file = e.target.files?.[0];
            if (!file) return;
            const url = URL.createObjectURL(file);
            setImageSrc(url);
            setTexts([]);
            setSelectedId(null);
            e.target.value = "";
        }
    }["MemeGenerator.useCallback[handleFileChange]"], []);
    const postToGallery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MemeGenerator.useCallback[postToGallery]": async ()=>{
            const canvas = canvasRef.current;
            const img = imageRef.current;
            if (!canvas || !user?.id) return;
            setPosting(true);
            try {
                const blob = await new Promise({
                    "MemeGenerator.useCallback[postToGallery]": (res)=>canvas.toBlob(res, "image/png")
                }["MemeGenerator.useCallback[postToGallery]"]);
                if (!blob) throw new Error("Failed to create image");
                const file = new File([
                    blob
                ], `meme-${Date.now()}.png`, {
                    type: "image/png"
                });
                const path = `memes/${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$instantdb$2f$core$2f$dist$2f$esm$2f$utils$2f$id$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__id$3e$__["id"])()}.png`;
                const { data: uploadData } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].storage.uploadFile(path, file, {
                    contentType: "image/png"
                });
                const fileId = uploadData?.id;
                if (!fileId) throw new Error("File not found after upload");
                const memeId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$instantdb$2f$core$2f$dist$2f$esm$2f$utils$2f$id$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__id$3e$__["id"])();
                await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].transact([
                    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].tx.memes[memeId].update({
                        createdAt: Date.now()
                    }).link({
                        image: fileId,
                        author: user.id
                    })
                ]);
                setImageSrc(null);
                setTexts([]);
                setSelectedId(null);
                imageRef.current = null;
                window.location.href = "/gallery";
            } catch (err) {
                console.error(err);
            } finally{
                setPosting(false);
            }
        }
    }["MemeGenerator.useCallback[postToGallery]"], [
        user?.id
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col h-[calc(100vh-3rem)]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-1 min-h-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                        className: "w-[72px] shrink-0 border-r border-[var(--border)] bg-[var(--surface)] flex flex-col",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-3 flex flex-col items-center gap-2 border-b border-[var(--border)]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] font-semibold uppercase tracking-wide text-[var(--muted)]",
                                        children: "Templates"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/MemeGenerator.tsx",
                                        lineNumber: 498,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "flex items-center justify-center w-12 h-12 rounded-lg bg-[#333] cursor-pointer text-xs text-[var(--text)] hover:bg-[#3d3d3d] transition-colors",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Upload"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/MemeGenerator.tsx",
                                                lineNumber: 502,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "file",
                                                accept: "image/*",
                                                onChange: handleFileChange,
                                                className: "absolute w-0 h-0 opacity-0 overflow-hidden"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/MemeGenerator.tsx",
                                                lineNumber: 503,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/MemeGenerator.tsx",
                                        lineNumber: 501,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/MemeGenerator.tsx",
                                lineNumber: 497,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 overflow-y-auto p-2 flex flex-col items-center gap-2",
                                children: TEMPLATES.map((filename)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "block w-14 h-14 rounded-lg border-2 border-[#3a3a3a] bg-[#2a2a2a] overflow-hidden shrink-0 hover:border-[#555] focus:outline-none focus:border-[#666]",
                                        onClick: ()=>{
                                            setImageSrc(`/assets/${filename}`);
                                            setTexts([]);
                                            setSelectedId(null);
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: `/assets/${filename}`,
                                            alt: "",
                                            className: "w-full h-full object-cover"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/MemeGenerator.tsx",
                                            lineNumber: 523,
                                            columnNumber: 17
                                        }, this)
                                    }, filename, false, {
                                        fileName: "[project]/app/components/MemeGenerator.tsx",
                                        lineNumber: 513,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/components/MemeGenerator.tsx",
                                lineNumber: 511,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/MemeGenerator.tsx",
                        lineNumber: 496,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "flex-1 flex items-center justify-center p-6 min-h-0",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative bg-[#2a2a2a] rounded-xl overflow-hidden max-w-full max-h-full flex items-center justify-center min-w-[200px] min-h-[160px] shadow-lg",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                                    ref: canvasRef,
                                    className: "max-w-full max-h-[calc(100vh-12rem)]",
                                    onMouseDown: handleCanvasMouseDown,
                                    onMouseMove: handleCanvasMouseMove,
                                    onMouseLeave: ()=>{
                                        if (canvasRef.current) canvasRef.current.style.cursor = "default";
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/app/components/MemeGenerator.tsx",
                                    lineNumber: 535,
                                    columnNumber: 13
                                }, this),
                                !imageSrc && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "absolute m-0 text-[var(--muted)] text-sm",
                                    children: "Select a template or upload an image"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/MemeGenerator.tsx",
                                    lineNumber: 545,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/MemeGenerator.tsx",
                            lineNumber: 534,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/components/MemeGenerator.tsx",
                        lineNumber: 533,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/MemeGenerator.tsx",
                lineNumber: 495,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-center pb-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center flex-wrap gap-2 px-4 py-2 bg-[var(--surface)] border border-[var(--border)] rounded-3xl shadow-lg max-w-[min(96vw,720px)]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-1.5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: addText,
                                    disabled: !imageReady,
                                    className: "px-3.5 py-2 text-sm font-medium text-[var(--text)] bg-transparent border-none rounded-lg cursor-pointer hover:bg-[#333] disabled:opacity-50 disabled:cursor-not-allowed",
                                    children: "Add Text"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/MemeGenerator.tsx",
                                    lineNumber: 556,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: deleteSelected,
                                    disabled: !selectedId,
                                    className: "px-3.5 py-2 text-sm font-medium text-[var(--text)] bg-transparent border-none rounded-lg cursor-pointer hover:bg-red-900/25 hover:text-red-300 disabled:opacity-50 disabled:cursor-not-allowed",
                                    children: "Delete"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/MemeGenerator.tsx",
                                    lineNumber: 564,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/MemeGenerator.tsx",
                            lineNumber: 555,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-px h-7 bg-[#3a3a3a] mx-2"
                        }, void 0, false, {
                            fileName: "[project]/app/components/MemeGenerator.tsx",
                            lineNumber: 573,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-0.5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[10px] uppercase tracking-wide text-[var(--muted)]",
                                    children: "Text"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/MemeGenerator.tsx",
                                    lineNumber: 575,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                    value: selectedText?.text ?? "",
                                    onChange: (e)=>selectedText && updateText(selectedText.id, {
                                            text: e.target.value
                                        }),
                                    placeholder: selectedText ? "Edit selected text" : "Select text or Add Text",
                                    rows: 1,
                                    maxLength: 300,
                                    disabled: !selectedText,
                                    className: "w-40 min-h-7 max-h-14 px-2 py-1 text-sm border border-[#3a3a3a] rounded-md bg-[#1e1e1e] text-[var(--text)] placeholder:text-[var(--muted)] resize-none focus:outline-none focus:border-[#555] disabled:opacity-70 disabled:cursor-not-allowed"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/MemeGenerator.tsx",
                                    lineNumber: 578,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/MemeGenerator.tsx",
                            lineNumber: 574,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-px h-7 bg-[#3a3a3a] mx-2"
                        }, void 0, false, {
                            fileName: "[project]/app/components/MemeGenerator.tsx",
                            lineNumber: 590,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            className: "flex items-center gap-1.5 text-xs text-[var(--muted)]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "Size"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/MemeGenerator.tsx",
                                    lineNumber: 592,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("output", {
                                    className: "min-w-[2ch] tabular-nums",
                                    children: selectedText?.fontSize ?? 48
                                }, void 0, false, {
                                    fileName: "[project]/app/components/MemeGenerator.tsx",
                                    lineNumber: 593,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "range",
                                    min: 16,
                                    max: 120,
                                    value: selectedText?.fontSize ?? 48,
                                    onChange: (e)=>selectedText && updateText(selectedText.id, {
                                            fontSize: parseInt(e.target.value, 10)
                                        }),
                                    className: "w-20 h-1.5 accent-[var(--muted)]"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/MemeGenerator.tsx",
                                    lineNumber: 596,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/MemeGenerator.tsx",
                            lineNumber: 591,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-px h-7 bg-[#3a3a3a] mx-2"
                        }, void 0, false, {
                            fileName: "[project]/app/components/MemeGenerator.tsx",
                            lineNumber: 608,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            className: "flex items-center gap-1.5 text-xs text-[var(--muted)]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "Fill"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/MemeGenerator.tsx",
                                    lineNumber: 610,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "color",
                                    value: selectedText?.fillColor ?? "#ffffff",
                                    onChange: (e)=>selectedText && updateText(selectedText.id, {
                                            fillColor: e.target.value
                                        }),
                                    className: "w-7 h-7 p-0.5 border border-[#3a3a3a] rounded-md bg-[#2a2a2a] cursor-pointer"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/MemeGenerator.tsx",
                                    lineNumber: 611,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/MemeGenerator.tsx",
                            lineNumber: 609,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            className: "flex items-center gap-1.5 text-xs text-[var(--muted)]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "Stroke"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/MemeGenerator.tsx",
                                    lineNumber: 621,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "color",
                                    value: selectedText?.strokeColor ?? "#000000",
                                    onChange: (e)=>selectedText && updateText(selectedText.id, {
                                            strokeColor: e.target.value
                                        }),
                                    className: "w-7 h-7 p-0.5 border border-[#3a3a3a] rounded-md bg-[#2a2a2a] cursor-pointer"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/MemeGenerator.tsx",
                                    lineNumber: 622,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/MemeGenerator.tsx",
                            lineNumber: 620,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-px h-7 bg-[#3a3a3a] mx-2"
                        }, void 0, false, {
                            fileName: "[project]/app/components/MemeGenerator.tsx",
                            lineNumber: 631,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>{
                                const canvas = canvasRef.current;
                                if (!canvas) return;
                                const link = document.createElement("a");
                                link.download = `meme-${Date.now()}.png`;
                                link.href = canvas.toDataURL("image/png");
                                link.click();
                            },
                            disabled: !imageReady,
                            className: "px-3.5 py-2 text-sm font-medium text-white bg-[#2d2d2d] border-none rounded-lg cursor-pointer hover:bg-[#3d3d3d] disabled:opacity-50 disabled:cursor-not-allowed",
                            children: "Download"
                        }, void 0, false, {
                            fileName: "[project]/app/components/MemeGenerator.tsx",
                            lineNumber: 632,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: postToGallery,
                            disabled: !imageRef.current || posting,
                            className: "px-3.5 py-2 text-sm font-medium text-black bg-[var(--accent)] border-none rounded-lg cursor-pointer hover:bg-[var(--accent-hover)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors",
                            children: posting ? "Posting..." : "Post to gallery"
                        }, void 0, false, {
                            fileName: "[project]/app/components/MemeGenerator.tsx",
                            lineNumber: 647,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/MemeGenerator.tsx",
                    lineNumber: 554,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/MemeGenerator.tsx",
                lineNumber: 553,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/MemeGenerator.tsx",
        lineNumber: 494,
        columnNumber: 5
    }, this);
}
_s(MemeGenerator, "hvnpCYSZqAHiuYd42ui5/3PdBCU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].useUser
    ];
});
_c = MemeGenerator;
var _c;
__turbopack_context__.k.register(_c, "MemeGenerator");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Login$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/Login.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$AppShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/AppShell.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$MemeGenerator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/MemeGenerator.tsx [app-client] (ecmascript)");
"use client";
;
;
;
;
;
function Home() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].SignedIn, {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$AppShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AppShell"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$MemeGenerator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MemeGenerator"], {}, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 13,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 12,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 11,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].SignedOut, {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Login$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Login"], {}, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 17,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 16,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_c = Home;
var _c;
__turbopack_context__.k.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_cb7a8ac6._.js.map