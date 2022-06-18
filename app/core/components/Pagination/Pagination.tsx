import { useRouter } from "blitz"
import React, { FC } from "react"
import { Button } from "../Button/Button"
import styles from "./Pagination.module.scss"
import { PaginationProps } from "./Pagination.types"

export const Pagination: FC<PaginationProps> = (props) => {
	const { page, hasMore, isPreviousData } = props
	const router = useRouter()

	// @ts-ignore
	const goToPreviousPage = () => router.push({ query: { page: page - 1 } })

	const goToNextPage = () => {
		if (!isPreviousData && hasMore) {
			// @ts-ignore
			router.push({ query: { page: page + 1 } })
		}
	}

	const paginationButtons = [
		{
			id: 0,
			name: "Previous",
			disabled: page === 0,
			onClick() {
				goToPreviousPage()
			},
			label: "button for going to the previous page",
		},
		{
			id: 1,
			name: "Next",
			disabled: isPreviousData || !hasMore,
			onClick() {
				goToNextPage()
			},
			label: "button for going to the next page",
		},
	]

	return (
		<section className={styles.Pagination}>
			{paginationButtons.map((button) => (
				<Button
					key={button.id}
					variant="secondary"
					size="md"
					disabled={button.disabled}
					aria-label={button.label}
					onClick={() => button.onClick()}
				>
					{button.name}
				</Button>
			))}
		</section>
	)
}
