import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, X } from "lucide-react"

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for getting started",
    popular: false,
    features: [
      { name: "1 Resume", included: true },
      { name: "3 Templates", included: true },
      { name: "PDF Download", included: true },
      { name: "Basic Support", included: true },
      { name: "Cover Letter Builder", included: false },
      { name: "AI Suggestions", included: false },
      { name: "Premium Templates", included: false },
      { name: "Priority Support", included: false },
    ],
  },
  {
    name: "Pro",
    price: "$9.99",
    period: "per month",
    description: "Best for job seekers",
    popular: true,
    features: [
      { name: "Unlimited Resumes", included: true },
      { name: "20+ Templates", included: true },
      { name: "PDF Download", included: true },
      { name: "Cover Letter Builder", included: true },
      { name: "AI Suggestions", included: true },
      { name: "Premium Templates", included: true },
      { name: "Priority Support", included: true },
      { name: "LinkedIn Import", included: false },
    ],
  },
  {
    name: "Premium",
    price: "$19.99",
    period: "per month",
    description: "For serious professionals",
    popular: false,
    features: [
      { name: "Everything in Pro", included: true },
      { name: "LinkedIn Import", included: true },
      { name: "Advanced AI Writing", included: true },
      { name: "Custom Branding", included: true },
      { name: "Analytics Dashboard", included: true },
      { name: "Team Collaboration", included: true },
      { name: "White-label Export", included: true },
      { name: "Dedicated Support", included: true },
    ],
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the plan that's right for you. All plans include our core resume building features.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative ${plan.popular ? "border-2 border-blue-500 shadow-xl" : "border shadow-lg"}`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600">
                  Most Popular
                </Badge>
              )}

              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-600 ml-2">/{plan.period}</span>
                </div>
                <p className="text-gray-600 mt-2">{plan.description}</p>
              </CardHeader>

              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      ) : (
                        <X className="w-5 h-5 text-gray-300 mr-3 flex-shrink-0" />
                      )}
                      <span className={feature.included ? "text-gray-900" : "text-gray-400"}>{feature.name}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${plan.popular ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700" : ""}`}
                  variant={plan.popular ? "default" : "outline"}
                >
                  {plan.name === "Free" ? "Get Started" : "Start Free Trial"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Can I cancel anytime?</h3>
              <p className="text-gray-600">Yes, you can cancel your subscription at any time. No questions asked.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Do you offer refunds?</h3>
              <p className="text-gray-600">We offer a 30-day money-back guarantee for all paid plans.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-600">We accept all major credit cards, PayPal, and bank transfers.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Is my data secure?</h3>
              <p className="text-gray-600">
                Yes, we use enterprise-grade security and never share your personal information.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
