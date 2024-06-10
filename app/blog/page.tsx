import { posts } from '#site/content'
import { PostItem } from '@/components/post-item'
import { QueryPagination } from '@/components/query-pagination'
import { getAllTags, sortPosts, sortTagsByCount } from '@/lib/utils'
import { Metadata } from 'next'
import { Tag } from "@/components/tag";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface IBlogPageProps {
	searchParams: {
		page?: string
	}
}

export const metadata: Metadata = {
	title: 'My blog',
	description: 'Blog description',
}
const POST_PER_PAGE = 3

export default async function BlogPage({ searchParams }: IBlogPageProps) {
	const currentPage = Number(searchParams?.page) || 1
	const sortedPosts = sortPosts(posts.filter(el => el.published))
	const totalPages = Math.ceil(sortedPosts.length / POST_PER_PAGE)

	// ? logic to strip down the display posts
	const displayPosts = sortedPosts.slice(
		POST_PER_PAGE * (currentPage - 1),
		POST_PER_PAGE * currentPage
	)
	const tags = getAllTags(posts);
	const sortedTags = sortTagsByCount(tags);
	return (
		<div className='container max-w-4xl py-6 lg:py-10'>
			<div className='flex flex-col gap-4 md:flex-row md:justify-between md:gap-8'>
				<div className='flex-1 space-y-4'>
					<h1 className='inline-block font-black text-4xl lg:text-5xl'>Blog</h1>
					<p className='text-xl text-muted-foreground'>
						My crawling all over web development
					</p>
				</div>
			</div>

			<div className='grid grid-cols-12 gap-3 mt-8'>
				<div className='col-span-12 col-start-1 sm:col-span-8'>
					<hr />
					{displayPosts?.length > 0 ? (
						<ul className='flex flex-col'>
							{displayPosts.map(post => {
								const { slug, date, title, description, tags } = post
								return (
									<li key={slug}>
										<PostItem
											slug={slug}
											date={date}
											title={title}
											description={description}
											tags={tags}
										/>
									</li>
								)
							})}
						</ul>
					) : (
						<p>Nothing to see here yet</p>
					)}
					<QueryPagination
						totalPages={totalPages}
						className='justify-end sm:justify-center  mt-5 '
					/>
				</div>
				<Card className='col-span-12 row-start-3 h-fit sm:col-span-4 sm:col-start-9 sm:row-start-1'>
					<CardHeader>
						<CardTitle>Tags</CardTitle>
					</CardHeader>
					<CardContent className='flex flex-wrap gap-2'>
						{sortedTags?.map(tag => (
							<Tag tag={tag} key={tag} count={tags[tag]} />
						))}
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
