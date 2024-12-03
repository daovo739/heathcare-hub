export function Heading({
  title,
  subTitle,
}: {
  title: string
  subTitle: string
}) {
  return (
    <div className="flex flex-col mb-8">
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      <span className="text-gray-600 text-sm">{subTitle}</span>
    </div>
  )
}
