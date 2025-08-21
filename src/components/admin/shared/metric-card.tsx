import { Card, CardContent } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface MetricCardProps {
  icon: LucideIcon
  value: string | number
  label: string
  iconColor?: string
  bgColor?: string
}

export function MetricCard({
  icon: Icon,
  value,
  label,
  iconColor = "text-primary",
  bgColor = "bg-primary/10",
}: MetricCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className={`flex items-center justify-center w-12 h-12 ${bgColor} rounded-lg`}>
            <Icon className={`w-6 h-6 ${iconColor}`} />
          </div>
          <div>
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-sm text-muted-foreground">{label}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
