"use client"

import { Card, CardContent } from "../components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Button } from "../components/ui/button"
import { Linkedin } from "lucide-react"
import { PageTransition } from "../components/ui/page-transition"

export function Leadership() {
  const leadership = [
    {
      name: "Dr. S.N. Murugesan",
      role: "Principal of Rajalakshmi Engineering College",
      description: "Leading REC with vision and innovation in engineering education",
      category: "Leadership",
      photo: "/images/faculty/principal-sir.jpg",
      linkedin: "https://www.linkedin.com/in/murugesan-sn-b765a8162/",
    },
    {
      name: "Dr. Malathy",
      role: "Professor & Head of the Department, CSE",
      description: "Driving excellence in Computer Science and Engineering",
      category: "Leadership",
      photo: "/images/faculty/malathy-cse.png",
      linkedin: "https://www.linkedin.com/in/malathy-em-09b0b923/",
    },
  ]

  const advisory = [
    {
      name: "Dr. Murali Bhaskar",
      role: "Professor & Dean (Academics), KBA REC-Advisory Chair",
      category: "Advisory Board",
      photo: "/images/faculty/murali-bhaskaran.png",
      linkedin: "https://www.linkedin.com/in/murali-bhaskaran-venugopal-6b95832b/",
    }
  ]

  const executive = [
    {
      name: "Dr. Muneeshwari R",
      role: "Professor & AHOD-CSE, Executive Member",
      initials: "MR",
      photo: "/images/faculty/muneeswari-mam.jpg",
      linkedin: "https://www.linkedin.com/in/dr-muneeshwari-p-84aba561/",
    },
    {
      name: "Dr. Manoranjini J",
      role: "Associate Professor & Deputy HOD/CSE, Executive Member",
      initials: "MJ",
      photo: "/images/faculty/manoranji-mam.jpg",
      linkedin: "https://www.linkedin.com/in/dr-manoranjini-j-14b0482b4/",
    },
    {
      name: "Mr. Bhuvaneswaran B",
      role: "Assistant Professor (SG), Executive Member",
      initials: "BB",
      photo: "/images/faculty/bhuvaneswaran-sir.png",
      linkedin: "https://www.linkedin.com/in/bhuvaneswaranrec/",
    },
    {
      name: "Ms. Santhiya M",
      role: "Assistant Professor, Executive Member",
      initials: "SM",
      photo: "/images/faculty/santhiya-mam.png",
      linkedin: "https://www.linkedin.com/in/santhiya-munusamy-4b938379/",
    },
  ]

  return (
    <section id="leadership" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <PageTransition className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-blue-900 mb-6 text-balance">Team & Leadership</h2>
          <p className="text-xl md:text-2xl text-blue-700 text-pretty max-w-4xl mx-auto">
            Meet the visionary leaders guiding KBA Club @ REC towards excellence in blockchain education and innovation.
          </p>
        </PageTransition>

        {/* Principal Leadership */}
        <PageTransition className="mb-16">
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-12 text-blue-800">Leadership</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {leadership.map((leader, index) => (
              <Card
                key={index}
                className="text-center bg-white/80 backdrop-blur-sm border-blue-200 hover:border-blue-400 transition-all duration-300 hover:shadow-xl"
              >
                <CardContent className="p-8">
                  <Avatar className="w-32 h-32 mx-auto mb-6 ring-4 ring-blue-100">
                    <AvatarImage src={leader.photo || "/placeholder.svg"} alt={leader.name} className="object-cover" />
                    <AvatarFallback className="bg-blue-600 text-white text-2xl">
                      {leader.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <h4 className="text-2xl font-bold text-blue-900 mb-3">{leader.name}</h4>
                  <p className="text-blue-700 font-medium mb-3 text-lg">{leader.role}</p>
                  <p className="text-blue-600 mb-6 text-base">{leader.description}</p>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-blue-300 text-blue-600 hover:bg-blue-50 bg-transparent"
                    onClick={() => window.open(leader.linkedin, "_blank")}
                  >
                    <Linkedin className="w-5 h-5 mr-2" />
                    LinkedIn
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </PageTransition>

        {/* Advisory Board */}
        <PageTransition className="mb-16">
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-8 text-indigo-800">Advisory Board</h3>
          <p className="text-center text-indigo-700 mb-12 text-lg max-w-3xl mx-auto">
            Distinguished faculty members providing strategic guidance and academic oversight for KBA Club @ REC
            initiatives.
          </p>
          <div className="grid grid-cols-1 gap-8 max-w-4xl mx-auto place-items-center">
            {advisory.map((advisor, index) => (
              <Card
                key={index}
                className="text-center bg-white/80 backdrop-blur-sm border-indigo-200 hover:border-indigo-400 transition-all duration-300 hover:shadow-xl"
              >
                <CardContent className="p-8">
                  <Avatar className="w-28 h-28 mx-auto mb-6 ring-4 ring-indigo-100">
                    <AvatarImage
                      src={advisor.photo || "/placeholder.svg"}
                      alt={advisor.name}
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-indigo-600 text-white text-xl">
                      {advisor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <h4 className="text-xl font-bold text-indigo-900 mb-3">{advisor.name}</h4>
                  <p className="text-indigo-700 font-medium mb-6 text-base">{advisor.role}</p>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-indigo-300 text-indigo-600 hover:bg-indigo-50 bg-transparent"
                    onClick={() => window.open(advisor.linkedin, "_blank")}
                  >
                    <Linkedin className="w-5 h-5 mr-2" />
                    LinkedIn
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </PageTransition>

        {/* Executive Board */}
        <PageTransition>
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-8 text-cyan-800">Executive Board</h3>
          <p className="text-center text-cyan-700 mb-12 text-lg max-w-3xl mx-auto">
            Faculty executives responsible for program implementation, student mentorship, and operational excellence.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {executive.map((exec, index) => (
              <Card
                key={index}
                className="text-center bg-white/80 backdrop-blur-sm border-cyan-200 hover:border-cyan-400 transition-all duration-300 hover:shadow-lg"
              >
                <CardContent className="p-6">
                  <Avatar className="w-20 h-20 mx-auto mb-4 ring-2 ring-cyan-100">
                    <AvatarImage src={exec.photo || "/placeholder.svg"} alt={exec.name} className="object-cover" />
                    <AvatarFallback className="bg-cyan-600 text-white text-base">{exec.initials}</AvatarFallback>
                  </Avatar>
                  <h4 className="font-bold text-cyan-900 mb-2 text-base">{exec.name}</h4>
                  <p className="text-cyan-700 text-sm mb-4">{exec.role}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-cyan-300 text-cyan-600 hover:bg-cyan-50 bg-transparent"
                    onClick={() => window.open(exec.linkedin, "_blank")}
                  >
                    <Linkedin className="w-4 h-4 mr-1" />
                    LinkedIn
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </PageTransition>
      </div>
    </section>
  )
}
