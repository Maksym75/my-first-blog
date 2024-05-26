import Image from 'next/image'
import * as runtime from 'react/jsx-runtime'
import { Callout } from './callout'
import { cn } from '@/lib/utils'

const useMDXComponent = (code: string) => {
	const fn = new Function(code)
	return fn({ ...runtime }).default
}

interface HeadingProps extends React.HTMLAttributes<HTMLElement> {
	className?: string
}

const components = {
	Image,
	Callout,
	h1: ({ className, ...props }: HeadingProps) => (
		<h1
			className={cn(
				'mt-2 scroll-m-20 text-4xl font-bold tracking-tight',
				className
			)}
			{...props}
		/>
	),
	h2: ({ className, ...props }: HeadingProps) => (
		<h2
			className={cn(
				'mt-10 scroll-m-20 border-b pb-1 text-3xl font-semibold tracking-tight first:mt-0',
				className
			)}
			{...props}
		/>
	),
	h3: ({ className, ...props }: HeadingProps) => (
		<h3
			className={cn(
				'mt-8 scroll-m-20 text-2xl font-semibold tracking-tight',
				className
			)}
			{...props}
		/>
	),
	h4: ({ className, ...props }: HeadingProps) => (
		<h4
			className={cn(
				'mt-8 scroll-m-20 text-xl font-semibold tracking-tight',
				className
			)}
			{...props}
		/>
	),
}

interface MdxProps {
	code: string
}

export function MDXContent({ code }: MdxProps) {
	const Component = useMDXComponent(code)
	return <Component components={components} />
}
