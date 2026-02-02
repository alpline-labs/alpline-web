"use client";

import { Section } from "@/components/section";
import { siteConfig } from "@/lib/config";
import { motion } from "framer-motion";

export function Testimonials() {
  return (
    <Section
      id="testimonials"
      className="py-24 bg-gradient-to-b from-muted/20 to-background"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
            TESTIMONIALS
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            What Our Users Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {siteConfig.testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-shadow flex flex-col h-full"
            >
              <div className="flex items-start gap-3 mb-4">
                <img
                  className="h-12 w-12 rounded-full object-cover flex-shrink-0"
                  src={testimonial.image}
                  alt={testimonial.name}
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-foreground truncate">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>
              <p className="text-sm text-foreground leading-relaxed flex-grow">
                {testimonial.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
