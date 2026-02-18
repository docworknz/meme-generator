import type { InstantRules } from "@instantdb/react";

const rules = {
  attrs: {
    allow: {
      $default: "false",
    },
  },
  $files: {
    allow: {
      view: "true",
      create: "isLoggedIn",
      delete: "isLoggedIn",
    },
    bind: {
      isLoggedIn: "auth.id != null",
    },
  },
  memes: {
    allow: {
      view: "true",
      create: "isLoggedIn",
      update: "false",
      delete: "false",
    },
    bind: {
      isLoggedIn: "auth.id != null",
    },
  },
  upvotes: {
    allow: {
      view: "true",
      create: "isLoggedIn",
      update: "false",
      delete: "isOwner",
    },
    bind: {
      isLoggedIn: "auth.id != null",
      isOwner: "auth.id != null && auth.id == data.ref('$user.id')",
    },
  },
} satisfies InstantRules;

export default rules;
