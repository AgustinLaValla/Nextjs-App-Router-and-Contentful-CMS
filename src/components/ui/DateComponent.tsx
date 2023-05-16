import { formatDate } from "@/utils"

export const DateComponent = ({ dateString, options, ...rest }: any) => {
  return (
    <time dateTime={dateString} {...rest}>
      {formatDate(dateString, options)}
    </time>
  )
}