import { Button, ButtonGroup } from "app/core/components"
import { changeValue } from "app/core/utils/functions"
import { FC, Fragment, useState } from "react"

export const InboxWidget: FC = () => {
  const [query, setQuery] = useState("")

  const groupedButtons = [
    {
      id: 0,
      name: "All",
    },
    {
      id: 1,
      name: "Unread",
    },
  ]

  return (
    <Fragment>
      <div className="row w100 jcfa aic g2">
        <ButtonGroup
          variant="secondary"
          size="md"
          buttons={groupedButtons}
          dropdown={false}
          nestingLevel=""
        />
        <input
          className="input-md w25"
          type="text"
          placeholder="Find notification"
          value={query}
          onChange={(event: any) => changeValue(event, setQuery)}
        />
        <Button variant="primary" size="md">
          Read all
        </Button>
      </div>
    </Fragment>
  )
}
