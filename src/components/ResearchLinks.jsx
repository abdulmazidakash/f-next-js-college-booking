"use client";

export default function ResearchLinks() {
  const links = [
    "https://example.com/paper1",
    "https://example.com/paper2",
  ];
  return (
    <section className="py-6">
      <h2 className="text-2xl font-bold mb-4">Recommended Research Papers</h2>
      <ul className="list-disc pl-5 space-y-2">
        {links.map((link, index) => (
          <li key={index}>
            <a
              href={link}
              className="text-blue-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Research Paper {index + 1}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}