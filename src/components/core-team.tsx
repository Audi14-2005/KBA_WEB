"use client"

import { useState, useEffect } from "react"
import coreTeamData from "../data/core-team.json"
import { Card, CardContent } from "../components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import {
  Users,
  Linkedin,
  UserCheck,
  Settings,
  Code,
  FileText,
  DollarSign,
  Heart,
  Handshake,
  Palette,
  Calendar,
  Megaphone,
  Laptop,
  Link,
  Search,
  Camera,
} from "lucide-react"

interface TeamMember {
  name: string
  role: string
  linkedin?: string
  photo?: string
}

interface Team {
  name: string
  members: TeamMember[]
}

const getTeamIcon = (teamName: string) => {
  const iconMap: { [key: string]: any } = {
    Ambassador: UserCheck,
    Operations: Settings,
    "Technology Executives": Code,
    Secretary: FileText,
    Treasurer: DollarSign,
    Empowerment: Heart,
    "Community Partners": Handshake,
    Design: Palette,
    Events: Calendar,
    "PR & Media": Megaphone,
    Technology: Laptop,
    Blockchain: Link,
    Research: Search,
    Media: Camera,
  }
  return iconMap[teamName] || Users
}

export function CoreTeam() {
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null)
  const [teams, setTeams] = useState<Team[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const teamColors = [
    "bg-red-100 border-red-200 hover:border-red-400",
    "bg-blue-100 border-blue-200 hover:border-blue-400",
    "bg-green-100 border-green-200 hover:border-green-400",
    "bg-yellow-100 border-yellow-200 hover:border-yellow-400",
    "bg-purple-100 border-purple-200 hover:border-purple-400",
    "bg-pink-100 border-pink-200 hover:border-pink-400",
    "bg-indigo-100 border-indigo-200 hover:border-indigo-400",
    "bg-teal-100 border-teal-200 hover:border-teal-400",
    "bg-orange-100 border-orange-200 hover:border-orange-400",
    "bg-cyan-100 border-cyan-200 hover:border-cyan-400",
    "bg-lime-100 border-lime-200 hover:border-lime-400",
    "bg-emerald-100 border-emerald-200 hover:border-emerald-400",
    "bg-violet-100 border-violet-200 hover:border-violet-400",
    "bg-rose-100 border-rose-200 hover:border-rose-400",
  ]

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        setLoading(true)
        
        // Try to fetch from API
        try {
          // Replace with your actual API endpoint
          const response = await fetch('https://api.example.com/core-team')
          
          // Check if the response is ok (status in the range 200-299)
          if (response.ok) {
            const data = await response.json()
            setTeams(data.teams || [])
            setLoading(false)
            return
          }
        } catch (apiError) {
          console.log('API fetch failed, falling back to local data', apiError)
          // If API fetch fails, we'll fall back to local data
        }
        
        // Fallback to local JSON data
        setTeams((coreTeamData as { teams: Team[] }).teams)
        setLoading(false)
      } catch (err) {
        console.error('Error loading team data:', err)
        setError('Failed to load team data. Please try again later.')
        setLoading(false)
      }
    }

    fetchTeamData()
  }, [])

  return (
    <section id="team" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-blue-900 mb-6 text-balance">Core Team</h2>
          <p className="text-xl md:text-2xl text-blue-700 text-pretty max-w-4xl mx-auto">
            Click on any team category to explore our dedicated members and their roles
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
            <span className="ml-4 text-xl text-blue-700">Loading team data...</span>
          </div>
        ) : error ? (
          <div className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-red-100">
            <h3 className="text-2xl font-bold text-red-700 mb-4">{error}</h3>
            <p className="text-lg text-red-600">Please try refreshing the page.</p>
          </div>
        ) : teams.length === 0 ? (
          <div className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-blue-100">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">No team data available</h3>
            <p className="text-lg text-blue-700">Please check back later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-center">
            {teams.map((team, index) => {
              const IconComponent = getTeamIcon(team.name)
              return (
                <Card
                  key={index}
                  className={`cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 backdrop-blur-sm ${teamColors[index % teamColors.length]} h-full`}
                  onClick={() => setSelectedTeam(team)}
                >
                  <CardContent className="p-8 text-center h-full flex flex-col justify-between min-h-[280px]">
                    <div className="flex flex-col items-center flex-grow justify-center">
                      <div className="w-24 h-24 bg-white/60 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <IconComponent className="h-12 w-12 text-gray-700" />
                      </div>
                      <h3 className="font-bold text-gray-900 mb-4 text-xl leading-tight text-balance">{team.name}</h3>
                      <Badge
                        variant="secondary"
                        className="text-base bg-white/80 text-gray-700 hover:bg-white/90 px-4 py-2"
                      >
                        {team.members.length} member{team.members.length !== 1 ? "s" : ""}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}

        {/* Team Members Modal */}
        <Dialog open={!!selectedTeam} onOpenChange={() => setSelectedTeam(null)}>
          <DialogContent className="max-w-7xl w-[95vw] max-h-[95vh] overflow-y-auto p-6 md:p-12">
            <DialogHeader className="mb-12">
              <DialogTitle className="text-3xl md:text-4xl font-bold text-blue-800 text-center">
                {selectedTeam?.name} Team
              </DialogTitle>
            </DialogHeader>

            <div className="w-full grid gap-8 justify-items-center grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
              {selectedTeam?.members.map((member, idx) => (
                <Card key={idx} className="border-blue-200 hover:shadow-lg transition-all duration-300 w-full max-w-sm">
                  <CardContent className="p-6 text-center flex flex-col justify-between h-full">
                    <div className="flex flex-col items-center">
                      <Avatar className="w-28 h-28 mx-auto mb-4 ring-4 ring-blue-100 rounded-full overflow-hidden">
                        <AvatarImage
                          src={member.photo || "/placeholder.svg"}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                        <AvatarFallback className="bg-blue-600 text-white text-xl">
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <h4 className="font-semibold text-blue-900 text-lg mb-1 text-balance leading-tight">
                        {member.name}
                      </h4>
                      <p className="text-blue-600 text-base mb-4">{member.role}</p>
                    </div>

                    <Button
                      variant="outline"
                      size="lg"
                      className="border-blue-300 text-blue-600 hover:bg-blue-50 bg-transparent px-6 py-2 w-full"
                      onClick={() => window.open((member.linkedin || "#") as string, "_blank")}
                      title="Open LinkedIn profile"
                    >
                      <Linkedin className="w-5 h-5 mr-2" />
                      LinkedIn
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}
