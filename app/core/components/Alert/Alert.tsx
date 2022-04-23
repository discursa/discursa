import React, { FC } from "react"
import { icons } from "../../utils/icons"
import { Icon } from "../Icon/Icon"
import { IconButton } from "../IconButton/IconButton"
import { Button } from "../index"
import { AlertProps } from "./Alert.types"

export const Alert: FC<AlertProps> = (props) => {
  const {
    variant,
    message,
    action,
    toast,
    actionMessage,
    remove,
    nestingLevel,
    styles,
    iconHref,
  } = props
  const className =
    styles !== undefined ? `${variant}-alert ${styles}` : `${variant}-alert`

  return (
    <dialog className={className} role="alert">
      <div className="flex justify-start items-center gap-4">
        <Icon href={iconHref} size="md" nestingLevel={nestingLevel} />
        <p className="alert-message">{message}</p>
      </div>
      <div className="flex justify-end items center gap-4">
        {action !== undefined && (
          <Button
            variant="secondary"
            size="md"
            styles="bg-800"
            onClick={() => action()}
          >
            {actionMessage}
          </Button>
        )}
        {!toast && (
          <IconButton
            variant="tertiary"
            size="sm"
            href={icons.close}
            nestinglevel={nestingLevel}
            onClick={() => remove()}
            styles="text-slate-400"
          />
        )}
      </div>
    </dialog>
  )
}
