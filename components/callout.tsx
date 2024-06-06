import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface CalloutProps {
	icon?: string
	children?: ReactNode
	type?: 'default' | 'warning' | 'danger'
}

export function Callout({
	children,
	icon,
	type = 'default',
	...props
}: CalloutProps) {
	return (
		<div
			className={cn(
				'my-6 items-start rounded-md border-2 border-l-4 p-4 w-full dark:max-w-none',
				{
					'border-red-900 border-4 bg-red-100 dark:prose': type === 'danger',
					'border-yellow-600 border-4 bg-yellow-100 dark:prose':
						type === 'warning',
				}
			)}
			{...props}
		>
			<div>
				{' '}
				{icon && <span className='mr-4 text-2xl'>{icon}</span>}
				<div>{children}</div>
			</div>
		</div>
	)
}
