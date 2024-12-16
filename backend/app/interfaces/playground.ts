import z from "zod";
import "zod-openapi/extend";

export default {
  Patch: {
    Param: z.object({
      id: z.string(),
    }),
    Body: z.object({
      name: z.string().optional(),
    }),
    Response: z.object({
      id: z.number(),
      name: z.string(),
    }),
  },

  Delete: {
    Param: z.object({
      id: z.string(),
    }),
  },

  List: {
    Response: z.object({
      id: z.number(),
      name: z.string(),
      actions: z.array(z.number()),
      reactions: z.array(z.number()),
    }),
  },

  Get: {
    Param: z.object({
      id: z.string(),
    }),
    Response: z.object({
      id: z.number(),
      name: z.string(),
      actions: z.array(z.object({})),
      reactions: z.array(z.object({})),
      linksActions: z.array(z.object({})),
      linksReactions: z.array(z.object({})),
    }),
  },

  AddAction: {
    Param: z.object({
      playgroundId: z.string(),
      actionId: z.string(),
    }),
    Body: z.object({
      x: z.number(),
      y: z.number(),
    }),
  },

  PatchAction: {
    Param: z.object({
      playgroundId: z.string().optional(),
      actionPlaygroundId: z.string().optional(),
    }),
    Body: z.object({
      x: z.number(),
      y: z.number(),
    }),
  },

  deleteAction: {
    Param: z.object({
      playgroundId: z.string(),
      actionPlaygroundId: z.string(),
    }),
  },

  AddReaction: {
    Param: z.object({
      playgroundId: z.string(),
      reactionId: z.string(),
    }),
    Body: z.object({
      settings: z.record(z.any()),
      x: z.number(),
      y: z.number(),
    }),
  },

  PatchReaction: {
    Param: z.object({
      playgroundId: z.string().optional(),
      reactionPlaygroundId: z.string().optional(),
    }),
    Body: z.object({
      settings: z.record(z.any()),
      x: z.number(),
      y: z.number(),
    }),
  },

  DeleteReaction: {
    Param: z.object({
      playgroundId: z.string(),
      reactionPlaygroundId: z.string(),
    }),
  },

  LinkAction: {
    Param: z.object({
      triggerId: z.string(),
      reactionPlaygroundId: z.string(),
    }),
  },

  DeleteLinkAction: {
    Param: z.object({
      linkId: z.string(),
    }),
  },

  LinkReaction: {
    Param: z.object({
      triggerId: z.string(),
      reactionPlaygroundId: z.string(),
    }),
  },

  DeleteLinkReaction: {
    Param: z.object({
      linkId: z.string(),
    }),
  },
};
