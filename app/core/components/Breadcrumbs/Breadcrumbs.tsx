import { Link } from "blitz"
import React, { FC, Fragment } from "react"
import styles from "./Breadcrumbs.module.scss"
import { BreadcrumbsProps } from "./Breadcrumbs.types"

export const Breadcrumbs: FC<BreadcrumbsProps> = (props) => {
  const { items, separator } = props
  const active = items[items.length - 1]

  return (
    <div className={styles.Breadcrumbs}>
      {items.map((item) => (
        <Fragment key={item.id}>
          <Link href={item.route}>
            <a
              className={
                active.name === item.name
                  ? `${styles.BreadcrumbsActiveItem} sub-text`
                  : `sub-text`
              }
            >
              {item.name}
            </a>
          </Link>
          <p className={styles.Separator}>{separator}</p>
        </Fragment>
      ))}
    </div>
  )
}

Breadcrumbs.defaultProps = {
  separator: ">",
}
