import { notFound } from "next/navigation"
import { JobDetail } from "@/components/job-detail"
import { getJobById, getRelatedJobs, JOBS } from "@/lib/jobs"

export function generateStaticParams() {
  return JOBS.map((job) => ({ id: String(job.id) }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const job = getJobById(Number(id))
  if (!job) return { title: "Job not found — apna.co" }
  return {
    title: `${job.title} at ${job.company} — apna.co`,
    description: job.desc,
  }
}

export default async function JobPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const job = getJobById(Number(id))
  if (!job) notFound()

  const related = getRelatedJobs(job.id)
  return <JobDetail job={job} related={related} />
}
