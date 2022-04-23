import { changeValue } from "app/core/utils/functions"
import { FC, Fragment, useState } from "react"

export const ReadNotificationsWidget: FC = () => {
  const [query, setQuery] = useState<string>("")

  return (
    <Fragment>
      <div className="w100 row jcfs aic">
        <input
          className="input-md w25"
          type="text"
          placeholder="Find read notification"
          value={query}
          onChange={(e: any) => changeValue(e, setQuery)}
        />
      </div>
    </Fragment>
  )
}
