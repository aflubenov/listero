import '@/app/scss/bootstrap.scss'
import '@/app/overrides.scss'

export const DefaultLayout = ({
    children,
  }: {
    children: React.ReactNode
  }) => {
    return <>
    {children}</>
}