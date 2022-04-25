import { DefaultServiceType } from "../types"

export interface DiscussionServiceType extends DefaultServiceType {
  upvote: Function
  unvote: Function
  subscribe: Function
  unsubscribe: Function
}

export interface ValuesType {
  name: string
  message: string
}

export interface UpvotedValuesType {
  upvotes: number
  vouters: string[]
}
