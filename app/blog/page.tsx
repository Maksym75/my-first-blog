import { posts } from '#site/content'
import { PostItem } from '@/components/post-item'
import { sortPosts } from '@/lib/utils'

export default async function BlogPage() {
	const sortedPosts = sortPosts(posts.filter(el => el.published))
	const displayPosts = sortedPosts
	return (
		<div className='container max-w-4xl py-6 lg:py-10'>
			<div className='flex flex-col gap-4 md:flex-row md:justify-between md:gap-8'>
				<div className='flex-1 space-y-4'>
					<h1 className='inline-block font-black text-4xl lg:text-5xl'>
						Blog page
					</h1>
					<p className='text-xl text-muted-foreground'>
						my crawling all over web development
					</p>
				</div>
			</div>
			<hr className='mt-8' />
			{displayPosts.length > 0 ? (
				<ul className='flex flex-col'>
					{/* {displayPosts.map(({ slug, title, description, date }) => { */}
					{displayPosts.map(post => {
						const { slug, date, title, description } = post
						return (
							<li key={slug}>
								{' '}
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
		</div>
	)
}
