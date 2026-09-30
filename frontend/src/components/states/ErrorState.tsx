type ErrorStateProps = {
  message: string
}

export default function ErrorState({
  message
}: ErrorStateProps) {
  return (
    <div className="p-6 text-destructive">
      {message}
    </div>
  )
}