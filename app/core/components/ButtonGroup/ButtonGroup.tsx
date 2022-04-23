import React, { FC, useState } from "react"
import { icons } from "app/core/utils/icons"
import { Button, IconButton } from "app/core/components"
import { ButtonGroupProps } from "./ButtonGroup.types"
import styles from "./ButtonGroup.module.scss"

export const ButtonGroup: FC<ButtonGroupProps> = (props) => {
  const { buttons, variant, size, dropdown, nestingLevel } = props
  const [active, setActive] = useState<number>(0)

  const toggleActive = (button: any) => {
    const { id, onClick } = button

    setActive(id)
    if (onClick !== undefined) {
      onClick()
    }
  }

  if (variant === "primary" && dropdown && buttons.length > 1) {
    throw new Error(
      "Primary button group shound't have more than 2 buttons include dropdown"
    )
  }

  return (
    <div className={styles.ButtonGroup}>
      {buttons.map((button) => (
        <Button
          key={button.id}
          variant={variant}
          size={size}
          onClick={() => toggleActive(button)}
          styles={
            active === button.id
              ? styles.ActiveButtonInGroup
              : styles.ButtonInGroup
          }
          leadingIcon={button.leadingIcon}
        >
          {button.name}
        </Button>
      ))}
      {dropdown && (
        <IconButton
          size={size}
          variant={variant}
          href={icons.triangleDown}
          nestingLevel={nestingLevel}
          styles="rounded-r-lg"
        />
      )}
    </div>
  )
}
