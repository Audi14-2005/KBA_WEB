import { Card, CardContent } from "../components/ui/card"
import { PageTransition } from "../components/ui/page-transition"

export function About() {
  return (
    <section id="about" className="relative py-20 bg-gradient-to-br from-white to-blue-50 overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <PageTransition className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6">About KBA REC</h2>
            <p className="text-xl text-blue-700 text-pretty">
              At Rajalakshmi Engineering College, our KBA Club is a Centre of Excellence in Blockchain, empowering
              students with research, training, and innovation in emerging technologies.
            </p>
          </PageTransition>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 hover:shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-blue-800 mb-4">What is KBA?</h3>
                <p className="text-blue-700">
                  Kerala Blockchain Academy (KBA) is a Centre of Excellence under the Kerala University of Digital
                  Sciences, Innovation and Technology focused on blockchain education, research and industry
                  collaboration.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-indigo-200 hover:border-indigo-400 transition-all duration-300 hover:shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-indigo-800 mb-4">What is KBAIC?</h3>
                <p className="text-indigo-700">
                  KBA Innovation Club (KBAIC) is an initiative by KBA to help students explore blockchain & Web3
                  technologies through mentorship, hands-on projects and industry exposure.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-cyan-200 hover:border-cyan-400 transition-all duration-300 hover:shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-cyan-800 mb-4">What is KBA REC?</h3>
                <p className="text-cyan-700">
                  KBA REC is the Rajalakshmi Engineering College chapter of the KBAIC — a student-driven body that
                  organises workshops, projects and industry-academia interactions under the guidance of KBA.
                </p>
              </CardContent>
            </Card>
          </div>

          <PageTransition className="mt-16 text-center">
            <div className="bg-blue-100/80 backdrop-blur-sm rounded-lg p-8 border border-blue-200">
              <h3 className="text-2xl font-bold text-blue-900 mb-4">Center of Excellence</h3>
              <p className="text-lg text-blue-800 mb-2">
                Kerala University of Digital Sciences, Innovation & Technology
              </p>
              <p className="text-blue-700">
                Foundation to advanced blockchain developer courses, internships & startup programs
              </p>
            </div>
          </PageTransition>
        </div>
      </div>
    </section>
  )
}
