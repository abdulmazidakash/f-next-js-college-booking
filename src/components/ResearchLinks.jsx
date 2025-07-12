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
    <section className="py-10 px-4 bg-gradient-to-br from-green-100 via-white to-blue-100 mt-12 rounded-lg shadow-lg my-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          📚 Student Research Highlights
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          Dive into insightful research works conducted by our brilliant college students. These recommended papers cover modern tech and innovation.
        </p>
      </div>

      <ul className="max-w-3xl mx-auto space-y-4 text-lg">
        {links.map((paper, index) => (
          <li key={index} className="bg-white shadow-sm hover:shadow-md p-4 rounded-lg transition-all">
            <a
              href={paper.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline font-medium flex items-center gap-2"
            >
              🔗 {paper.title}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
