import { i } from "@instantdb/react";

const _schema = i.schema({
  entities: {
    $files: i.entity({
      path: i.string().unique().indexed(),
      url: i.string(),
    }),
    $users: i.entity({
      email: i.string().unique().indexed().optional(),
    }),
    memes: i.entity({
      createdAt: i.date(),
    }),
    upvotes: i.entity({}),
  },
  links: {
    memeImage: {
      forward: { on: "memes", has: "one", label: "image" },
      reverse: { on: "$files", has: "many", label: "memes" },
    },
    memeAuthor: {
      forward: { on: "memes", has: "one", label: "author" },
      reverse: { on: "$users", has: "many", label: "memes" },
    },
    upvoteMeme: {
      forward: { on: "upvotes", has: "one", label: "meme" },
      reverse: { on: "memes", has: "many", label: "upvotes" },
    },
    upvoteUser: {
      forward: { on: "upvotes", has: "one", label: "$user" },
      reverse: { on: "$users", has: "many", label: "upvotes" },
    },
  },
  rooms: {},
});

type _AppSchema = typeof _schema;
interface AppSchema extends _AppSchema {}
const schema: AppSchema = _schema;

export type { AppSchema };
export default schema;
