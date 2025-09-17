import { Card, CardContent } from "../components/ui/card"
import { PageTransition } from "../components/ui/page-transition"

export function Partners() {
  const communityPartners = [
    {
      name: "Perplexity",
      type: "Campus Partner",
      logo: "/images/perplexity-logo.svg",
    },
    {
      name: "Kenesis",
      type: "Startup Partner",
      logo: "/images/partners/kenesis.jpeg",
    },
  ]

  const industrialPartners = [
    {
      name: "Olive IoT",
      contact: "Robin Thomas",
      logo: "/images/partners/olive-iot.jpeg",
    },
    {
      name: "Jerry Inc",
      contact: "Art Agrawal",
      logo: "/images/partners/jerry-inc.jpeg",
    },
    {
      name: "Yaazh Software Studio",
      contact: "Arun Kannan",
      logo: "/images/partners/yaazh-software.png",
    },
  ]

  const universityPartners = [
    {
      name: "Princeton University",
      contact: "Ranajoy",
      location: "New Jersey, USA",
      logo: "/images/partners/princeton-university.jpeg",
    },
    {
      name: "Clark University",
      contact: "Gopisetty Sai Charan",
      location: "Massachusetts, USA",
      logo: "/images/partners/clark-university.jpeg",
    },
  ]

  return (
    <section id="partners" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <PageTransition className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-900 mb-6 text-balance">Our Partners</h2>
          <p className="text-lg md:text-xl lg:text-2xl text-blue-700 text-pretty max-w-4xl mx-auto">
            KBA Club @ REC collaborates with leading organizations to provide students access to tools, mentorship, and
            real-world opportunities.
          </p>
        </PageTransition>

        {/* Community Partners */}
        <PageTransition className="mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 text-blue-800">Community Partners</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {communityPartners.map((partner, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-all duration-300 border-blue-200 hover:border-blue-400 hover:scale-105"
              >
                <CardContent className="p-8">
                  <div className="w-24 h-24 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-6 overflow-hidden">
                    {partner.logo ? (
                      <img
                        src={partner.logo || "/placeholder.svg"}
                        alt={partner.name}
                        className="object-contain w-full h-full p-2"
                      />
                    ) : (
                      <span className="text-blue-700 font-bold text-2xl">{partner.name[0]}</span>
                    )}
                  </div>
                  <h4 className="font-bold text-blue-900 mb-2 text-lg">{partner.name}</h4>
                  <p className="text-blue-600 text-sm font-medium">{partner.type}</p>
                </CardContent>
              </Card>
            ))}
            <Card className="text-center border-dashed border-2 border-blue-300 hover:border-blue-400 transition-colors">
              <CardContent className="p-8">
                <div className="w-24 h-24 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-blue-400 text-3xl">+</span>
                </div>
                <h4 className="font-bold text-blue-600 mb-2 text-lg">Coming Soon</h4>
                <p className="text-blue-500 text-sm font-medium">New Partner</p>
              </CardContent>
            </Card>
            <Card className="text-center border-dashed border-2 border-blue-300 hover:border-blue-400 transition-colors">
              <CardContent className="p-8">
                <div className="w-24 h-24 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-blue-400 text-3xl">+</span>
                </div>
                <h4 className="font-bold text-blue-600 mb-2 text-lg">Coming Soon</h4>
                <p className="text-blue-500 text-sm font-medium">New Partner</p>
              </CardContent>
            </Card>
          </div>
        </PageTransition>

        {/* Industrial Partners */}
        <PageTransition className="mb-16">
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 text-indigo-800">
            Industrial Partners / Sponsors
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industrialPartners.map((partner, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-all duration-300 border-indigo-200 hover:border-indigo-400 hover:scale-105"
              >
                <CardContent className="p-8">
                  <div className="w-24 h-24 bg-indigo-50 rounded-xl flex items-center justify-center mx-auto mb-6 overflow-hidden">
                    {partner.logo ? (
                      <img
                        src={partner.logo || "/placeholder.svg"}
                        alt={partner.name}
                        className="object-contain w-full h-full p-2"
                      />
                    ) : (
                      <span className="text-indigo-700 font-bold text-2xl">{partner.name[0]}</span>
                    )}
                  </div>
                  <h4 className="font-bold text-indigo-900 mb-2 text-lg">{partner.name}</h4>
                  <p className="text-indigo-600 text-sm font-medium">{partner.contact}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </PageTransition>

        {/* University Partners */}
        <PageTransition>
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 text-cyan-800">University Partners</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {universityPartners.map((partner, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-all duration-300 border-cyan-200 hover:border-cyan-400 hover:scale-105"
              >
                <CardContent className="p-8">
                  <div className="w-28 h-28 bg-cyan-50 rounded-xl flex items-center justify-center mx-auto mb-6 overflow-hidden">
                    {partner.logo ? (
                      <img
                        src={partner.logo || "/placeholder.svg"}
                        alt={partner.name}
                        className="object-contain w-full h-full p-2"
                      />
                    ) : (
                      <span className="text-cyan-700 font-bold text-3xl">{partner.name[0]}</span>
                    )}
                  </div>
                  <h4 className="font-bold text-cyan-900 mb-2 text-xl">{partner.name}</h4>
                  <p className="text-cyan-700 font-medium mb-1 text-lg">{partner.contact}</p>
                  <p className="text-cyan-600 text-sm font-medium">{partner.location}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </PageTransition>
      </div>
    </section>
  )
}
