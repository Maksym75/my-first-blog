'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationNext,
	PaginationPrevious,
	PaginationLink,
	PaginationEllipsis
} from './ui/pagination'

interface IQueryPaginationProps {
	totalPages: number
	className?: string
}



export function QueryPagination({
	totalPages,
	className,
}: IQueryPaginationProps) {
	const pathName = usePathname()
	const searchParams = useSearchParams()
	const currentPage = Number(searchParams.get('page')) || 1

	const prevPage = currentPage - 1
	const nextPage = currentPage + 1

	const createPageUrl = (pageNumber: number | string) => {
		const params = new URLSearchParams(searchParams)
		params.set('page', pageNumber.toString())
		return `${pathName}?${params.toString()}`
	}

	const renderPageNumbers = () => {
		const pages = []

		// Always show the first page
		pages.push(
			<PaginationItem key={`page-button-first-${currentPage}`} className='hidden sm:inline-block'>
				<PaginationLink isActive={currentPage === 1} href={createPageUrl(1)}>
					1
				</PaginationLink>
			</PaginationItem>
		)

		// Show ellipsis if necessary
		if (currentPage > 3) {
			pages.push(
				<PaginationItem className='hidden sm:inline-block' key={`ellipsis-start-${currentPage}`}>
					<PaginationEllipsis/>
				</PaginationItem>
			)
		}

		// Show the page before the current page
		if (currentPage > 2) {
			pages.push(
				<PaginationItem className='hidden sm:inline-block' key={`page-button-${currentPage - 1}`}>
					<PaginationLink href={createPageUrl(currentPage - 1)}>
						{currentPage - 1}
					</PaginationLink>
				</PaginationItem>
			)
		}

		// Show the current page
		if (currentPage !== 1 && currentPage !== totalPages) {
			pages.push(
				<PaginationItem  key={`page-button-${currentPage}`}>
					<PaginationLink isActive={true} href={createPageUrl(currentPage)}>
						{currentPage}
					</PaginationLink>
				</PaginationItem>
			)
		}

		// Show the page after the current page
		if (currentPage < totalPages - 1) {
			pages.push(
				<PaginationItem className='hidden sm:inline-block' key={`page-button-${currentPage + 1}`}>
					<PaginationLink href={createPageUrl(currentPage + 1)}>
						{currentPage + 1}
					</PaginationLink>
				</PaginationItem>
			)
		}

		// Show ellipsis if necessary
		if (currentPage < totalPages - 2) {
			pages.push(
				<PaginationItem className='hidden sm:inline-block' key={`ellipsis-end-${currentPage}`}>
					<PaginationEllipsis/>
				</PaginationItem>
			)
		}

		// Always show the last page
		if (totalPages > 1) {
			pages.push(
				<PaginationItem className='hidden sm:inline-block' key={`page-button-${totalPages}` }>
					<PaginationLink  isActive={currentPage === totalPages} href={createPageUrl(totalPages)} >
						{totalPages}
					</PaginationLink>
				</PaginationItem>
			)
		}

		return pages
	}

	return (
		<Pagination className={className}>
			<PaginationContent>
				{prevPage >= 1 ? (
					<PaginationItem>
						<PaginationPrevious href={createPageUrl(prevPage)} />
					</PaginationItem>
				) : null}
				{renderPageNumbers()}
				{nextPage <= totalPages ? (
					<PaginationItem>
						<PaginationNext href={createPageUrl(nextPage)} />
					</PaginationItem>
				) : null}
			</PaginationContent>
		</Pagination>
	)
}
