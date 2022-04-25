import { useQuery } from "blitz"
import getCurrentUser from "app/api/queries/User/getCurrentUser"

export const useCurrentUser = () => {
  const [user] = useQuery(getCurrentUser, null)
  return user
}
