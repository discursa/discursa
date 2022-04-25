import createDiscussion from "app/api/mutations/Discussion/createDiscussion"
import subscribeDiscussion from "app/api/mutations/Discussion/subscribeDiscussion"
import upvoteDiscussion from "app/api/mutations/Discussion/upvoteDiscussion"
import { FORM_ERROR } from "app/core/components/Form/children/DiscussionForm"
import { DiscussionType } from "app/core/types"
import {
  addObjectToDb,
  getId,
  removeElementFromArray,
  updateDbObject,
} from "app/core/utils/functions"
import { BlitzRouter, ClientSession, Routes } from "blitz"
import {
  DiscussionServiceType,
  UpvotedValuesType,
  ValuesType,
} from "./Discussion.types"

export class DiscussionService implements DiscussionServiceType {
  async create(
    values: ValuesType,
    discussions: DiscussionType[],
    session: ClientSession,
    router: BlitzRouter
  ) {
    const discussion = {
      id_: getId(discussions),
      name: values.name,
      message: values.message,
      upvotes: 0,
      authorId: session.userId,
    }

    const route = Routes.ShowDiscussionPage({
      discussionId: discussion.id_,
    })

    try {
      addObjectToDb(createDiscussion, discussion, router, route)
    } catch (error: any) {
      console.log(error)
      return {
        [FORM_ERROR]: error.toString(),
      }
    }
  }

  async update() {}
  async delete() {}

  async upvote(
    discussion: DiscussionType,
    userId: string,
    setQueryData: Function
  ) {
    const updatedVouters = [...discussion.vouters, userId]
    const upvotedDiscussion: UpvotedValuesType = {
      upvotes: discussion.upvotes + 1,
      vouters: updatedVouters,
    }

    try {
      updateDbObject(
        upvoteDiscussion,
        discussion.id_,
        upvotedDiscussion,
        setQueryData
      )
    } catch (error: any) {
      console.log(error)
      throw new Error(error)
    }
  }

  async unvote(
    discussion: DiscussionType,
    userId: string,
    setQueryData: Function
  ) {
    const updatedVouters = removeElementFromArray(discussion.vouters, userId)
    const unvotedDiscussion: UpvotedValuesType = {
      upvotes: discussion.upvotes - 1,
      vouters: updatedVouters,
    }

    try {
      updateDbObject(
        upvoteDiscussion,
        discussion.id_,
        unvotedDiscussion,
        setQueryData
      )
    } catch (error: any) {
      console.log(error)
      throw new Error(error)
    }
  }

  async subscribe(
    discussion: DiscussionType,
    userId: string,
    setQueryData: Function
  ) {
    const updatedSubscribers = [...discussion.subscribers, userId]
    const subscribedDiscussion = {
      subscribers: updatedSubscribers,
    }

    try {
      updateDbObject(
        subscribeDiscussion,
        discussion.id_,
        subscribedDiscussion,
        setQueryData
      )
    } catch (error: any) {
      console.log(error)
      throw new Error(error)
    }
  }

  async unsubscribe(
    discussion: DiscussionType,
    userId: string,
    setQueryData: Function
  ) {
    const updatedSubscribers = removeElementFromArray(
      discussion.subscribers,
      userId
    )
    const unsubscribedDiscussion = {
      subscribers: updatedSubscribers,
    }

    try {
      updateDbObject(
        subscribeDiscussion,
        discussion.id_,
        unsubscribedDiscussion,
        setQueryData
      )
    } catch (error: any) {
      console.log(error)
      throw new Error(error)
    }
  }
}
