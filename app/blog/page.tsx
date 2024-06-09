import { posts } from '#site/content'
import { PostItem } from '@/components/post-item'
import { QueryPagination } from '@/components/query-pagination'
import { sortPosts } from '@/lib/utils'
import { Metadata } from 'next'

const POST_PER_PAGE = 3

interface IBlogPageProps {
	searchParams: {
		page?: string
	}
}

export const metadata : Metadata ={
	title:"My blog",
	description:"Blog description",
}
 
export default async function BlogPage({ searchParams }: IBlogPageProps) {
	const sortedPosts = sortPosts(posts.filter(el => el.published))

	const currentPage = Number(searchParams?.page) || 1
	const totalPages = Math.ceil(sortedPosts.length / POST_PER_PAGE)

	//? was before pagination
	// const displayPosts = sortedPosts

	// ? logic to strip down the display posts
	const displayPosts = sortedPosts.slice(
		POST_PER_PAGE * (currentPage - 1),
		POST_PER_PAGE * currentPage
	)

	return (
		<div className='container max-w-4xl py-6 lg:py-10'>
			<div className='flex flex-col gap-4 md:flex-row md:justify-between md:gap-8'>
				<div className='flex-1 space-y-4'>
					<h1 className='inline-block font-black text-4xl lg:text-5xl'>
						Blog page
					</h1>
					<p className='text-xl text-muted-foreground'>
						My crawling all over web development
					</p>
				</div>
			</div>
			<hr className='mt-8' />
			{displayPosts.length > 0 ? (
				<ul className='flex flex-col'>
					{displayPosts.map(post => {
						const { slug, date, title, description } = post
						return (
							<li key={slug}>
								<PostItem
									slug={slug}
									title={title}
									description={description}
									date={date}
								></PostItem>
							</li>
						)
					})}
				</ul>
			) : (
				<p>Nothing to see yet</p>
			)}
			<QueryPagination totalPages={totalPages} className='justify-end sm:justify-center  mt-5  '/>
		</div>
	)
}
