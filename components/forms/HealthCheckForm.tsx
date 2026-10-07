'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { calculateHealthCheck, healthCheckOptions, healthCheckQuestions, type HealthCheckAnswer } from '@/lib/health-check';

export function HealthCheckForm() {
  const [answers, setAnswers] = useState<(HealthCheckAnswer | '')[]>(() => healthCheckQuestions.map(() => ''));
  const [result, setResult] = useState<ReturnType<typeof calculateHealthCheck> | null>(null);
  const resultRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (result) {
      resultRef.current?.focus({ preventScroll: true });
      resultRef.current?.scrollIntoView({ behavior: 'auto', block: 'start' });
    }
  }, [result]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (answers.some(answer => !answer)) return;
    setResult(calculateHealthCheck(answers as HealthCheckAnswer[]));
  }

  return (
    <div className="bg-white border border-cloud-grey-border rounded-2xl p-5 sm:p-8 shadow-card space-y-8 my-8">
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-6">
          {healthCheckQuestions.map((question, index) => (
            <fieldset key={question} className="p-4 bg-cloud-grey/60 rounded-2xl border border-cloud-grey-border/80">
              <legend className="font-heading font-semibold text-sm sm:text-base text-rely-navy px-1">{index + 1}. {question}</legend>
              <div className="flex flex-wrap gap-2 text-xs mt-2">
                {healthCheckOptions.map(option => (
                  <label key={option} className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-cloud-grey-border rounded-full cursor-pointer hover:border-advisory-gold hover:bg-warm-ivory/50 transition-colors">
                    <input type="radio" name={`q_${index}`} value={option} required checked={answers[index] === option} onChange={() => { setAnswers(current => current.map((answer, i) => i === index ? option : answer)); setResult(null); }} className="text-rely-navy focus:ring-advisory-gold" />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          ))}
        </div>
        <div className="pt-4 border-t border-cloud-grey flex justify-center">
          <Button type="submit" variant="primary" size="lg" className="whitespace-normal max-w-full text-center">
            Receive My Result and Recommendations <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
          </Button>
        </div>
      </form>
      {result && (
        <section ref={resultRef} tabIndex={-1} aria-labelledby="health-check-result" className="scroll-mt-28 rounded-2xl border border-advisory-gold/50 bg-warm-ivory p-5 sm:p-8 outline-none focus-visible:ring-2 focus-visible:ring-advisory-gold">
          <p className="text-xs font-heading uppercase tracking-wider text-charcoal-muted">Your indicative result</p>
          <h2 id="health-check-result" className="mt-2 font-heading text-xl sm:text-2xl font-bold text-rely-navy">{result.band}</h2>
          <p className="mt-3 text-3xl font-heading font-bold text-rely-navy">{result.score} / 100</p>
          <p className="mt-3 text-sm text-charcoal">{result.description}</p>
          <h3 className="mt-6 font-heading font-semibold text-rely-navy">Recommended next steps</h3>
          <ul className="mt-3 space-y-4 text-sm text-charcoal">
            {result.priorities.map(priority => <li key={priority.question}><strong className="block text-rely-navy">{priority.question}</strong>{priority.recommendation}</li>)}
          </ul>
          <p className="mt-6 text-xs text-charcoal-muted">This indicative self-assessment uses your answers only. Each answer receives 0–4 points: Always 4, Usually 3, Sometimes 2, Rarely 1, Not sure 0. Strong foundation starts at 80; functional but vulnerable starts at 50. Your answers are not sent or stored.</p>
          {result.unknownCount > 0 && <p className="mt-2 text-xs text-charcoal-muted">You selected Not sure for {result.unknownCount} {result.unknownCount === 1 ? 'question' : 'questions'}. These answers lower the score conservatively; confirm these areas with your team.</p>}
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="/book-a-review" size="md">Discuss My Result</Button>
            <Button type="button" size="md" variant="secondary" onClick={() => { setAnswers(healthCheckQuestions.map(() => '')); setResult(null); formRef.current?.querySelector<HTMLInputElement>('input')?.focus(); }}>Start Again</Button>
          </div>
        </section>
      )}
    </div>
  );
}
