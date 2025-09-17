import { useState, useEffect } from 'react'
import { PageTransition } from '../components/ui/page-transition'
import { Card, CardContent } from '../components/ui/card'
import eventsData from '../components/events-data.json'

interface Event {
  id: string
  title: string
  date: string
  description: string
  image?: string
  location?: string
  registrationLink?: string
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true)
        
        try {
          // Try to fetch from API first
          const response = await fetch('https://api.example.com/events')
          
          // Check if the response is ok (status in the range 200-299)
          if (!response.ok) {
            throw new Error('API response was not ok')
          }
          
          const data = await response.json()
          setEvents(data)
        } catch (apiError) {
          console.log('API fetch failed, using local data:', apiError)
          // Fallback to local JSON data
          setEvents(eventsData)
        }
        
        setLoading(false)
      } catch (err) {
        console.error('Error loading events:', err)
        setError('Failed to load events. Please try again later.')
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <PageTransition className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-blue-900 mb-6 text-balance">Events</h2>
          <p className="text-xl md:text-2xl text-blue-700 text-pretty max-w-4xl mx-auto">
            Join us for exciting blockchain events, workshops, and hackathons.
          </p>
        </PageTransition>

        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
              <p className="mt-4 text-blue-800">Loading events...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600">{error}</p>
            </div>
          ) : events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event) => (
                <Card key={event.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  {event.image && (
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={event.image} 
                        alt={event.title} 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  )}
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-blue-900 mb-2">{event.title}</h3>
                    <p className="text-blue-700 mb-3">
                      <time dateTime={event.date}>{new Date(event.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</time>
                    </p>
                    {event.location && (
                      <p className="text-blue-600 mb-3">
                        <span className="font-medium">Location:</span> {event.location}
                      </p>
                    )}
                    <p className="text-gray-700 mb-4">{event.description}</p>
                    {event.registrationLink && (
                      <a 
                        href={event.registrationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
                      >
                        Register Now
                      </a>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-blue-100">
              <h3 className="text-2xl font-bold text-blue-900 mb-4">We appreciate your enthusiasm!</h3>
              <p className="text-xl text-blue-700 mb-6 max-w-2xl mx-auto">
                We request you to wait till we bring up exciting events. Stay tuned!
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}