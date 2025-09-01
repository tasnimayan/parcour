import { Button } from "@/components/ui/button";
import { ArrowRight, Package } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <Package className="h-16 w-16 mx-auto text-accent" />
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance">
            Ready to Experience Fast, Reliable Delivery?
          </h2>

          <p className="text-lg md:text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto text-pretty">
            Join thousands of satisfied customers who trust SwiftCourier for their shipping needs. Get started today and
            see the difference.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 py-3">
              Start Shipping Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-lg px-8 py-3 bg-transparent"
            >
              Contact Sales
            </Button>
          </div>

          <div className="mt-12 pt-8 border-t border-primary-foreground/20">
            <p className="text-primary-foreground/80">No setup fees • Free tracking • 24/7 support</p>
          </div>
        </div>
      </div>
    </section>
  );
}
