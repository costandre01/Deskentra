type EmptyStateProps = {
  message: string
}

export default function EmptyState({
  message
}: EmptyStateProps) {
  return (
    <div className="p-6 text-muted-foreground">
      {message}
    </div>
  )
}