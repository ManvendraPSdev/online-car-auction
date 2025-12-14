import { Link } from "react-router";

export default function Legal() {
  const legalPages = [
    {
      title: "Privacy Policy",
      description:
        "Learn how we collect, use, and protect your personal information.",
      to: "/legal/privacy-policy",
    },
    {
      title: "Terms of Service",
      description:
        "The terms and conditions governing your use of our platform.",
      to: "/legal/terms-of-service",
    },
    {
      title: "DMCA Policy",
      description: "Our policy for handling copyright infringement claims.",
      to: "/legal/dmca",
    },
    {
      title: "Code of Conduct",
      description:
        "Guidelines for respectful and appropriate behavior on our platform.",
      to: "/legal/code-of-conduct",
    },
    {
      title: "Acceptable Use Policy",
      description: "Rules about what you can and cannot do on our platform.",
      to: "/legal/acceptable-use-policy",
    },
  ];

  return (
    <div className="min-h-screen bg-black px-4 sm:px-6 lg:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="p-8 pl-3">
          <h1 className="text-3xl font-bold text-white mb-2">
            Legal Documents
          </h1>
          <p className="text-lg text-white/70 mb-8">
            Please review our legal documents to understand your rights and
            responsibilities when using our online auction platform.
          </p>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {legalPages.map((page) => (
              <Link
                key={page.to}
                to={page.to}
                className="block p-6 bg-white/5 backdrop-blur-xs border border-white/10 rounded-2xl hover:bg-white/10 transition-all"
              >
                <h3 className="text-lg font-semibold text-white mb-2">
                  {page.title}
                </h3>
                <p className="text-white/70 text-sm">{page.description}</p>
              </Link>
            ))}
          </div>

          <div className="mt-12 p-6 bg-white/5 backdrop-blur-xs border border-white/10 rounded-2xl">
            <h2 className="text-xl font-semibold text-white mb-4">
              Questions?
            </h2>
            <p className="text-white/70 leading-relaxed">
              If you have any questions about our legal policies, please contact
              us using <Link to={"/contact"} className="text-white hover:text-white/80 underline">contact page</Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
