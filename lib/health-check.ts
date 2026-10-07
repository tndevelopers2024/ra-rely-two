export const healthCheckQuestions = [
  'Supplier invoices are captured in one controlled location.',
  'Invoice approvals follow a clear and timely process.',
  'Customer invoices are issued promptly after work or delivery.',
  'Overdue accounts are followed up consistently.',
  'Finance responsibilities are documented and understood.',
  'Key tasks can continue when a team member is absent.',
  'Monthly reports are delivered on time.',
  'Management can clearly see near-term cash requirements.',
  'Reports explain significant movements and expected actions.',
  'Systems and spreadsheets do not require excessive manual rework.',
] as const;

export const healthCheckOptions = ['Always', 'Usually', 'Sometimes', 'Rarely', 'Not sure'] as const;
export type HealthCheckAnswer = typeof healthCheckOptions[number];
const points: Record<HealthCheckAnswer, number> = { Always: 4, Usually: 3, Sometimes: 2, Rarely: 1, 'Not sure': 0 };
const recommendations = [
  'Capture supplier invoices in one shared location and assign an owner to check for missing or duplicate invoices.',
  'Document invoice approval responsibilities and set a regular review for invoices awaiting approval.',
  'Set a clear trigger and owner for issuing customer invoices promptly after work or delivery.',
  'Review aged receivables regularly and assign an owner to follow up overdue customer accounts.',
  'Document finance responsibilities, key tasks and the person accountable for each step.',
  'Create practical handover instructions and nominate a backup for each essential finance task.',
  'Agree a monthly reporting timetable and track the steps needed to deliver reports on time.',
  'Maintain a short-term cash forecast and review upcoming receipts and payments regularly.',
  'Add explanations of significant changes and clear follow-up actions to management reports.',
  'Map repeated manual work and prioritise opportunities to simplify data entry and reconciliation.',
] as const;

export function calculateHealthCheck(answers: readonly HealthCheckAnswer[]) {
  if (answers.length !== healthCheckQuestions.length || answers.some(answer => !healthCheckOptions.includes(answer))) {
    throw new Error('Please answer all ten questions.');
  }
  const score = Math.round(answers.reduce((total, answer) => total + points[answer], 0) / 40 * 100);
  const band = score >= 80 ? 'Strong foundation' : score >= 50 ? 'Functional but vulnerable' : 'Immediate attention recommended';
  const description = score >= 80
    ? 'Core processes appear controlled. Focus on optimisation, automation and decision insight.'
    : score >= 50
      ? 'Processes operate, but several areas depend on manual effort or individual knowledge.'
      : 'Gaps in control, capacity or visibility may be affecting cash flow and increasing operational risk.';
  const priorities: { question: string; recommendation: string }[] = answers.map((answer, index) => ({ answer, index, points: points[answer] }))
    .filter(item => item.points < 4).sort((a, b) => a.points - b.points || a.index - b.index).slice(0, 3)
    .map(({ answer, index }) => ({ question: healthCheckQuestions[index], recommendation: answer === 'Not sure' ? `First confirm the current process with your team. ${recommendations[index]}` : recommendations[index] }));
  if (!priorities.length) priorities.push(
    { question: 'Keep your foundation strong', recommendation: 'Review documented processes regularly and keep backup responsibilities current.' },
    { question: 'Improve efficiency', recommendation: 'Review repeated manual tasks for opportunities to simplify work and reduce re-entry.' },
    { question: 'Strengthen management visibility', recommendation: 'Review whether reports clearly explain trends and the actions needed next.' },
  );
  return { score, band, description, priorities, unknownCount: answers.filter(answer => answer === 'Not sure').length };
}
