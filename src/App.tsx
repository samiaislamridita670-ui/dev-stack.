import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Technology = {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: string;
  rating: number;
  difficulty: string;
  badge: string;
};

function App() {
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [stack, setStack] = useState<Technology[]>([]);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    fetch("/data/technologies.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load technologies");
        }
        return response.json();
      })
      .then((data: Technology[]) => {
        setTechnologies(data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Technology data could not be loaded.");
        setLoading(false);
      });
  }, []);

  const addToStack = (technology: Technology) => {
    const alreadyAdded = stack.some((item) => item.id === technology.id);

    if (alreadyAdded) {
      toast.warning(`${technology.name} is already in your stack.`);
      return;
    }

    setStack([...stack, technology]);
    toast.success(`${technology.name} added to your stack!`);
  };

  const removeFromStack = (id: string) => {
    const removed = stack.find((item) => item.id === id);

    setStack(stack.filter((item) => item.id !== id));

    if (removed) {
      toast.info(`${removed.name} removed from your stack.`);
    }
  };

  const removeAll = () => {
    if (stack.length === 0) {
      toast.info("Your stack is already empty.");
      return;
    }

    setStack([]);
    toast.info("All technologies removed from your stack.");
  };

  const isAdded = (id: string) => {
    return stack.some((item) => item.id === id);
  };

  return (
    <div className="app">
      {/* Navbar */}
      <header className="navbar">
        <div className="nav-container">
          <button
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Open menu"
          >
            ☰
          </button>

          <a href="#home" className="brand">
            <img src="/logo-text.png" alt="Dev Stack" />
          </a>

          <nav
            className={menuOpen ? "nav-links mobile-open" : "nav-links"}
          >
            <a href="#home" onClick={() => setMenuOpen(false)}>
              Home
            </a>
            <a href="#technologies" onClick={() => setMenuOpen(false)}>
              Technologies
            </a>
            <a href="#projects" onClick={() => setMenuOpen(false)}>
              Projects
            </a>
            <a href="#about" onClick={() => setMenuOpen(false)}>
              About
            </a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>
              Contact
            </a>
          </nav>

          <div className="auth-buttons">
            <button className="sign-in">Sign In</button>
            <button className="sign-up">Sign Up</button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <h1>
              Build Your Ideal
              <span>Development Stack</span>
            </h1>

            <p className="hero-description">
              Explore frontend, backend, database, and tooling options.
              Compare technologies side by side and put together the
              stack that fits your next project.
            </p>

            <div className="hero-buttons">
              <a href="#technologies" className="primary-button">
                Explore Technologies
              </a>

              <a href="#about" className="secondary-button">
                Learn More
              </a>
            </div>
          </div>

          <div className="hero-visual">
            <img
              src="/banner-stack.png"
              alt="Development Stack"
              className="banner-image"
            />
          </div>
        </section>

        {/* Technologies */}
        <section className="technology-section" id="technologies">
          <div className="section-heading">
            <div>
              <h2>
                Explore the <span>Technologies</span>
              </h2>

              <p>
                Pick one technology per category to build your ideal stack.
              </p>
            </div>
          </div>

          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
              <p>Loading technologies...</p>
            </div>
          ) : (
            <div className="technology-layout">
              {/* Technology Cards */}
              <div className="technology-grid">
                {technologies.map((technology) => (
                  <article className="tech-card" key={technology.id}>
                    <div className="card-top">
                      <img
                        src={technology.icon}
                        alt={technology.name}
                        className="tech-icon"
                      />

                      <span className="badge">{technology.badge}</span>
                    </div>

                    <h3>{technology.name}</h3>

                    <p className="description">{technology.description}</p>

                    <div className="card-info">
                      <span>{technology.category}</span>
                      <span>{technology.difficulty}</span>
                      <strong>★ {technology.rating}</strong>
                    </div>

                    <button
                      className={
                        isAdded(technology.id)
                          ? "add-button added"
                          : "add-button"
                      }
                      disabled={isAdded(technology.id)}
                      onClick={() => addToStack(technology)}
                    >
                      {isAdded(technology.id)
                        ? "✓ Added to Stack"
                        : "Add to Stack"}
                    </button>
                  </article>
                ))}
              </div>

              {/* Your Stack */}
              <aside className="stack-panel">
                <div className="stack-header">
                  <div>
                    <h2>Your Stack</h2>

                    <p>
                      {stack.length}{" "}
                      {stack.length === 1
                        ? "Technology"
                        : "Technologies"}{" "}
                      Selected
                    </p>
                  </div>
                </div>

                {stack.length === 0 ? (
                  <div className="empty-stack">
                    <div className="empty-icon">+</div>

                    <h3>Your stack is empty</h3>

                    <p>
                      Choose technologies from the list to build your
                      ideal stack.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="stack-items">
                      {stack.map((item) => (
                        <div className="stack-item" key={item.id}>
                          <img src={item.icon} alt={item.name} />

                          <div>
                            <h4>{item.name}</h4>
                            <p>{item.category}</p>
                          </div>

                          <button
                            onClick={() => removeFromStack(item.id)}
                            aria-label={`Remove ${item.name}`}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="remove-all-wrapper">
                      <button className="remove-all" onClick={removeAll}>
                        Remove All
                      </button>
                    </div>
                  </>
                )}
              </aside>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="footer" id="contact">
        <div className="footer-content">
          <div className="footer-brand">
            <a href="#home" className="brand">
              <img src="/logo-text.png" alt="Dev Stack" />
            </a>

            <p>
              Curated tools technologies resource for developing
              building modern software.
            </p>

            <div className="social-links">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
              >
                Twitter
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </div>
          </div>

          <div className="footer-column">
            <h4>PRODUCT</h4>
            <a href="#home">Home</a>
            <a href="#technologies">Technologies</a>
            <a href="#projects">Projects</a>
          </div>

          <div className="footer-column">
            <h4>COMPANY</h4>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
            <a href="#careers">Careers</a>
          </div>

          <div className="footer-column">
            <h4>LEGAL</h4>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 Dev Stack. All rights reserved.</p>

          <div>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>
        </div>
      </footer>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

export default App;
