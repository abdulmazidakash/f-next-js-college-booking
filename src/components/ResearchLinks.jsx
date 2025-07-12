"use client";

export default function ResearchLinks() {
  const links = [
    {
      title: "Machine Learning Applications in Education",
      url: "https://www.ijisae.org/index.php/IJISAE/article/view/5928",
    },
    {
      title: "Sustainable Energy Research by Students",
      url: "https://www.aiub.edu/research/research-center/center-for-sustainable-energy-research-cser",
    },
    {
      title: "Blockchain for Secure Academic Records",
      url: "https://www.scirp.org/journal/paperinformation?paperid=136384",
    },
    {
      title: "AI in College Admission Systems",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10569720/",
    },
  ];

  return (
    <section className="py-10 px-4 bg-gradient-to-br from-white via-purple-50 to-pink-50  mt-12 rounded-lg my-8">
      <div className="text-center mb-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-10">
          📚 <span className="bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">Student Research Highlights</span>
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          Dive into insightful research works conducted by our brilliant college students. These recommended papers cover modern tech and innovation.
        </p>
      </div>

      <ul className="max-w-3xl mx-auto space-y-4 text-lg">
        {links.map((paper, index) => (
          <li key={index} className="bg-white border border-gray-300 shadow-sm hover:shadow-md p-4 rounded-lg transition-all">
            <a
              href={paper.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:underline font-medium flex items-center gap-2"
            >
              🔗 {paper.title}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
