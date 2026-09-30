type LoadingProps = {
  message?: string
}

export default function Loading({
  message = "Loading..."
}: LoadingProps) {
  return (
    <div className="p-6 text-muted-foreground">
      {message}
    </div>
  )
}