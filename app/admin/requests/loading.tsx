import { AdminLayout } from "@/components/admin/admin-layout"
import { CardSkeleton } from "@/components/ui/card-skeleton"

export default function RequestsLoading() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="h-8 w-64 bg-muted animate-pulse rounded" />
          <div className="h-4 w-96 bg-muted animate-pulse rounded" />
        </div>

        <div className="grid gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </div>
    </AdminLayout>
  )
}
