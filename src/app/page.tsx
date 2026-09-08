import Link from "next/link";
import { PageContainer } from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import {
  ArrowRight,
  Briefcase,
  GraduationCap,
  Compass,
  Search,
  Calculator,
  MapPin,
  ShieldCheck,
  Globe2,
  Accessibility,
} from "lucide-react";

const SERVICES = [
  {
    href: "/assess",
    title: "Start a business",
    description: "Find financing suited to your project and circumstances.",
    linkLabel: "Start assessment",
    icon: Briefcase,
  },
  {
    href: "/assess",
    title: "Education loan",
    description: "Explore financial support for your studies.",
    linkLabel: "Start assessment",
    icon: GraduationCap,
  },
  {
    href: "/schemes",
    title: "Explore schemes",
    description: "Browse available government financial schemes.",
    linkLabel: "Browse schemes",
    icon: Compass,
  },
];

const STEPS = [
  {
    number: "01",
    title: "Tell us what you need",
    text: "A short guided assessment captures your key details.",
    icon: Search,
  },
  {
    number: "02",
    title: "Get matched to schemes",
    text: "We recommend schemes that fit your circumstances.",
    icon: Compass,
  },
  {
    number: "03",
    title: "Understand your financing",
    text: "Estimate your EMI and repayment burden.",
    icon: Calculator,
  },
  {
    number: "04",
    title: "Find an authorized partner",
    text: "Locate a nearby partner who can process your application.",
    icon: MapPin,
  },
];

const TRUST_ITEMS = [
  {
    icon: ShieldCheck,
    title: "Government-source information",
    text: "Scheme details drawn from published, official guidelines.",
  },
  {
    icon: Globe2,
    title: "Multilingual support",
    text: "Available in English, Hindi and Telugu.",
  },
  {
    icon: Accessibility,
    title: "Accessible by design",
    text: "Clear language and simple navigation on every screen.",
  },
];

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      <section className="bg-white border-b border-border">
        <PageContainer maxWidth="xl" className="py-14 sm:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium tracking-wide text-text-primary">
              <ShieldCheck className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
              Schemes for Scheduled Caste beneficiaries under NSFDC
            </p>
            <h1 className="mt-5 text-3xl font-bold leading-tight text-text-primary sm:text-4xl lg:text-5xl">
              Find the right government support <span className="text-primary">for you.</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base text-text-secondary sm:text-lg">
              Tell us what you need. We&apos;ll help you find a suitable scheme, estimate
              the financing and locate an authorized partner.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/assess">
                  Start Assessment <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full sm:w-auto"
              >
                <Link href="/schemes">Explore schemes</Link>
              </Button>
            </div>
          </div>
        </PageContainer>
      </section>

      <PageContainer maxWidth="xl" className="py-12 sm:py-14">
        <h2 className="text-center text-2xl font-bold text-text-primary">
          What are you looking for?
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-text-secondary">
          Choose how you&apos;d like to begin.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {SERVICES.map((service) => (
            <Link key={service.title} href={service.href} className="group">
              <Card className="h-full transition-all hover:border-primary/40">
                <CardContent className="flex flex-col items-start p-6">
                  <span className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-input)] bg-accent-light text-primary">
                    <service.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h2 className="mt-4 text-lg font-semibold text-text-primary">{service.title}</h2>
                  <p className="mt-1 text-sm text-text-secondary">{service.description}</p>
                  <span className="mt-4 inline-flex items-center text-sm font-medium text-primary">
                    {service.linkLabel}
                    <ArrowRight
                      className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </PageContainer>

      <section className="bg-surface border-y border-border">
        <PageContainer maxWidth="xl" className="py-12 sm:py-14">
          <h2 className="text-center text-2xl font-bold text-text-primary">How it works</h2>
          <p className="mx-auto mt-2 max-w-xl text-center text-text-secondary">
            Four simple steps from your answers to an authorized partner.
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step) => (
              <div
                key={step.number}
                className="rounded-[var(--radius-card)] border border-border bg-surface p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-accent">{step.number}</span>
                  <step.icon className="h-6 w-6 text-primary/40" aria-hidden="true" />
                </div>
                <h3 className="mt-4 font-semibold text-text-primary">{step.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-text-secondary">{step.text}</p>
              </div>
            ))}
          </div>
        </PageContainer>
      </section>

      <PageContainer maxWidth="xl" className="py-12 sm:py-14">
        <div className="rounded-[var(--radius-card)] border border-border bg-surface">
          <div className="grid gap-8 p-8 sm:grid-cols-3 sm:gap-6 sm:p-10">
            {TRUST_ITEMS.map((item) => (
              <div key={item.title}>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/5 text-primary">
                  <item.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-3 font-semibold text-text-primary">{item.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-text-secondary">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </PageContainer>
    </div>
  );
}