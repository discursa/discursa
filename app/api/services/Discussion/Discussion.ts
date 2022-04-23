import createDiscussion from "app/api/mutations/Discussion/createDiscussion"
import { FORM_ERROR } from "app/core/components/Form/children/DiscussionForm"
import { DiscussionType } from "app/core/types"
import { addObjectToDb, getId } from "app/core/utils/functions"
import { BlitzRouter, ClientSession, Routes } from "blitz"
import { DefaultServiceType } from "../types"

interface ValuesType {
  name: string
  message: string
}

export class DiscussionService implements DefaultServiceType {
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
}
