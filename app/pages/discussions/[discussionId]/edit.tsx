import { Suspense } from "react"
import {
  Head,
  Link,
  useRouter,
  useQuery,
  useMutation,
  useParam,
  BlitzPage,
  Routes,
} from "blitz"
import Layout from "app/core/layouts/Layout"
import getDiscussion from "app/api/queries/Discussion/getDiscussion"
import updateDiscussion from "app/discussions/mutations/updateDiscussion"
import {
  DiscussionForm,
  FORM_ERROR,
} from "app/discussions/components/DiscussionForm"

export const EditDiscussion = () => {
  const router = useRouter()
  const discussionId = useParam("discussionId", "number")
  const [discussion, { setQueryData }] = useQuery(
    getDiscussion,
    { id: discussionId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateDiscussionMutation] = useMutation(updateDiscussion)

  return (
    <>
      <Head>
        <title>Edit Discussion {discussion.id}</title>
      </Head>

      <div>
        <h1>Edit Discussion {discussion.id}</h1>
        <pre>{JSON.stringify(discussion, null, 2)}</pre>

        <DiscussionForm
          submitText="Update Discussion"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateDiscussion}
          initialValues={discussion}
          onSubmit={async (values) => {
            try {
              const updated = await updateDiscussionMutation({
                id: discussion.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(
                Routes.ShowDiscussionPage({ discussionId: updated.id })
              )
            } catch (error: any) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </div>
    </>
  )
}

const EditDiscussionPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditDiscussion />
      </Suspense>

      <p>
        <Link href={Routes.DiscussionsPage()}>
          <a>Discussions</a>
        </Link>
      </p>
    </div>
  )
}

EditDiscussionPage.authenticate = false
EditDiscussionPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditDiscussionPage
