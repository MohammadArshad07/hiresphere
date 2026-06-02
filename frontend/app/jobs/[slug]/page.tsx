
import Link from "next/link";


const jobsData: Record<
  string,
  {
    title: string;
    company: string;
    location: string;
    salary: string;
    experience: string;
    description: string;
  }
> = {
  "frontend-developer": {
    title: "Frontend Developer",
    company: "Google",
    location: "Remote",
    salary: "$120k - $140k",
    experience: "3+ Years",
    description:
      "Build scalable and modern frontend applications using React and Next.js.",
  },

  "ai-engineer": {
    title: "AI Engineer",
    company: "OpenAI",
    location: "San Francisco",
    salary: "$180k - $220k",
    experience: "4+ Years",
    description:
      "Work on cutting-edge AI systems, LLM applications, and machine learning infrastructure.",
  },

  "backend-developer": {
    title: "Backend Developer",
    company: "Spotify",
    location: "Remote",
    salary: "$140k - $160k",
    experience: "3+ Years",
    description:
      "Develop scalable APIs and backend systems for millions of users worldwide.",
  },

  "ui-ux-designer": {
    title: "UI/UX Designer",
    company: "Airbnb",
    location: "New York",
    salary: "$110k - $130k",
    experience: "2+ Years",
    description:
      "Design intuitive user experiences and modern interfaces for global products.",
  },

  "cloud-engineer": {
    title: "Cloud Engineer",
    company: "AWS",
    location: "Remote",
    salary: "$150k - $180k",
    experience: "4+ Years",
    description:
      "Manage cloud infrastructure, deployments, and scalable distributed systems.",
  },

  "devops-engineer": {
    title: "DevOps Engineer",
    company: "Microsoft",
    location: "Seattle",
    salary: "$160k - $190k",
    experience: "4+ Years",
    description:
      "Automate infrastructure pipelines and maintain deployment reliability.",
  },
};

export default async function JobDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {

  const { slug } = await params;

const job = jobsData[slug];

  if (!job) {
    return (
      <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <h1 className="text-4xl font-bold">
          Job Not Found
        </h1>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen text-white overflow-hidden">

      {/* Background */}

      <div className="fixed inset-0 -z-20 overflow-hidden">

        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source
            src="https://stream.mux.com/4IMYGcL01xjs7ek5ANO17JC4VQVUTsojZlnw4fXzwSxc.m3u8"
            type="application/x-mpegURL"
          />
        </video>

      </div>

      <div className="fixed inset-0 bg-slate-950/80 -z-10"></div>



      {/* Navbar */}

      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-black/20 border-b border-white/10">

        <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-5">

          <Link href="/">
            <h1 className="text-3xl font-bold text-white">
              HireSphere
            </h1>
          </Link>

          <Link href="/jobs">

            <button className="bg-white/10 border border-white/10 px-6 py-3 rounded-2xl hover:bg-white/20 transition">
              Back to Jobs
            </button>

          </Link>

        </div>

      </nav>



      {/* Content */}

      <section className="px-8 py-20">

        <div className="max-w-5xl mx-auto">

          <div className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[40px] p-12 shadow-2xl">

            {/* Company */}

            <div className="flex items-center gap-6 mb-10">

              <div className="w-20 h-20 rounded-3xl bg-cyan-500/20 border border-cyan-400/20 flex items-center justify-center">

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-10 h-10 text-cyan-300"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5Z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>

              </div>



              <div>

                <p className="text-cyan-400 font-semibold mb-2">
                  {job.company}
                </p>

                <h1 className="text-5xl font-bold">
                  {job.title}
                </h1>

              </div>

            </div>



            {/* Job Info */}

            <div className="grid md:grid-cols-3 gap-6 mb-12">

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">

                <p className="text-slate-400 text-sm mb-2">
                  Location
                </p>

                <h3 className="text-xl font-semibold">
                  {job.location}
                </h3>

              </div>



              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">

                <p className="text-slate-400 text-sm mb-2">
                  Salary
                </p>

                <h3 className="text-xl font-semibold">
                  {job.salary}
                </h3>

              </div>



              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">

                <p className="text-slate-400 text-sm mb-2">
                  Experience
                </p>

                <h3 className="text-xl font-semibold">
                  {job.experience}
                </h3>

              </div>

            </div>



            {/* About */}

            <div className="mb-12">

              <h2 className="text-3xl font-bold mb-6">
                About the Role
              </h2>

              <p className="text-slate-300 leading-relaxed text-lg">
                {job.description}
              </p>

            </div>



            {/* Requirements */}

            <div className="mb-12">

              <h2 className="text-3xl font-bold mb-6">
                Requirements
              </h2>

              <ul className="space-y-4 text-slate-300 text-lg">

                <li>• Strong communication skills</li>
                <li>• Experience with modern technologies</li>
                <li>• Ability to work in fast-paced teams</li>
                <li>• Problem-solving mindset</li>
                <li>• Passion for innovation</li>

              </ul>

            </div>



            {/* Buttons */}

            <div className="flex flex-wrap items-center gap-6">

              <Link href={`/apply/${slug}`}>

                <button className="bg-cyan-500 hover:bg-cyan-600 transition px-10 py-4 rounded-2xl font-semibold text-lg shadow-xl cursor-pointer">
                    Apply Now
                </button>

                </Link>

              <button className="bg-white/10 border border-white/10 hover:bg-white/20 transition px-10 py-4 rounded-2xl font-semibold text-lg">
                Save Job
              </button>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}