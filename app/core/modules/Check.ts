import { ClientSession } from "blitz"
import { DiscussionType } from "../types"

export const check = {
  upvote(discussion: DiscussionType, session: ClientSession) {
    return discussion.vouters.some((vouter) => vouter === session.userId)
  },
  subscribe(discussion: DiscussionType, session: ClientSession) {
    return discussion.subscribers.some(
      (subscriber) => subscriber === session.userId
    )
  },
  author(session: ClientSession, authorId: string){
    return Boolean(session.userId === authorId)
  },
  admin(session: ClientSession){
    return Boolean(session.role === "ADMIN")
  }
}
