"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getUnassignedParcels, getAvailableAgents, assignParcelToAgent, type Parcel } from "@/lib/parcel-data"
import type { User } from "@/lib/admin-data"
import { Package, UserCheck, Truck } from "lucide-react"
import { ParcelCard } from "@/components/ui/parcel-card"
import { LoadingState } from "./shared/loading-state"
import { AlertManager } from "./shared/alert-manager"
import { useAdminState } from "@/hooks/use-admin-state"

export function ParcelAssignment() {
  const [unassignedParcels, setUnassignedParcels] = useState<Parcel[]>([])
  const [availableAgents, setAvailableAgents] = useState<User[]>([])
  const [assigning, setAssigning] = useState<string | null>(null)
  const [selectedAgents, setSelectedAgents] = useState<{ [parcelId: string]: string }>({})

  const { loading, setLoading, error, success, showError, showSuccess, clearMessages } = useAdminState()

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [parcels, agents] = await Promise.all([getUnassignedParcels(), getAvailableAgents()])
      setUnassignedParcels(parcels)
      setAvailableAgents(agents)
    } catch (error) {
      console.error("Failed to load data:", error)
      showError("Failed to load assignment data")
    } finally {
      setLoading(false)
    }
  }

  const handleAssignParcel = async (parcelId: string) => {
    const agentId = selectedAgents[parcelId]
    if (!agentId) return

    const agent = availableAgents.find((a) => a.id === agentId)
    if (!agent) return

    setAssigning(parcelId)
    clearMessages()

    try {
      await assignParcelToAgent(parcelId, agentId, agent.name)
      setUnassignedParcels((prev) => prev.filter((p) => p.id !== parcelId))
      setSelectedAgents((prev) => {
        const updated = { ...prev }
        delete updated[parcelId]
        return updated
      })
      showSuccess(`Parcel assigned to ${agent.name} successfully`)
    } catch (err) {
      showError(err instanceof Error ? err.message : "Failed to assign parcel")
    } finally {
      setAssigning(null)
    }
  }

  if (loading) {
    return <LoadingState />
  }

  return (
    <div className="space-y-4">
      <AlertManager error={error} success={success} />

      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <UserCheck className="w-5 h-5" />
          <h2 className="text-xl font-semibold">Parcel Assignment ({unassignedParcels.length})</h2>
        </div>

        {unassignedParcels.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12 text-muted-foreground">
              <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium mb-2">No unassigned parcels</p>
              <p className="text-sm">All parcels have been assigned to delivery agents</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {unassignedParcels.map((parcel) => (
              <div key={parcel.id} className="space-y-4">
                <ParcelCard parcel={parcel} variant="admin" showActions={false} />

                {/* Assignment Controls */}
                <div className="flex items-center gap-2 p-4 bg-muted/30 rounded-lg border-l-4 border-l-yellow-500">
                  <span className="text-sm font-medium">Assign to:</span>
                  <Select
                    value={selectedAgents[parcel.id] || ""}
                    onValueChange={(agentId) => setSelectedAgents((prev) => ({ ...prev, [parcel.id]: agentId }))}
                  >
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Select agent" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableAgents.map((agent) => (
                        <SelectItem key={agent.id} value={agent.id}>
                          <div className="flex items-center gap-2">
                            <Truck className="w-4 h-4" />
                            {agent.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    onClick={() => handleAssignParcel(parcel.id)}
                    disabled={!selectedAgents[parcel.id] || assigning === parcel.id}
                    loading={assigning === parcel.id}
                  >
                    {assigning === parcel.id ? "Assigning..." : "Assign"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
