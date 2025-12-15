import { Link } from "react-router";
// import { AdsComponent } from "../components/AdsComponent";
import { useSelector } from "react-redux";

export const About = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="min-h-screen" style={{ 
      backgroundImage: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 25%, #0f0f0f 50%, #0a0a0a 75%, #1a1a1a 100%)' 
    }}>
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="bg-white/5 backdrop-blur-xs border border-white/10 rounded-2xl  p-8">
          <h1 className="text-3xl font-bold text-white mb-8">
            About This Project
          </h1>

          <div className="prose max-w-none text-ink-200 leading-relaxed space-y-6">
            <p className="text-lg">
              Welcome to our Online Auction System - a comprehensive web
              application designed to facilitate online bidding and auctions.
            </p>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">
                Project Purpose
              </h2>
              <p className="text-ink-200">
                This project has been developed as an educational resource for
                students pursuing their final year or third year minor/major
                projects. It serves as a practical example of building a
                full-featured web application with modern technologies and best
                practices.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">
                For Students
              </h2>
              <p className="text-ink-200">
                If you're a computer science or related field student working on
                your academic project, you can use this codebase to:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>
                  Understand modern web development patterns and practices
                </li>
                <li>Learn how to implement real-time bidding systems</li>
                <li>Study user authentication and authorization</li>
                <li>Explore database design for auction systems</li>
                <li>Learn about responsive design and user experience</li>
              </ul>
            </section>

            {/* {!user && <AdsComponent dataAdSlot="1002244889" />} */}

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">
                Key Features
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>User registration and authentication</li>
                <li>Real-time auction bidding</li>
                <li>Item listing and management</li>
                <li>User profile management</li>
                <li>Responsive design for all devices</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">
                Developer
              </h2>
              <p className="text-ink-200">
                This project has been created by <strong>Avnish Kumar</strong>{" "}
                as a demonstration of modern web development techniques and to
                help fellow students in their academic journey.
              </p>

              <div className="mt-4 p-4 bg-white/5 border border-white/10 rounded-2xl">
                <p className="font-medium text-white mb-2">
                  Connect with the Developer:
                </p>
                <div className="space-y-2">
                  <p className="text-ink-200">
                    <span className="font-medium text-white">GitHub Profile:</span>{" "}
                    <a
                      href="https://github.com/theavnishkumar"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ink-200 hover:text-white underline"
                    >
                      github.com/theavnishkumar
                    </a>
                  </p>
                  <p className="text-ink-200">
                    <span className="font-medium text-white">Project Repository:</span>{" "}
                    <a
                      href="https://github.com/theavnishkumar/online-auction-system"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ink-200 hover:text-white underline"
                    >
                      github.com/theavnishkumar/online-auction-system
                    </a>
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">
                Getting Started
              </h2>
              <p className="text-ink-200">
                To get started with this project, visit the GitHub repository
                where you'll find detailed installation instructions,
                documentation, and code explanations. The repository includes
                everything you need to set up and run the application locally.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">
                Academic Use
              </h2>
              <p className="text-ink-200">
                Students are encouraged to study this codebase, understand the
                implementation, and adapt it for their own projects. Please
                ensure you follow your institution's guidelines regarding code
                usage and attribution in academic work.
              </p>
            </section>

            <div className="mt-12 pt-8 border-t border-white/10">
              <p className="text-center text-ink-200">
                Have questions or need support? Feel free to{" "}
                <Link
                  to="/contact"
                  className="text-ink-200 hover:text-white underline font-medium"
                >
                  contact us
                </Link>{" "}
                for assistance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
